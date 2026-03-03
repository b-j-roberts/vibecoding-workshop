import { RpcProvider } from "starknet";

export const provider = new RpcProvider({
  nodeUrl:
    process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.starknet.lava.build",
});
