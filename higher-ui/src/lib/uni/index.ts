import { Token } from "@uniswap/sdk-core";
import {
  WETH_TOKEN,
  POOL_FACTORY_CONTRACT_ADDRESS,
  HIGHER_TOKEN,
} from "../constants";
import { FeeAmount, computePoolAddress } from "@uniswap/v3-sdk";

interface ExampleConfig {
  rpc: {
    local: string;
  };
  tokens: {
    in: Token;
    amountIn: number;
    out: Token;
    poolFee: number;
  };
}

export const CurrentConfig: ExampleConfig = {
  rpc: {
    local: "http://localhost:8545",
  },
  tokens: {
    in: WETH_TOKEN,
    amountIn: 10000,
    out: HIGHER_TOKEN,
    poolFee: FeeAmount.HIGH,
  },
};

export const getPoolAddress = () => {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: CurrentConfig.tokens.in,
    tokenB: CurrentConfig.tokens.out,
    fee: CurrentConfig.tokens.poolFee,
  });

  return currentPoolAddress;
};
