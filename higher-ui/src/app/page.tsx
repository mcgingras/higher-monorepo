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
    <main className="bg-[#3C8827]">
      <section className="flex flex-col items-center justify-center">
        <div className="border-4 rounded-[10px] border-white inline-block mx-auto">
          <DemoToken degree={degree} />
        </div>
        <button
          className="mt-6 border-2 border-white rounded px-4 py-1"
          onClick={() => {
            mintToken();
          }}
        >
          Mint
        </button>
      </section>
    </main>
  );
}
