import { Contract, hash } from "starknet";
import { provider } from "./starknet";
import { Transfer } from "./types";

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

const TRANSFER_SELECTOR = hash.getSelectorFromName("Transfer");

export async function getRecentTransfers(blockRange = 100): Promise<Transfer[]> {
  const block = await provider.getBlockNumber();
  const fromBlock = Math.max(0, block - blockRange);

  const response = await provider.getEvents({
    address: USDC_ADDRESS,
    keys: [[TRANSFER_SELECTOR]],
    from_block: { block_number: fromBlock },
    to_block: { block_number: block },
    chunk_size: 50,
  });

  return response.events.map((event) => {
    const from = event.keys[1];
    const to = event.keys[2];
    const low = BigInt(event.data[0]);
    const high = BigInt(event.data[1]);
    const amount = low + (high << BigInt(128));

    return {
      from,
      to,
      amount,
      blockNumber: event.block_number ?? 0,
      transactionHash: event.transaction_hash,
      timestamp: Date.now(),
    };
  }).sort((a, b) => b.blockNumber - a.blockNumber);
}

export function truncateAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
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
