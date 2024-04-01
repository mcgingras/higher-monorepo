"use client";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { HigherLotteryABI } from "@/abi/HigherLotteryABI";
const HIGHER_TOKEN_ADDRESS = "0x67d269191c92Caf3cD7723F116c85e6E9bf55933";

const Token = ({ tokenId }: { tokenId: number }) => {
  const [uri, setUri] = useState<{ image: string } | undefined>(undefined);
  const { data } = useReadContract({
    abi: HigherLotteryABI,
    address: HIGHER_TOKEN_ADDRESS as `0x${string}`,
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
  });

  useEffect(() => {
    if (data) {
      const encodedURI = data?.split(",")[1] as string;
      const decodedURI = atob(encodedURI);
      const uri = JSON.parse(decodedURI);
      setUri(uri);
    }
  }, [data]);

  console.log(uri);

  ///
  ///
  ///
  return (
    <div>
      <h1>Token</h1>
      {uri && <img src={uri?.image} />}
    </div>
  );
};

export default Token;
