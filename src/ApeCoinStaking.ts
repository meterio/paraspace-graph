import {
  Deposit,
  DepositNft,
  DepositPairNft,
  Withdraw,
  WithdrawNft,
  WithdrawPairNft,
} from "../generated/ApeCoinStaking/Contract";
import { DashboardStake } from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  ZERO_BI,
  getAddress,
} from "./constants";
import { handleAllStake, handleAutoCompound } from "./helper";

export function handleDeposit(event: Deposit): void {
  if (
    event.params.user == Address.fromString(getAddress("cAPE"))
  ) {
    handleAllStake();
    handleAutoCompound(event);
  }
}
export function handleDepositNft(event: DepositNft): void {
  if (
    event.params.user ==
      Address.fromString(getAddress("nBAYC")) ||
    event.params.user ==
      Address.fromString(getAddress("nMAYC")) ||
    event.params.user ==
      Address.fromString(getAddress("P2PPairStaking"))
  ) {
    let dashboardStake = DashboardStake.load(
      `${event.params.poolId}_${event.params.tokenId}`
    );
    if (!dashboardStake) {
      dashboardStake = new DashboardStake(
        `${event.params.poolId}_${event.params.tokenId}`
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
    handleAllStake();
  }
}
export function handleDepositPairNft(event: DepositPairNft): void {
  if (
    event.params.user ==
      Address.fromString(getAddress("nBAYC")) ||
    event.params.user ==
      Address.fromString(getAddress("nMAYC")) ||
    event.params.user ==
      Address.fromString(getAddress("nBAKC")) ||
    event.params.user ==
      Address.fromString(getAddress("P2PPairStaking"))
  ) {
    let dashboardStake = DashboardStake.load(`3_${event.params.bakcTokenId}`);
    if (!dashboardStake) {
      dashboardStake = new DashboardStake(`3_${event.params.bakcTokenId}`);
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
    handleAllStake();
  }
}

export function handleWithdraw(event: Withdraw): void {
  if (
    event.params.user == Address.fromString(getAddress("cAPE"))
  ) {
    handleAllStake();
  }
}

export function handleWithdrawNft(event: WithdrawNft): void {
  if (
    event.params.user ==
      Address.fromString(getAddress("nBAYC")) ||
    event.params.user ==
      Address.fromString(getAddress("nMAYC")) ||
    event.params.user ==
      Address.fromString(getAddress("P2PPairStaking"))
  ) {
    let dashboardStake = DashboardStake.load(
      `${event.params.poolId}_${event.params.tokenId}`
    );
    if (dashboardStake) {
      dashboardStake.deposited = dashboardStake.deposited.minus(
        event.params.amount
      );
      dashboardStake.save();
    }
    handleAllStake();
  }
}
export function handleWithdrawPairNft(event: WithdrawPairNft): void {
  if (
    event.params.user ==
      Address.fromString(getAddress("nBAYC")) ||
    event.params.user ==
      Address.fromString(getAddress("nMAYC")) ||
    event.params.user ==
      Address.fromString(getAddress("nBAKC")) ||
    event.params.user ==
      Address.fromString(getAddress("P2PPairStaking"))
  ) {
    let dashboardStake = DashboardStake.load(`3_${event.params.bakcTokenId}`);
    if (dashboardStake) {
      dashboardStake.deposited = dashboardStake.deposited.minus(
        event.params.amount
      );
      dashboardStake.save();
    }
    handleAllStake();
  }
}
