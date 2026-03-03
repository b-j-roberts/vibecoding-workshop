import { Contract } from "starknet";
import { provider } from "./starknet";

export const USDC_ADDRESS =
  "0x033068F6539f8e6e6b131e6B2B814e6c34A5224bC66947c47DaB9dFeE93b35fb";

const USDC_DECIMALS = 6;

const abi = [
  {
    name: "total_supply",
    type: "function",
    inputs: [],
    outputs: [{ name: "totalSupply", type: "Uint256" }],
    state_mutability: "view",
  },
] as const;

const usdc = new Contract({ abi, address: USDC_ADDRESS, providerOrAccount: provider });

export async function getTotalSupply(): Promise<bigint> {
  const result = await usdc.call("total_supply");
  return (result as { totalSupply: bigint }).totalSupply;
}

export function formatUSDC(raw: bigint): string {
  const whole = raw / BigInt(10 ** USDC_DECIMALS);
  const fraction = raw % BigInt(10 ** USDC_DECIMALS);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const wholeFormatted = formatter.format(Number(whole));
  const fractionStr = fraction.toString().padStart(USDC_DECIMALS, "0").slice(0, 2);

  return `$${wholeFormatted.split(".")[0]}.${fractionStr}`;
}
