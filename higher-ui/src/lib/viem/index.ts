import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

export const client = createPublicClient({
  chain: base,
  transport: http(),
});

const executor = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

/**
 * Wallet client
 */
export const walletClient = createWalletClient({
  account: executor,
  chain: base,
  transport: http(),
});
