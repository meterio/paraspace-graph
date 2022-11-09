import {
  Borrow,
  FlashClaim,
  LiquidateERC20,
  LiquidateERC721,
  Repay,
  ReserveUsedAsCollateralDisabled,
  ReserveUsedAsCollateralEnabled,
  Supply,
  SupplyERC721,
  Withdraw,
  WithdrawERC721,
} from "../generated/PoolCore/Contract";
import {
  PoolCoreBorrowEntity,
  PoolCoreFlashClaimEntity,
  PoolCoreLiquidateERC20Entity,
  PoolCoreLiquidateERC721Entity,
  PoolCoreRepayEntity,
  PoolCoreReserveUsedAsCollateralDisabledEntity,
  PoolCoreReserveUsedAsCollateralEnabledEntity,
  PoolCoreSupplyEntity,
  PoolCoreSupplyERC721Entity,
  PoolCoreWithdrawEntity,
  PoolCoreWithdrawERC721Entity,
} from "../generated/schema";
import {
  PoolCoreSupplyERC721TokenData__factory,
} from "./factories"
import { log } from "@graphprotocol/graph-ts";

export function handleBorrow(event: Borrow): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolCoreBorrowEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolCoreBorrowEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.onBehalfOf = event.params.onBehalfOf
  entity.amount = event.params.amount
  entity.borrowRate = event.params.borrowRate
  entity.referralCode = event.params.referralCode
  entity.save();
}
export function handleFlashClaim(event: FlashClaim): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolCoreFlashClaimEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolCoreFlashClaimEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.target = event.params.target
  entity.initiator = event.params.initiator
  entity.nftAsset = event.params.nftAsset
  entity.tokenId = event.params.tokenId
  entity.save();
}
export function handleLiquidateERC20(event: LiquidateERC20): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolCoreLiquidateERC20Entity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolCoreLiquidateERC20Entity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.collateralAsset = event.params.collateralAsset
  entity.liquidationAsset = event.params.liquidationAsset
  entity.borrower = event.params.borrower
  entity.liquidationAmount = event.params.liquidationAmount
  entity.liquidatedCollateralAmount = event.params.liquidatedCollateralAmount
  entity.liquidator = event.params.liquidator
  entity.receivePToken = event.params.receivePToken
  entity.save();
}
export function handleLiquidateERC721(event: LiquidateERC721): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolCoreLiquidateERC721Entity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolCoreLiquidateERC721Entity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.collateralAsset = event.params.collateralAsset
  entity.liquidationAsset = event.params.liquidationAsset
  entity.borrower = event.params.borrower
  entity.liquidationAmount = event.params.liquidationAmount
  entity.liquidatedCollateralTokenId = event.params.liquidatedCollateralTokenId
  entity.liquidator = event.params.liquidator
  entity.receiveNToken = event.params.receiveNToken
  entity.save();
}
export function handleRepay(event: Repay): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolCoreRepayEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolCoreRepayEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.repayer = event.params.repayer
  entity.amount = event.params.amount
  entity.usePTokens = event.params.usePTokens
  entity.save();
}
export function handleReserveUsedAsCollateralDisabled(event: ReserveUsedAsCollateralDisabled): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolCoreReserveUsedAsCollateralDisabledEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolCoreReserveUsedAsCollateralDisabledEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.save();
}
export function handleReserveUsedAsCollateralEnabled(event: ReserveUsedAsCollateralEnabled): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolCoreReserveUsedAsCollateralEnabledEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolCoreReserveUsedAsCollateralEnabledEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.save();
}
export function handleSupply(event: Supply): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolCoreSupplyEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolCoreSupplyEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.onBehalfOf = event.params.onBehalfOf
  entity.amount = event.params.amount
  entity.referralCode = event.params.referralCode
  entity.save();
}
export function handleSupplyERC721(event: SupplyERC721): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolCoreSupplyERC721Entity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolCoreSupplyERC721Entity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.onBehalfOf = event.params.onBehalfOf
  entity.tokenData = []
  for(let i = 0; i < event.params.tokenData.length; i++) {
    const e = event.params.tokenData[i];
    entity.tokenData.push(PoolCoreSupplyERC721TokenData__factory(e, ID+i.toString()))
  }
  entity.referralCode = event.params.referralCode
  entity.fromNToken = event.params.fromNToken
  entity.save();
}
export function handleWithdraw(event: Withdraw): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolCoreWithdrawEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolCoreWithdrawEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.to = event.params.to
  entity.amount = event.params.amount
  entity.save();
}
export function handleWithdrawERC721(event: WithdrawERC721): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolCoreWithdrawERC721Entity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolCoreWithdrawERC721Entity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.reserve = event.params.reserve
  entity.user = event.params.user
  entity.to = event.params.to
  entity.tokenIds = event.params.tokenIds
  entity.save();
}
