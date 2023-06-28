import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import  contracts  from "./contracts";

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

type contracts = {name: string, address: string}[];

export const ERC20Tokens = [
  "WETH",
  "aWETH",
  "stETH",
  "cbETH",
  "bendETH",
  "astETH",
  "DAI",
  "FRAX",
  "USDC",
  "USDT",
  "WBTC",
  "APE",
  "BLUR",
  "wstETH",
  "awstETH",
  "cETH",
  "rETH",
];
export const ERC721Tokens = [
  "DOODLE",
  "WPUNKS",
  "BAYC",
  "MAYC",
  "BAKC",
  "AZUKI",
  "PPG",
  "SEWER",
  "CLONEX",
  "MOONBIRD",
  "MEEBITS",
  "OTHR",
  "PUNK",
];

export const ERC20Decimals = [
  { name: "BLUR", decimals: 18 },
  { name: "WETH", decimals: 18 },
  { name: "DAI", decimals: 18 },
  { name: "USDC", decimals: 6 },
  { name: "USDT", decimals: 6 },
  { name: "APE", decimals: 18 },
  { name: "WBTC", decimals: 8 },
  { name: "stETH", decimals: 18 },
  { name: "wstETH", decimals: 18 },
  { name: "aWETH", decimals: 18 },
  { name: "cETH", decimals: 18 },
  { name: "cAPE", decimals: 18 },
  { name: "astETH", decimals: 18 },
  { name: "awstETH", decimals: 18 },
  { name: "cbETH", decimals: 18 },
  { name: "rETH", decimals: 18 },
  { name: "bendETH", decimals: 18 },
];

export function getDecimals(tokenName: string): number {
  let decimals = 0;
  for (let i = 0; i < ERC20Decimals.length; i++) {
    if (tokenName == ERC20Decimals[i].name) {
      decimals = ERC20Decimals[i].decimals;
      break;
    }
  }
  return decimals;
}

export function getName(address: string): string {
  let name = "";
  for (let i = 0; i < contracts.length; i++) {
    if (address == contracts[i].address) {
      name = contracts[i].name;
      break;
    }
  }
  return name;
}

export function getAddress(name: string): string {
  let address = "";
  for (let i = 0; i < contracts.length; i++) {
    if (name == contracts[i].name) {
      address = contracts[i].address;
      break;
    }
  }
  return address;
}

// ["0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6","0x7649e0d153752c556b8b23DB1f1D3d42993E83a5","0x0B7401Db44b917313D81Ab74360d0332b28Bf189","0x6435A0f3915375565b68D8045db2260eb9357D29","0x57FEbd640424C85b72b4361fE557a781C8d2a509","0x52Eb4B667a821913C0f7441eC1C0F431D2ec48DF","0xf85041979D4Be9ef32ab3390Dc5F85C8398ad42A","0x53519a16BF91B5bcd35Ee8d440B20e02965fE42F","0xE5FE08f871755015561401750E077e121084Ed1B","0x4B6b5bEeE5d62f1352a6089aeB8a457cB7400Af9","0xbf111371fA7bdC0dB53eC86024220491ff1Bb95f","0x328507DC29C95c170B56a1b3A758eB7a9E73455c","0xd695605c68A9Bc8dC68199bb368BfC8a748AB8bB","0x4562D3AfA9aB1CD757E99A1D1814ba34D88FFeB4","0x15DC733d48E4443935Ad8e23D0ef6Fa79A346C26","0x597C2EC69e316EDf1d8C2Aea9ef5b2310911A80b","0x0c36B61406a26f61f159911a1fe03F76B402A576"]
// ["0x317e19Fe3DB508f1A45421379FBbd7564d0259c0","0x72f6Ac2032CccF8e568f550a311C7d6C3FD7Cb7c","0xF40299b626ef6E197F5d9DE9315076CAB788B6Ef","0x3f228cBceC3aD130c45D21664f2C7f5b23130d23","0xd60d682764Ee04e54707Bee7B564DC65b31884D0","0xD9f2065804D70f4DC65fD164457A81097C7737Ee","0xf140558cA4d4e10f63661504D4F3f74FADDDe3E8","0x3aA026CD539fa1f6AE58ae238a10e2F1cf831454","0x46eB052832c24b8559e6F14ac49Fa198A4b0ddd6","0xeeA0f31778d0590a3Fc36aA1253C0d0d460C2e3B","0xc5F8e13959cec7e9D634DFfc13e1d9E5c07ab957","0x236ab41Fa59f82E3034F75aFf3161fC03f089D9A","0x9770B130B06Ec1D372984b598ddb30C9bdBC26F1"]
