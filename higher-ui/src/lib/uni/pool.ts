import { client } from "../viem";
import { SwapRouter } from "@uniswap/v3-sdk";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";

export const readPoolData = async ({
  poolAddress,
}: {
  poolAddress: `0x${string}`;
}) => {
  const [token0, token1, fee, liquidity, slot0] = await Promise.all([
    getToken0(poolAddress),
    getToken1(poolAddress),
    getFee(poolAddress),
    getLiquidity(poolAddress),
    getSlot0(poolAddress),
  ]);

  return {
    token0,
    token1,
    fee,
    liquidity,
    slot0,
  };
};

const getToken0 = async (poolAddress: `0x${string}`) => {
  const token0 = await client.readContract({
    address: poolAddress,
    abi: IUniswapV3PoolABI.abi,
    functionName: "token0",
  });
  return token0;
};

const getToken1 = async (poolAddress: `0x${string}`) => {
  const token1 = await client.readContract({
    address: poolAddress,
    abi: IUniswapV3PoolABI.abi,
    functionName: "token1",
  });
  return token1;
};

const getFee = async (poolAddress: `0x${string}`) => {
  const fee = await client.readContract({
    address: poolAddress,
    abi: IUniswapV3PoolABI.abi,
    functionName: "fee",
  });
  return fee;
};

const getLiquidity = async (poolAddress: `0x${string}`) => {
  const liquidity = await client.readContract({
    address: poolAddress,
    abi: IUniswapV3PoolABI.abi,
    functionName: "liquidity",
  });
  return liquidity;
};

const getSlot0 = async (poolAddress: `0x${string}`) => {
  const slot0 = await client.readContract({
    address: poolAddress,
    abi: IUniswapV3PoolABI.abi,
    functionName: "slot0",
  });
  return slot0;
};

const getPool = async (poolAddress: { poolAddress: `0x${string}` }) => {
  const { token0, token1, fee, liquidity, slot0 } = await readPoolData({
    poolAddress: "0xCC28456d4Ff980CeE3457Ca809a257E52Cd9CDb0",
  });

  // @ts-ignore
  const sqrtPriceX96 = slot0[0];
  // @ts-ignore
  const tick = slot0[1];

  //   const pool = new Pool(
  //     CurrentConfig.tokens.in,
  //     CurrentConfig.tokens.out,
  //     CurrentConfig.tokens.poolFee,
  //     poolInfo.sqrtPriceX96.toString(),
  //     poolInfo.liquidity.toString(),
  //     poolInfo.tick
  //   )
};
