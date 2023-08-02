import {
  AgreementClaimed,
  AgreementCreated,
} from "../generated/TimeLock/Contract";
import {
  Borrow,
  LiquidateERC20,
  LiquidateERC721,
  Repay,
  Supply,
  SupplyERC721,
  Withdraw,
  WithdrawERC721,
} from "../generated/PoolCore/Contract";
import {
  TimelockAssetInfo,
  Timelock,
  Asset,
  AssetPrice,
  AccountAssets,
} from "../generated/schema";
import { ethereum, BigInt } from "@graphprotocol/graph-ts";
import { ZERO_BI } from "./constants";
import {
  handleUser,
  handleAsset,
  addHolder,
  removeHolder,
  handleAccountAsset,
} from "./helper";

// export function handleBlock(block: ethereum.Block): void {
//   let number = block.number;
//   if (number.mod(BigInt.fromI32(1000)).equals(ZERO_BI)) {
//     handlePrices();
//   }
// }
export function handleLiquidateERC20(event: LiquidateERC20): void {}
export function handleLiquidateERC721(event: LiquidateERC721): void {}

export function handleBorrow(event: Borrow): void {
  let user = handleUser(event.params.user);
  let accountAsset = handleAsset(
    event.params.reserve,
    ZERO_BI
  );
  let assets = user.debtAssets;
  assets.push(accountAsset.id);
  user.debtAssets = assets;
  user.save();
  addHolder(event.params.reserve, event.params.user);
}

export function handleRepay(event: Repay): void {
  let accountAsset = handleAsset(
    event.params.reserve,
    ZERO_BI
  );
  if (accountAsset.amount.equals(ZERO_BI)) {
    accountAsset.unset(accountAsset.id);
  }
}
export function handleSupply(event: Supply): void {
  let user = handleUser(event.params.user);
  let accountAsset = handleAsset(
    event.params.reserve,
    ZERO_BI
  );
  let assets = user.collateralAssets;
  assets.push(accountAsset.id);
  user.collateralAssets = assets;
  user.save();
  addHolder(event.params.reserve, event.params.user);
}
export function handleSupplyERC721(event: SupplyERC721): void {
  let user = handleUser(event.params.user);
  let asset = handleAsset(
    event.params.reserve,
    event.params.tokenData[0].tokenId
  );
  let accountAsset = handleAccountAsset(
    event.params.user,
    asset,
    event.params.tokenData[0].tokenId,
    ZERO_BI
  );

  let assets = user.collateralAssets;
  assets.push(accountAsset.id);
  user.collateralAssets = assets;
  user.save();
  addHolder(event.params.reserve, event.params.user);
}
export function handleWithdraw(event: Withdraw): void {
  let accountAsset = handleAsset(
    event.params.reserve,
    ZERO_BI
  );
  if (accountAsset.amount.equals(ZERO_BI)) {
    accountAsset.unset(accountAsset.id);
  }
}
export function handleWithdrawERC721(event: WithdrawERC721): void {
  let ID = `${event.params.user}-${event.params.reserve}-${event.params.tokenIds}`;
  let accountAsset = AccountAssets.load(ID);
  if (accountAsset) {
    accountAsset.unset(ID);
    removeHolder(event.params.reserve, event.params.user);
  }
}

export function handleAgreementCreated(event: AgreementCreated): void {
  // let assets = TimelockAssetInfo.load(event.transaction.hash.toHexString());
  // if (!assets) {
  //   assets = new TimelockAssetInfo(event.transaction.hash.toHexString());
  // }
  // assets.type = event.params.assetType;
  // assets.token = event.params.asset;
  // assets.tokenIds = event.params.tokenIdsOrAmounts;
  // assets.amount = event.params.tokenIdsOrAmounts[0];
  // assets.save();
  // let timelock = Timelock.load(event.params.beneficiary.toHexString());
  // if (!timelock) {
  //   timelock = new Timelock(event.params.beneficiary.toHexString());
  // }
  // timelock.blockHeight = event.block.number.toI32();
  // timelock.agreementId = event.params.agreementId.toI32();
  // timelock.timeAdded = event.block.timestamp.toI32();
  // timelock.actionType = event.params.actionType;
  // timelock.assetInfo = assets.id;
  // timelock.transaction = event.transaction.hash;
  // timelock.expectedRelease = event.params.releaseTime.toI32();
  // timelock.status = 0;
  // timelock.beneficiary = event.params.beneficiary;
  // timelock.save();
}

export function handleAgreementClaimed(event: AgreementClaimed): void {
  // let timelock = Timelock.load(event.params.beneficiary.toHexString());
  // if (timelock) {
  //   timelock.status = 1;
  //   timelock.save();
  // }
}
