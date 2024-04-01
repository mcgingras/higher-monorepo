import { SUPPORTED_CHAINS, Token } from "@uniswap/sdk-core";

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  "0x33128a8fC17869897dcE68Ed026d694621f6FDfD";
export const QUOTER_CONTRACT_ADDRESS =
  "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a";
export const SWAPPER_CONTRACT_ADDRESS =
  "0x2626664c2603336E57B271c5C0b26F421741e481";

export const HIGHER_BASE_POOL = "0xCC28456d4Ff980CeE3457Ca809a257E52Cd9CDb0";

// Currencies and Tokens

export const WETH_TOKEN = new Token(
  SUPPORTED_CHAINS[15],
  "0x4200000000000000000000000000000000000006",
  18,
  "WETH",
  "Wrapped Ether"
);

export const HIGHER_TOKEN = new Token(
  SUPPORTED_CHAINS[15],
  "0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe",
  18,
  "HIGHER",
  "higher"
);