import {
  BorrowCapChanged,
  CollateralConfigurationChanged,
  LiquidationProtocolFeeChanged,
  ReserveActive,
  ReserveAuctionStrategyChanged,
  ReserveBorrowing,
  ReserveDropped,
  ReserveFactorChanged,
  ReserveFrozen,
  ReserveInitialized,
  ReserveInterestRateStrategyChanged,
  ReservePaused,
  SiloedBorrowingChanged,
  SupplyCapChanged,
  VariableDebtTokenUpgraded,
  XTokenUpgraded,
} from "../generated/PoolConfigurator/Contract";
import {
  PoolConfiguratorBorrowCapChangedEntity,
  PoolConfiguratorCollateralConfigurationChangedEntity,
  PoolConfiguratorLiquidationProtocolFeeChangedEntity,
  PoolConfiguratorReserveActiveEntity,
  PoolConfiguratorReserveAuctionStrategyChangedEntity,
  PoolConfiguratorReserveBorrowingEntity,
  PoolConfiguratorReserveDroppedEntity,
  PoolConfiguratorReserveFactorChangedEntity,
  PoolConfiguratorReserveFrozenEntity,
  PoolConfiguratorReserveInitializedEntity,
  PoolConfiguratorReserveInterestRateStrategyChangedEntity,
  PoolConfiguratorReservePausedEntity,
  PoolConfiguratorSiloedBorrowingChangedEntity,
  PoolConfiguratorSupplyCapChangedEntity,
  PoolConfiguratorVariableDebtTokenUpgradedEntity,
  PoolConfiguratorXTokenUpgradedEntity,
} from "../generated/schema";
import {
} from "./factories"
import { log } from "@graphprotocol/graph-ts";

export function handleBorrowCapChanged(event: BorrowCapChanged): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorBorrowCapChangedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorBorrowCapChangedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.oldBorrowCap = event.params.oldBorrowCap
  entity.newBorrowCap = event.params.newBorrowCap
  entity.save();
}
export function handleCollateralConfigurationChanged(event: CollateralConfigurationChanged): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorCollateralConfigurationChangedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorCollateralConfigurationChangedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.ltv = event.params.ltv
  entity.liquidationThreshold = event.params.liquidationThreshold
  entity.liquidationBonus = event.params.liquidationBonus
  entity.save();
}
export function handleLiquidationProtocolFeeChanged(event: LiquidationProtocolFeeChanged): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorLiquidationProtocolFeeChangedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorLiquidationProtocolFeeChangedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.oldFee = event.params.oldFee
  entity.newFee = event.params.newFee
  entity.save();
}
export function handleReserveActive(event: ReserveActive): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorReserveActiveEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorReserveActiveEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.active = event.params.active
  entity.save();
}
export function handleReserveAuctionStrategyChanged(event: ReserveAuctionStrategyChanged): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorReserveAuctionStrategyChangedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorReserveAuctionStrategyChangedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.oldStrategy = event.params.oldStrategy
  entity.newStrategy = event.params.newStrategy
  entity.save();
}
export function handleReserveBorrowing(event: ReserveBorrowing): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorReserveBorrowingEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorReserveBorrowingEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.enabled = event.params.enabled
  entity.save();
}
export function handleReserveDropped(event: ReserveDropped): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorReserveDroppedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorReserveDroppedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.save();
}
export function handleReserveFactorChanged(event: ReserveFactorChanged): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorReserveFactorChangedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorReserveFactorChangedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.oldReserveFactor = event.params.oldReserveFactor
  entity.newReserveFactor = event.params.newReserveFactor
  entity.save();
}
export function handleReserveFrozen(event: ReserveFrozen): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorReserveFrozenEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorReserveFrozenEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.frozen = event.params.frozen
  entity.save();
}
export function handleReserveInitialized(event: ReserveInitialized): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorReserveInitializedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorReserveInitializedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.xToken = event.params.xToken
  entity.variableDebtToken = event.params.variableDebtToken
  entity.interestRateStrategyAddress = event.params.interestRateStrategyAddress
  entity.save();
}
export function handleReserveInterestRateStrategyChanged(event: ReserveInterestRateStrategyChanged): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorReserveInterestRateStrategyChangedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorReserveInterestRateStrategyChangedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.oldStrategy = event.params.oldStrategy
  entity.newStrategy = event.params.newStrategy
  entity.save();
}
export function handleReservePaused(event: ReservePaused): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorReservePausedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorReservePausedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.paused = event.params.paused
  entity.save();
}
export function handleSiloedBorrowingChanged(event: SiloedBorrowingChanged): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorSiloedBorrowingChangedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorSiloedBorrowingChangedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.oldState = event.params.oldState
  entity.newState = event.params.newState
  entity.save();
}
export function handleSupplyCapChanged(event: SupplyCapChanged): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorSupplyCapChangedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorSupplyCapChangedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.oldSupplyCap = event.params.oldSupplyCap
  entity.newSupplyCap = event.params.newSupplyCap
  entity.save();
}
export function handleVariableDebtTokenUpgraded(event: VariableDebtTokenUpgraded): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorVariableDebtTokenUpgradedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorVariableDebtTokenUpgradedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.proxy = event.params.proxy
  entity.implementation = event.params.implementation
  entity.save();
}
export function handleXTokenUpgraded(event: XTokenUpgraded): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolConfiguratorXTokenUpgradedEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolConfiguratorXTokenUpgradedEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.msgValue = event.transaction.value;
  entity.transactionHash = event.transaction.hash;
  entity.asset = event.params.asset
  entity.proxy = event.params.proxy
  entity.implementation = event.params.implementation
  entity.save();
}
