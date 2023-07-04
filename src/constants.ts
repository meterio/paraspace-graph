import { BigDecimal, BigInt, TypedMap } from "@graphprotocol/graph-ts";
export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BD = BigDecimal.fromString("0");
export const ONE_BD = BigDecimal.fromString("1");
export const ONE_BD_1E18 = BigDecimal.fromString("1000000000000000000");
export const ONE_BD_1E8 = BigDecimal.fromString("100000000");
export const BI_18 = BigInt.fromI32(18);
export const DAY = BigDecimal.fromString("86400");
export const priceFactor = 0.9;
export const nearHealthFactor = BigInt.fromString("2000000000000000000");
export const inHealthFactor = BigInt.fromString("1000000000000000000");

export const WETH = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
export const aWETH = "0x7649e0d153752c556b8b23DB1f1D3d42993E83a5";
export const stETH = "0x0B7401Db44b917313D81Ab74360d0332b28Bf189";
export const cbETH = "0x6435A0f3915375565b68D8045db2260eb9357D29";
export const bendETH = "0x57FEbd640424C85b72b4361fE557a781C8d2a509";
export const astETH = "0x52Eb4B667a821913C0f7441eC1C0F431D2ec48DF";
export const DAI = "0xf85041979D4Be9ef32ab3390Dc5F85C8398ad42A";
export const FRAX = "0x53519a16BF91B5bcd35Ee8d440B20e02965fE42F";
export const USDC = "0xE5FE08f871755015561401750E077e121084Ed1B";
export const USDT = "0x4B6b5bEeE5d62f1352a6089aeB8a457cB7400Af9";
export const WBTC = "0xbf111371fA7bdC0dB53eC86024220491ff1Bb95f";
export const APE = "0x328507DC29C95c170B56a1b3A758eB7a9E73455c";
export const BLUR = "0xd695605c68A9Bc8dC68199bb368BfC8a748AB8bB";
export const wstETH = "0x4562D3AfA9aB1CD757E99A1D1814ba34D88FFeB4";
export const awstETH = "0x15DC733d48E4443935Ad8e23D0ef6Fa79A346C26";
export const cETH = "0x597C2EC69e316EDf1d8C2Aea9ef5b2310911A80b";
export const rETH = "0x0c36B61406a26f61f159911a1fe03F76B402A576";
export const DOODLE = "0x317e19Fe3DB508f1A45421379FBbd7564d0259c0";
export const WPUNKS = "0x72f6Ac2032CccF8e568f550a311C7d6C3FD7Cb7c";
export const BAYC = "0xF40299b626ef6E197F5d9DE9315076CAB788B6Ef";
export const MAYC = "0x3f228cBceC3aD130c45D21664f2C7f5b23130d23";
export const BAKC = "0xd60d682764Ee04e54707Bee7B564DC65b31884D0";
export const AZUKI = "0xD9f2065804D70f4DC65fD164457A81097C7737Ee";
export const PPG = "0xf140558cA4d4e10f63661504D4F3f74FADDDe3E8";
export const SEWER = "0x3aA026CD539fa1f6AE58ae238a10e2F1cf831454";
export const CLONEX = "0x46eB052832c24b8559e6F14ac49Fa198A4b0ddd6";
export const MOONBIRD = "0xeeA0f31778d0590a3Fc36aA1253C0d0d460C2e3B";
export const MEEBITS = "0xc5F8e13959cec7e9D634DFfc13e1d9E5c07ab957";
export const OTHR = "0x236ab41Fa59f82E3034F75aFf3161fC03f089D9A";
export const PUNK = "0x9770B130B06Ec1D372984b598ddb30C9bdBC26F1";
export const nBAYC = "0xACfC714A4Db536Fe1c5F2576C0c208a4E5cfCBa9";
export const nMAYC = "0x06775578497363fAb576353b0c871634429AF3A7";
export const nBAKC = "0x0D62693b01a69C9d4837cCfB6D41D638cE65Cb80";
export const APECOINSTAKING = "0xeF37717B1807a253c6D140Aca0141404D23c26D4";
export const cAPE = "0xA6CCb7667D508Adb1Ec0e4aaDbab56667076485f";
export const P2PPairStaking = "0xd9c4C4170c082A6933db215817c6A94d6D0aC92A";
export const ParaProxy = "0xF6d07265E9507233c5d0e524D146dF2794cE30c5";
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const ETH_ADRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const Chainlink_ETH = "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e";
export const Oracle = "0x1fDC3A407d68B5C4654865AAe643cA007FA31e0F";
export const PoolDataProvider = "0x419a95C85fC186Ae19a5b1e2F0319705D659fc6E";
export const AddressProvider = "0x2FddEa518DcF9dbEA045f15966F3Bd4fE6bAf21D";

export function getDecimals(address: String): BigInt {
  if (address == USDC || address == USDT) {
    return BigInt.fromI32(6);
  } else if (address == WBTC) {
    return BigInt.fromI32(8);
  } else {
    return BI_18;
  }
}

export function getName(address: string): string {
  if (address == WETH) {
    return "WETH";
  } else if (address == aWETH) {
    return "aWETH";
  } else if (address == stETH) {
    return "stETH";
  } else if (address == cbETH) {
    return "cbETH";
  } else if (address == bendETH) {
    return "bendETH";
  } else if (address == astETH) {
    return "astETH";
  } else if (address == DAI) {
    return "DAI";
  } else if (address == FRAX) {
    return "FRAX";
  } else if (address == USDC) {
    return "USDC";
  } else if (address == USDT) {
    return "USDT";
  } else if (address == WBTC) {
    return "WBTC";
  } else if (address == APE) {
    return "APE";
  } else if (address == BLUR) {
    return "BLUR";
  } else if (address == wstETH) {
    return "wstETH";
  } else if (address == awstETH) {
    return "awstETH";
  } else if (address == cETH) {
    return "cETH";
  } else if (address == rETH) {
    return "rETH";
  } else if (address == cAPE) {
    return "cAPE";
  } else if (address == DOODLE) {
    return "DOODLE";
  } else if (address == WPUNKS) {
    return "WPUNKS";
  } else if (address == BAYC) {
    return "BAYC";
  } else if (address == MAYC) {
    return "MAYC";
  } else if (address == BAKC) {
    return "BAKC";
  } else if (address == AZUKI) {
    return "AZUKI";
  } else if (address == PPG) {
    return "PPG";
  } else if (address == SEWER) {
    return "SEWER";
  } else if (address == CLONEX) {
    return "CLONEX";
  } else if (address == MOONBIRD) {
    return "MOONBIRD";
  } else if (address == MEEBITS) {
    return "MEEBITS";
  } else if (address == OTHR) {
    return "OTHR";
  } else if (address == PUNK) {
    return "PUNK";
  } else {
    return "unknow";
  }
}

export const ERC20Tokens = [
  WETH,
  aWETH,
  stETH,
  cbETH,
  bendETH,
  astETH,
  DAI,
  FRAX,
  USDC,
  USDT,
  WBTC,
  APE,
  BLUR,
  wstETH,
  awstETH,
  cETH,
  rETH,
];
export const ERC721Tokens = [
  DOODLE,
  WPUNKS,
  BAYC,
  MAYC,
  BAKC,
  AZUKI,
  PPG,
  SEWER,
  CLONEX,
  MOONBIRD,
  MEEBITS,
  OTHR,
  PUNK,
];
// ["0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6","0x7649e0d153752c556b8b23DB1f1D3d42993E83a5","0x0B7401Db44b917313D81Ab74360d0332b28Bf189","0x6435A0f3915375565b68D8045db2260eb9357D29","0x57FEbd640424C85b72b4361fE557a781C8d2a509","0x52Eb4B667a821913C0f7441eC1C0F431D2ec48DF","0xf85041979D4Be9ef32ab3390Dc5F85C8398ad42A","0x53519a16BF91B5bcd35Ee8d440B20e02965fE42F","0xE5FE08f871755015561401750E077e121084Ed1B","0x4B6b5bEeE5d62f1352a6089aeB8a457cB7400Af9","0xbf111371fA7bdC0dB53eC86024220491ff1Bb95f","0x328507DC29C95c170B56a1b3A758eB7a9E73455c","0xd695605c68A9Bc8dC68199bb368BfC8a748AB8bB","0x4562D3AfA9aB1CD757E99A1D1814ba34D88FFeB4","0x15DC733d48E4443935Ad8e23D0ef6Fa79A346C26","0x597C2EC69e316EDf1d8C2Aea9ef5b2310911A80b","0x0c36B61406a26f61f159911a1fe03F76B402A576"]
// ["0x317e19Fe3DB508f1A45421379FBbd7564d0259c0","0x72f6Ac2032CccF8e568f550a311C7d6C3FD7Cb7c","0xF40299b626ef6E197F5d9DE9315076CAB788B6Ef","0x3f228cBceC3aD130c45D21664f2C7f5b23130d23","0xd60d682764Ee04e54707Bee7B564DC65b31884D0","0xD9f2065804D70f4DC65fD164457A81097C7737Ee","0xf140558cA4d4e10f63661504D4F3f74FADDDe3E8","0x3aA026CD539fa1f6AE58ae238a10e2F1cf831454","0x46eB052832c24b8559e6F14ac49Fa198A4b0ddd6","0xeeA0f31778d0590a3Fc36aA1253C0d0d460C2e3B","0xc5F8e13959cec7e9D634DFfc13e1d9E5c07ab957","0x236ab41Fa59f82E3034F75aFf3161fC03f089D9A","0x9770B130B06Ec1D372984b598ddb30C9bdBC26F1"]
