import {
  Asset,
  Account,
  AssetPrice,
  NearLiquidation,
  NearLiquidationERC20Asset,
  NearLiquidationERC721Asset,
  AutoCompoundHistory,
  Holder,
  AccountAssets,
} from "../generated/schema";
import { Bytes, Address, BigInt, BigDecimal } from "@graphprotocol/graph-ts";
import {
  ZERO_BI,
  ERC20Tokens,
  ERC721Tokens,
  nearHealthFactor,
  inHealthFactor,
  ZERO_BD,
  ONE_BD_1E18,
  ONE_BD_1E8,
  ONE_BI,
  priceFactor,
  getDecimals,
  getName,
  Oracle,
  Chainlink_ETH,
  ETH_ADRESS,
  ParaProxy,
  APECOINSTAKING,
  nBAYC,
  nMAYC,
  nBAKC,
  P2PPairStaking,
  cAPE,
} from "./constants";
import { PoolParameters } from "../generated/PoolCore/PoolParameters";
import { PriceOracle } from "../generated/PoolCore/PriceOracle";
import { EACAggregator } from "../generated/PoolCore/EACAggregator";
import { ApeStakingSummary } from "../generated/schema";
import {
  Contract as ApeCoinStaking,
  Deposit,
} from "../generated/ApeCoinStaking/Contract";

export function handleUser(account: Bytes): Account {
  let userId = account.toHexString();
  let user = Account.load(userId);
  if (!user) {
    user = new Account(userId);
    user.address = account;
    user.collateralAssets = [];
    user.debtAssets = [];
    user.save();
  }
  return user;
}

export function handleAccountAsset(
  account: Bytes,
  asset: Asset,
  tokenId: BigInt,
  amount: BigInt
): AccountAssets {
  let accountAssetsID = `${account.toHexString()}-${asset.contractAddress.toHexString()}-${tokenId.toString()}`;
  let accountAssets = AccountAssets.load(accountAssetsID);
  if (!accountAssets) {
    accountAssets = new AccountAssets(accountAssetsID);
    accountAssets.identifierOrCriteria = ZERO_BI;
    accountAssets.amount = ZERO_BI;
  }
  accountAssets.asset = asset.id;
  accountAssets.identifierOrCriteria = tokenId;
  accountAssets.amount = accountAssets.amount.plus(amount);
  accountAssets.save();
  return accountAssets;
}

export function handleAsset(address: Bytes, tokenId: BigInt): Asset {
  let asset = Asset.load(address.toHexString());
  if (!asset) {
    asset = new Asset(address.toHexString());
    asset.startTime = ZERO_BI;
    asset.decimal = getDecimals(address.toHexString());
    asset.collectionName = getName(address.toHexString());
    asset.contractAddress = address;
    asset.auctionStatus = ZERO_BI;
    asset.floorPrice = ZERO_BI;
    asset.floorPriceInUSD = ZERO_BI;
    asset.stepLinear = ZERO_BI;
    asset.stepExp = ZERO_BI;
    asset.currentPriceMultiplier = ZERO_BI;
    asset.maxPriceMultiplier = ZERO_BI;
    asset.minPriceMultiplier = ZERO_BI;
    asset.minExpPriceMultiplier = ZERO_BI;
    asset.traitMultiplier = ZERO_BI;
    asset.amount = ZERO_BI;
    asset.identifierOrCriteria = ZERO_BI;
  }
  asset.identifierOrCriteria = tokenId;
  asset.currentPrice = getPrice(address);
  asset.currentPriceInUSD = ethToUsdPrice(asset.currentPrice);
  asset.save();
  return asset;
}

export function getPrice(address: Bytes): BigInt {
  let assetPrice = AssetPrice.load(address.toHexString());
  if (assetPrice) {
    return assetPrice.price;
  } else {
    return ZERO_BI;
  }
}

export function handlePrices(): void {
  let priceOracle = PriceOracle.bind(Address.fromString(Oracle));
  let erc721Assets = ERC721Tokens.map<Address>(
    (v: string): Address => {
      return Address.fromString(v);
    }
  );
  let erc20Assets = ERC20Tokens.map<Address>(
    (v: string): Address => {
      return Address.fromString(v);
    }
  );
  let assets = erc20Assets.concat(erc721Assets);

  let price = priceOracle.try_getAssetsPrices(assets);
  if (!price.reverted) {
    for (let i = 0; i < price.value.length; i++) {
      let assetPrice = AssetPrice.load(assets[i].toHexString());
      if (!assetPrice) {
        assetPrice = new AssetPrice(assets[i].toHexString());
        assetPrice.address = assets[i];
        assetPrice.holders = [];
      } else {
        // let oldPrice = assetPrice.price;
        // if (oldPrice.times(BigInt.fromI32(priceFactor)).gt(price.value[i])) {
        // checkHealth(assetPrice.holders);
        // }
      }
      assetPrice.price = price.value[i];
      assetPrice.save();

      let asset = handleAsset(assets[i], ZERO_BI);
      asset.currentPrice = price.value[i];
      asset.currentPriceInUSD = ethToUsdPrice(asset.currentPrice);
      asset.save();
    }
  }
  let aggregator = EACAggregator.bind(Address.fromString(Chainlink_ETH));
  let ethPrice = aggregator.try_latestAnswer();
  if (!ethPrice.reverted) {
    let assetPrice = AssetPrice.load(ETH_ADRESS);
    if (!assetPrice) {
      assetPrice = new AssetPrice(ETH_ADRESS);
      assetPrice.address = Address.fromString(ETH_ADRESS);
      assetPrice.holders = [];
    }
    assetPrice.price = ethPrice.value;
    assetPrice.save();
  }
}

export function ethToUsdPrice(ethPrice: BigInt): BigDecimal {
  let assetPrice = AssetPrice.load(ETH_ADRESS);
  if (assetPrice) {
    return ethPrice
      .divDecimal(ONE_BD_1E18)
      .times(assetPrice.price.divDecimal(ONE_BD_1E8));
  } else {
    return ZERO_BD;
  }
}

export function checkHealth(accounts: string[]): void {
  for (let i = 0; i < accounts.length; i++) {
    let holder = Holder.load(accounts[i]);
    if (holder) {
      let poolParameters = PoolParameters.bind(Address.fromString(ParaProxy));
      let userData = poolParameters.try_getUserAccountData(Address.fromBytes(holder.account));
      if (!userData.reverted) {
        let healthFactor = userData.value.getHealthFactor();
        if (healthFactor.lt(nearHealthFactor)) {
          handleNearLiquidation(holder);
        } else if (healthFactor.lt(inHealthFactor)) {
          // handleInLiquidation()
        }
      }
    }
  }
}

export function handleNearLiquidation(holder: Holder): void {
  let nearLiquidation = NearLiquidation.load(holder.account.toHexString());
  if (!nearLiquidation) {
    nearLiquidation = new NearLiquidation(holder.account.toHexString());
    nearLiquidation.accountAddress = holder.account;
    nearLiquidation.collateral = ZERO_BD;
    nearLiquidation.debt = ZERO_BD;
    nearLiquidation.healthFactor = ZERO_BD;
    nearLiquidation.nftHealthFactor = ZERO_BD;
    nearLiquidation.erc20Assets = [];
    nearLiquidation.erc721Assets = [];
  }
  let poolParameters = PoolParameters.bind(Address.fromString(ParaProxy));
  let userData = poolParameters.try_getUserAccountData(Address.fromBytes(holder.account));
  if (!userData.reverted) {
    nearLiquidation.collateral = ethToUsdPrice(
      userData.value.getTotalCollateralBase()
    );
    nearLiquidation.debt = ethToUsdPrice(userData.value.getTotalDebtBase());
    nearLiquidation.healthFactor = userData.value
      .getHealthFactor()
      .divDecimal(ONE_BD_1E18);
    let nftHealthFactor = userData.value.getErc721HealthFactor();
    nearLiquidation.nftHealthFactor = nftHealthFactor.gt(BigInt.fromI32(666666))
      ? BigDecimal.fromString("666666")
      : nftHealthFactor.toBigDecimal();
  }
  let userAccount = handleUser(holder.account);
  let userAssets = userAccount.collateralAssets;
  for (let i = 0; i < userAssets.length; i++) {
    let ID = userAssets[i];
    let accountAsset = AccountAssets.load(ID);
    if (accountAsset) {
      if (accountAsset.identifierOrCriteria.equals(ZERO_BI)) {
        let erc20Asset = new NearLiquidationERC20Asset(accountAsset.id);
        let assetId = accountAsset.asset;
        let asset = Asset.load(assetId);
        if (asset) {
          erc20Asset.symbol = asset.collectionName;
          erc20Asset.amount = asset.amount.divDecimal(
            BigDecimal.fromString(
              BigInt.fromString("10")
                .pow(U8.parseInt(asset.decimal.toString()))
                .toString()
            )
          );
          erc20Asset.valueInUSD = asset.currentPriceInUSD;
          erc20Asset.decimal = asset.decimal;
          let erc20Assets = nearLiquidation.erc20Assets;
          erc20Assets.push(erc20Asset.id);
          nearLiquidation.erc20Assets = erc20Assets;
        }
      } else {
        let erc721Asset = new NearLiquidationERC721Asset(accountAsset.id);
        let assetId = accountAsset.asset;
        let asset = Asset.load(assetId);
        if (asset) {
          erc721Asset.collectionName = asset.collectionName;
          erc721Asset.contractAddress = asset.contractAddress;
          erc721Asset.identifierOrCriteria = asset.identifierOrCriteria;
          erc721Asset.floorPrice = asset.floorPriceInUSD;
          erc721Asset.floorPriceInUSD = asset.currentPriceInUSD;
          erc721Asset.traitMultiplier = asset.traitMultiplier;
          let erc721Assets = nearLiquidation.erc721Assets;
          erc721Assets.push(erc721Asset.id);
          nearLiquidation.erc721Assets = erc721Assets;
        }
      }
    }
  }
  nearLiquidation.save();
}

export function handleAllStake(): void {
  let apeStakingSummary = ApeStakingSummary.load("1");
  if (!apeStakingSummary) {
    apeStakingSummary = new ApeStakingSummary("1");
    apeStakingSummary.apeCoinStaked = ZERO_BI;
  }
  apeStakingSummary.baycStaked = ZERO_BI;
  apeStakingSummary.maycStaked = ZERO_BI;
  apeStakingSummary.bakcStaked = ZERO_BI;
  let apeCoinStaking = ApeCoinStaking.bind(Address.fromString(APECOINSTAKING));
  let nBAYCStaking = apeCoinStaking.try_getAllStakes(Address.fromString(nBAYC));
  let totalDeposit = ZERO_BI;
  if (!nBAYCStaking.reverted) {
    for (let i = 0; i < nBAYCStaking.value.length; i++) {
      if (nBAYCStaking.value[i][2].toBigInt().gt(ZERO_BI)) {
        if (nBAYCStaking.value[i][0].toI32() == 1) {
          apeStakingSummary.baycStaked = apeStakingSummary.baycStaked.plus(
            ONE_BI
          );
        } else if (nBAYCStaking.value[i][0].toI32() == 3) {
          apeStakingSummary.bakcStaked = apeStakingSummary.bakcStaked.plus(
            ONE_BI
          );
        }
        totalDeposit = totalDeposit.plus(nBAYCStaking.value[i][2].toBigInt());
      }
    }
  }
  let nMAYCStaking = apeCoinStaking.try_getAllStakes(Address.fromString(nMAYC));
  if (!nMAYCStaking.reverted) {
    for (let i = 0; i < nMAYCStaking.value.length; i++) {
      if (nMAYCStaking.value[i][2].toBigInt().gt(ZERO_BI)) {
        if (nMAYCStaking.value[i][0].toI32() == 2) {
          apeStakingSummary.maycStaked = apeStakingSummary.maycStaked.plus(
            ONE_BI
          );
        } else if (nMAYCStaking.value[i][0].toI32() == 3) {
          apeStakingSummary.bakcStaked = apeStakingSummary.bakcStaked.plus(
            ONE_BI
          );
        }
        totalDeposit = totalDeposit.plus(nMAYCStaking.value[i][2].toBigInt());
      }
    }
  }
  let nBAKCStaking = apeCoinStaking.try_getAllStakes(Address.fromString(nBAKC));
  if (!nBAKCStaking.reverted) {
    for (let i = 0; i < nBAKCStaking.value.length; i++) {
      if (nBAKCStaking.value[i][2].toBigInt().gt(ZERO_BI)) {
        apeStakingSummary.bakcStaked = apeStakingSummary.bakcStaked.plus(
          ONE_BI
        );
        totalDeposit = totalDeposit.plus(nBAKCStaking.value[i][2].toBigInt());
      }
    }
  }
  let P2PStaking = apeCoinStaking.try_getAllStakes(
    Address.fromString(P2PPairStaking)
  );
  if (!P2PStaking.reverted) {
    for (let i = 0; i < P2PStaking.value.length; i++) {
      if (P2PStaking.value[i][2].toBigInt().gt(ZERO_BI)) {
        if (P2PStaking.value[i][0].toI32() == 1) {
          apeStakingSummary.baycStaked = apeStakingSummary.baycStaked.plus(
            ONE_BI
          );
        } else if (P2PStaking.value[i][0].toI32() == 2) {
          apeStakingSummary.maycStaked = apeStakingSummary.maycStaked.plus(
            ONE_BI
          );
        } else {
          apeStakingSummary.bakcStaked = apeStakingSummary.bakcStaked.plus(
            ONE_BI
          );
        }
        totalDeposit = totalDeposit.plus(P2PStaking.value[i][2].toBigInt());
      }
    }
  }
  let cAPEStaking = apeCoinStaking.try_stakedTotal(Address.fromString(cAPE));
  if (!cAPEStaking.reverted) {
    apeStakingSummary.apeCoinStaked = totalDeposit.plus(cAPEStaking.value);
  }
  apeStakingSummary.save();
}

export function handleAutoCompound(event: Deposit): void {
  let id = event.transaction.hash.toHexString();
  let autoCompoundHistory = new AutoCompoundHistory(id);
  autoCompoundHistory.txHash = event.transaction.hash;
  autoCompoundHistory.nftPoolSymbol = "APE";
  autoCompoundHistory.triggeredBy = event.transaction.from.toHexString();
  autoCompoundHistory.blockTimestamp = event.block.timestamp;
  autoCompoundHistory.save();
}

export function addHolder(asset: Bytes, account: Bytes): void {
  let holderID = `${asset.toHexString()}-${account.toHexString()}`;
  let holder = Holder.load(holderID);
  if (!holder) {
    holder = new Holder(holderID);
    holder.account = account;
    holder.asset = asset;

    let assetPrice = AssetPrice.load(asset.toHexString());
    if (assetPrice) {
      let holders = assetPrice.holders;
      holders.push(holder.id);
      assetPrice.holders = holders;
      assetPrice.save();
    }
    holder.save();
  }
}

export function removeHolder(asset: Bytes, account: Bytes): void {
  let holderID = `${asset.toHexString()}-${account.toHexString()}`;
  let holder = Holder.load(holderID);
  if (holder) {
    holder.unset(holderID);
  }
}
