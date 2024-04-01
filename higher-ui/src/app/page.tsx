"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import { HigherLotteryABI } from "@/abi/HigherLotteryABI";
import Token from "@/app/components/Token";
import DemoToken from "./components/DemoToken";

const HIGHER_TOKEN_ADDRESS = "0x67d269191c92Caf3cD7723F116c85e6E9bf55933";

export default function Home() {
  const { data: hash, writeContract } = useWriteContract();
  const [degree, setDegree] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDegree((prevDegree) => (prevDegree + 1) % 90);
    }, 30);

    return () => clearInterval(interval);
  }, [degree]);

  const mintToken = () => {
    writeContract(
      {
        address: HIGHER_TOKEN_ADDRESS as `0x${string}`,
        abi: HigherLotteryABI,
        functionName: "mint",
        args: [],
        value: BigInt(0.000777 * 10 ** 18),
      }
      //   { onSuccess: () => refetch() }
    );
  };

  const { data } = useReadContract({
    abi: HigherLotteryABI,
    address: HIGHER_TOKEN_ADDRESS as `0x${string}`,
    functionName: "totalSupply",
    args: [],
  });

  return (
    <main className="">
      <section className="grid grid-cols-4 gap-4 mt-4">
        <DemoToken degree={90} className="h-full w-full" />
        <DemoToken degree={60} className="h-full w-full" />
        <DemoToken degree={30} className="h-full w-full" />
        <DemoToken degree={0} className="h-full w-full" />
      </section>
      <section className="flex flex-col items-center justify-center">
        {/* <div className="border-4 rounded-[10px] border-white inline-block mx-auto">
          <DemoToken degree={degree} />
        </div> */}
        <p className="mt-8 text-sm">
          Higher lottery is a higher NFT token designed to pay back the higher
          community. Every 1000 mints, the `draw` function unlocks, which
          selects a random holder and buys them higher with the funds gained
          from the previous 1000 mints. The more NFTs you hold, the better your
          odds.
        </p>
        <p className="text-sm mt-4">
          This particular NFT is fully on-chain and randomly calcualates a score
          between 0 and 90 which maps to a given color and angle that your
          higher arrow points. The score has no bearing on your entry in the
          lottery, although it's fun to collect ultra high NFTs.
        </p>
        <p className="text-sm mt-4">
          The hope for this collection is to inspire others to create higher
          based lottery mints. If you are interested in deploying a higher
          lottery NFT for your collection, get in touch.
        </p>
        <button
          className="mt-4 border rounded px-4 py-1 w-full hover:bg-gray-100 transition-colors"
          onClick={() => {
            mintToken();
          }}
        >
          Mint
        </button>
      </section>
      <section className="mt-12">
        <h2 className="font-semibold text-lg w-full border-b pb-1">
          My tokens
        </h2>
      </section>
      <section className="mt-12">
        <h2 className="font-semibold text-lg w-full border-b pb-1">
          Recent mints
        </h2>
      </section>
    </main>
  );
}
