import {
  Address,
  BigDecimal,
  BigInt,
  dataSource,
  log,
} from "@graphprotocol/graph-ts";

export const BAYC_ADDRESS: Address = Address.fromString(
  "0xf40299b626ef6e197f5d9de9315076cab788b6ef"
);
export const MAYC_ADDRESS: Address = Address.fromString(
  "0x3f228cBceC3aD130c45D21664f2C7f5b23130d23"
);
export const BAKC_ADDRESS: Address = Address.fromString(
  "0xd60d682764Ee04e54707Bee7B564DC65b31884D0"
);
export const APE_ADDRESS: Address = Address.fromString(
  "0x328507DC29C95c170B56a1b3A758eB7a9E73455c"
);
export const nBAYC: Address = Address.fromString(
  "0xACfC714A4Db536Fe1c5F2576C0c208a4E5cfCBa9"
);
export const nMAYC: Address = Address.fromString(
  "0x06775578497363fAb576353b0c871634429AF3A7"
);
export const APECOINSTAKING: Address = Address.fromString(
  "0xeF37717B1807a253c6D140Aca0141404D23c26D4"
);
export const cAPE: Address = Address.fromString(
  "0xA6CCb7667D508Adb1Ec0e4aaDbab56667076485f"
);

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString("0");
export let ONE_BD = BigDecimal.fromString("1");
export let BI_18 = BigInt.fromI32(18);
export let DAY = BigDecimal.fromString("86400");

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
