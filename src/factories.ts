import {
  PoolCoreSupplyERC721TokenData,
  PoolMarketplaceAcceptBidWithCreditOrderInfoOffer,
  PoolMarketplaceAcceptBidWithCreditOrderInfoConsideration,
  PoolMarketplaceAcceptBidWithCreditOrderInfo,
  PoolMarketplaceAcceptBidWithCreditCredit,
  PoolMarketplaceBuyWithCreditOrderInfoOffer,
  PoolMarketplaceBuyWithCreditOrderInfoConsideration,
  PoolMarketplaceBuyWithCreditOrderInfo,
  PoolMarketplaceBuyWithCreditCredit,
} from "../generated/schema"

import {
  SupplyERC721TokenDataStruct,
} from "../generated/PoolCore/Contract"
import {
  AcceptBidWithCreditOrderInfoOfferStruct,
  AcceptBidWithCreditOrderInfoConsiderationStruct,
  AcceptBidWithCreditOrderInfoStruct,
  AcceptBidWithCreditCreditStruct,
  BuyWithCreditOrderInfoOfferStruct,
  BuyWithCreditOrderInfoConsiderationStruct,
  BuyWithCreditOrderInfoStruct,
  BuyWithCreditCreditStruct,
} from "../generated/PoolMarketplace/Contract"
import {
} from "../generated/PoolConfigurator/Contract"

// PoolCore

type FPoolCoreSupplyERC721TokenData = (params: SupplyERC721TokenDataStruct, id: string) => string
export const PoolCoreSupplyERC721TokenData__factory: FPoolCoreSupplyERC721TokenData = (params, id) => {
  const entity = new PoolCoreSupplyERC721TokenData(id);
  entity.tokenId = params.tokenId;
  entity.useAsCollateral = params.useAsCollateral;
  entity.save();
  return id;
}
// PoolMarketplace

type FPoolMarketplaceAcceptBidWithCreditOrderInfoOffer = (params: AcceptBidWithCreditOrderInfoOfferStruct, id: string) => string
export const PoolMarketplaceAcceptBidWithCreditOrderInfoOffer__factory: FPoolMarketplaceAcceptBidWithCreditOrderInfoOffer = (params, id) => {
  const entity = new PoolMarketplaceAcceptBidWithCreditOrderInfoOffer(id);
  entity.itemType = params.itemType;
  entity.token = params.token;
  entity.identifierOrCriteria = params.identifierOrCriteria;
  entity.startAmount = params.startAmount;
  entity.endAmount = params.endAmount;
  entity.save();
  return id;
}

type FPoolMarketplaceAcceptBidWithCreditOrderInfoConsideration = (params: AcceptBidWithCreditOrderInfoConsiderationStruct, id: string) => string
export const PoolMarketplaceAcceptBidWithCreditOrderInfoConsideration__factory: FPoolMarketplaceAcceptBidWithCreditOrderInfoConsideration = (params, id) => {
  const entity = new PoolMarketplaceAcceptBidWithCreditOrderInfoConsideration(id);
  entity.itemType = params.itemType;
  entity.token = params.token;
  entity.identifierOrCriteria = params.identifierOrCriteria;
  entity.startAmount = params.startAmount;
  entity.endAmount = params.endAmount;
  entity.recipient = params.recipient;
  entity.save();
  return id;
}

type FPoolMarketplaceAcceptBidWithCreditOrderInfo = (params: AcceptBidWithCreditOrderInfoStruct, id: string) => string
export const PoolMarketplaceAcceptBidWithCreditOrderInfo__factory: FPoolMarketplaceAcceptBidWithCreditOrderInfo = (params, id) => {
  const entity = new PoolMarketplaceAcceptBidWithCreditOrderInfo(id);
  entity.maker = params.maker;
  entity.taker = params.taker;
  entity.tid = params.id;
  entity.offer = []
  for(let i = 0; i < params.offer.length; i++) {
    const e = params.offer[i];
    entity.offer.push(PoolMarketplaceAcceptBidWithCreditOrderInfoOffer__factory(e, id+i.toString()))
  }
  entity.consideration = []
  for(let i = 0; i < params.consideration.length; i++) {
    const e = params.consideration[i];
    entity.consideration.push(PoolMarketplaceAcceptBidWithCreditOrderInfoConsideration__factory(e, id+i.toString()))
  }
  entity.save();
  return id;
}

type FPoolMarketplaceAcceptBidWithCreditCredit = (params: AcceptBidWithCreditCreditStruct, id: string) => string
export const PoolMarketplaceAcceptBidWithCreditCredit__factory: FPoolMarketplaceAcceptBidWithCreditCredit = (params, id) => {
  const entity = new PoolMarketplaceAcceptBidWithCreditCredit(id);
  entity.token = params.token;
  entity.amount = params.amount;
  entity.orderId = params.orderId;
  entity.v = params.v;
  entity.r = params.r;
  entity.s = params.s;
  entity.save();
  return id;
}

type FPoolMarketplaceBuyWithCreditOrderInfoOffer = (params: BuyWithCreditOrderInfoOfferStruct, id: string) => string
export const PoolMarketplaceBuyWithCreditOrderInfoOffer__factory: FPoolMarketplaceBuyWithCreditOrderInfoOffer = (params, id) => {
  const entity = new PoolMarketplaceBuyWithCreditOrderInfoOffer(id);
  entity.itemType = params.itemType;
  entity.token = params.token;
  entity.identifierOrCriteria = params.identifierOrCriteria;
  entity.startAmount = params.startAmount;
  entity.endAmount = params.endAmount;
  entity.save();
  return id;
}

type FPoolMarketplaceBuyWithCreditOrderInfoConsideration = (params: BuyWithCreditOrderInfoConsiderationStruct, id: string) => string
export const PoolMarketplaceBuyWithCreditOrderInfoConsideration__factory: FPoolMarketplaceBuyWithCreditOrderInfoConsideration = (params, id) => {
  const entity = new PoolMarketplaceBuyWithCreditOrderInfoConsideration(id);
  entity.itemType = params.itemType;
  entity.token = params.token;
  entity.identifierOrCriteria = params.identifierOrCriteria;
  entity.startAmount = params.startAmount;
  entity.endAmount = params.endAmount;
  entity.recipient = params.recipient;
  entity.save();
  return id;
}

type FPoolMarketplaceBuyWithCreditOrderInfo = (params: BuyWithCreditOrderInfoStruct, id: string) => string
export const PoolMarketplaceBuyWithCreditOrderInfo__factory: FPoolMarketplaceBuyWithCreditOrderInfo = (params, id) => {
  const entity = new PoolMarketplaceBuyWithCreditOrderInfo(id);
  entity.maker = params.maker;
  entity.taker = params.taker;
  entity.tid = params.id;
  entity.offer = []
  for(let i = 0; i < params.offer.length; i++) {
    const e = params.offer[i];
    entity.offer.push(PoolMarketplaceBuyWithCreditOrderInfoOffer__factory(e, id+i.toString()))
  }
  entity.consideration = []
  for(let i = 0; i < params.consideration.length; i++) {
    const e = params.consideration[i];
    entity.consideration.push(PoolMarketplaceBuyWithCreditOrderInfoConsideration__factory(e, id+i.toString()))
  }
  entity.save();
  return id;
}

type FPoolMarketplaceBuyWithCreditCredit = (params: BuyWithCreditCreditStruct, id: string) => string
export const PoolMarketplaceBuyWithCreditCredit__factory: FPoolMarketplaceBuyWithCreditCredit = (params, id) => {
  const entity = new PoolMarketplaceBuyWithCreditCredit(id);
  entity.token = params.token;
  entity.amount = params.amount;
  entity.orderId = params.orderId;
  entity.v = params.v;
  entity.r = params.r;
  entity.s = params.s;
  entity.save();
  return id;
}
// PoolConfigurator
