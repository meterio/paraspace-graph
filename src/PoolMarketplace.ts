import {
  AcceptBidWithCredit,
  BuyWithCredit,
} from "../generated/PoolMarketplace/Contract";
import {
  PoolMarketplaceAcceptBidWithCreditEntity,
  PoolMarketplaceBuyWithCreditEntity,
} from "../generated/schema";
import {
  PoolMarketplaceAcceptBidWithCreditOrderInfo__factory,
  PoolMarketplaceAcceptBidWithCreditCredit__factory,
  PoolMarketplaceBuyWithCreditOrderInfo__factory,
  PoolMarketplaceBuyWithCreditCredit__factory,
} from "./factories"
import { log } from "@graphprotocol/graph-ts";

export function handleAcceptBidWithCredit(event: AcceptBidWithCredit): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolMarketplaceAcceptBidWithCreditEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolMarketplaceAcceptBidWithCreditEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.transactionHash = event.transaction.hash;
  entity.marketplaceId = event.params.marketplaceId
  entity.orderInfo = PoolMarketplaceAcceptBidWithCreditOrderInfo__factory(event.params.orderInfo, ID)
  entity.credit = PoolMarketplaceAcceptBidWithCreditCredit__factory(event.params.credit, ID)
  entity.save();
}
export function handleBuyWithCredit(event: BuyWithCredit): void {
  const ID = `${event.transaction.hash.toHex()}-${event.transactionLogIndex.toString()}`;

  if (!!PoolMarketplaceBuyWithCreditEntity.load(ID)) {
    log.warning("Entity({}) exists!", [ID]);
  }

  let entity = new PoolMarketplaceBuyWithCreditEntity(ID);
  entity.block = event.block.number;
  entity.msgSender = event.transaction.from;
  entity.transactionHash = event.transaction.hash;
  entity.marketplaceId = event.params.marketplaceId
  entity.orderInfo = PoolMarketplaceBuyWithCreditOrderInfo__factory(event.params.orderInfo, ID)
  entity.credit = PoolMarketplaceBuyWithCreditCredit__factory(event.params.credit, ID)
  entity.save();
}
