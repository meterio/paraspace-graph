import {
  PairStakingMatched,
  OrderCancelled,
  PairStakingBreakUp,
} from "../generated/P2PPairStaking/P2PPairStaking";
import {
  PairStakingMatchedEntity,
  OrderCancelledEntity,
  PairStakingBreakUpEntity,
} from "../generated/schema";

export function handlePairStakingMatched(event: PairStakingMatched): void {
  let txId = event.transaction.hash;
  let orderHash = event.params.orderHash;
  let id = `${orderHash.toHex()}-${txId.toHex()}`;
  let pairStakingMatchedEntity = new PairStakingMatchedEntity(id);
  pairStakingMatchedEntity.txId = txId;
  pairStakingMatchedEntity.orderHash = orderHash;
  pairStakingMatchedEntity.input = event.transaction.input;
  pairStakingMatchedEntity.timestamp = event.block.timestamp;
  pairStakingMatchedEntity.save();
}

export function handleOrderCancelled(event: OrderCancelled): void {
  let txId = event.transaction.hash;
  let orderHash = event.params.orderHash;
  let id = `${orderHash.toHex()}-${txId.toHex()}`;
  let orderCancelledEntity = new OrderCancelledEntity(id);
  orderCancelledEntity.txId = txId;
  orderCancelledEntity.orderHash = orderHash;
  orderCancelledEntity.offerer = event.params.offerer;
  orderCancelledEntity.timestamp = event.block.timestamp;
  orderCancelledEntity.save();
}

export function handlePairStakingBreakUp(event: PairStakingBreakUp): void {
  let txId = event.transaction.hash;
  let orderHash = event.params.orderHash;
  let id = `${orderHash.toHex()}-${txId.toHex()}`;
  let pairStakingBreakUpEntity = new PairStakingBreakUpEntity(id);
  pairStakingBreakUpEntity.txId = txId;
  pairStakingBreakUpEntity.orderHash = orderHash;
  pairStakingBreakUpEntity.timestamp = event.block.timestamp;
  pairStakingBreakUpEntity.save();
}
