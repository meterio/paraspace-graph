import {
  Deposit,
  DepositNft,
  DepositPairNft,
  Withdraw,
  WithdrawNft,
  WithdrawPairNft,
} from "../generated/ApeCoinStaking/Contract";
import { ApeStakingSummary, DashboardStake, Asset } from "../generated/schema";
import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  ONE_BI,
  ZERO_BI,
  nBAYC,
  nMAYC,
  cAPE,
  BAYC_ADDRESS,
  MAYC_ADDRESS,
  BAKC_ADDRESS,
} from "./constants";

export function handleDeposit(event: Deposit): void {
  let apeStakingSummary = ApeStakingSummary.load("1");
  if (!apeStakingSummary) {
    apeStakingSummary = new ApeStakingSummary("1");
    apeStakingSummary.apeCoinStaked = ZERO_BI;
  }
  if (event.params.user == cAPE) {
    apeStakingSummary.apeCoinStaked = apeStakingSummary.apeCoinStaked.plus(
      event.params.amount
    );
  }
  apeStakingSummary.save();
}
export function handleDepositNft(event: DepositNft): void {
  if (event.params.user == nBAYC || event.params.user == nMAYC) {
    let dashboardStake = DashboardStake.load(
      `${event.params.poolId.toHexString()}-${event.params.tokenId.toHexString()}`
    );
    if (!dashboardStake) {
      dashboardStake = new DashboardStake(
        `${event.params.poolId.toHexString()}-${event.params.tokenId.toHexString()}`
      );
      dashboardStake.poolId = event.params.poolId;
      dashboardStake.tokenId = event.params.tokenId;
      dashboardStake.deposited = ZERO_BI;
      dashboardStake.MainTokenId = ZERO_BI;
      dashboardStake.MainPoolId = ZERO_BI;
    }
    dashboardStake.deposited = dashboardStake.deposited.plus(
      event.params.amount
    );
    dashboardStake.save();

    let reserve: Address;
    if (event.params.poolId.equals(ONE_BI)) {
      reserve = BAYC_ADDRESS;
    } else {
      reserve = MAYC_ADDRESS;
    }

    let assetId = `${reserve.toHexString()}-${event.params.tokenId}`;
    let asset = Asset.load(assetId);
    if (!asset) {
      asset = new Asset(assetId);
      asset.token = reserve;
      asset.tokenId = event.params.tokenId;
      asset.amount = ONE_BI;
      asset.inPool = true;
      asset.inStake = false;
    }
    asset.inStake = true;
    asset.save();
  }
}
export function handleDepositPairNft(event: DepositPairNft): void {
  if (event.params.user == nBAYC || event.params.user == nMAYC) {
    let dashboardStake = DashboardStake.load(
      `3_${event.params.bakcTokenId.toHexString()}`
    );
    if (!dashboardStake) {
      dashboardStake = new DashboardStake(
        `3_${event.params.bakcTokenId.toHexString()}`
      );
      dashboardStake.poolId = BigInt.fromI32(3);
      dashboardStake.tokenId = event.params.bakcTokenId;
      dashboardStake.deposited = ZERO_BI;
    }
    dashboardStake.deposited = dashboardStake.deposited.plus(
      event.params.amount
    );
    dashboardStake.MainTokenId = event.params.mainTokenId;
    dashboardStake.MainPoolId = event.params.mainTypePoolId;
    dashboardStake.save();

    let assetId = `${BAKC_ADDRESS.toHexString()}-${event.params.bakcTokenId}`;
    let asset = Asset.load(assetId);
    if (!asset) {
      asset = new Asset(assetId);
      asset.token = BAKC_ADDRESS;
      asset.tokenId = event.params.bakcTokenId;
      asset.amount = ONE_BI;
      asset.inPool = true;
      asset.inStake = false;
    }
    asset.inStake = true;
    asset.save();

    let mainReserve: Address;
    if (event.params.mainTypePoolId.equals(ONE_BI)) {
      mainReserve = BAYC_ADDRESS;
    } else {
      mainReserve = MAYC_ADDRESS;
    }

    let mainAssetId = `${mainReserve.toHexString()}-${
      event.params.mainTokenId
    }`;
    let mainAsset = Asset.load(mainAssetId);
    if (!mainAsset) {
      mainAsset = new Asset(mainAssetId);
      mainAsset.token = mainReserve;
      mainAsset.tokenId = event.params.mainTokenId;
      mainAsset.amount = ONE_BI;
      mainAsset.inPool = true;
      mainAsset.inStake = false;
    }
    mainAsset.inStake = true;
    mainAsset.save();
  }
}

export function handleWithdraw(event: Withdraw): void {
  let apeStakingSummary = ApeStakingSummary.load("1");
  if (apeStakingSummary) {
    if (event.params.user == cAPE) {
      apeStakingSummary.apeCoinStaked = apeStakingSummary.apeCoinStaked.minus(
        event.params.amount
      );
    }
    apeStakingSummary.save();
  }
}

export function handleWithdrawNft(event: WithdrawNft): void {
  if (event.params.user == nBAYC || event.params.user == nMAYC) {
    let dashboardStake = DashboardStake.load(
      `${event.params.poolId.toHexString()}-${event.params.tokenId.toHexString()}`
    );
    if (!dashboardStake) {
      dashboardStake = new DashboardStake(
        `${event.params.poolId.toHexString()}-${event.params.tokenId.toHexString()}`
      );
      dashboardStake.poolId = event.params.poolId;
      dashboardStake.tokenId = event.params.tokenId;
      dashboardStake.deposited = ZERO_BI;
      dashboardStake.MainTokenId = ZERO_BI;
      dashboardStake.MainPoolId = ZERO_BI;
    } else {
      dashboardStake.deposited = dashboardStake.deposited.minus(
        event.params.amount
      );
    }
    dashboardStake.save();
  }
}
export function handleWithdrawPairNft(event: WithdrawPairNft): void {
  if (event.params.user == nBAYC || event.params.user == nMAYC) {
    let dashboardStake = DashboardStake.load(
      `3_${event.params.bakcTokenId.toHexString()}`
    );
    if (!dashboardStake) {
      dashboardStake = new DashboardStake(
        `3_${event.params.bakcTokenId.toHexString()}`
      );
      dashboardStake.poolId = BigInt.fromI32(3);
      dashboardStake.tokenId = event.params.bakcTokenId;
      dashboardStake.deposited = ZERO_BI;
      dashboardStake.MainTokenId = event.params.mainTokenId;
      dashboardStake.MainPoolId = event.params.mainTypePoolId;
    } else {
      dashboardStake.deposited = dashboardStake.deposited.minus(
        event.params.amount
      );
    }
    dashboardStake.save();
  }
}
