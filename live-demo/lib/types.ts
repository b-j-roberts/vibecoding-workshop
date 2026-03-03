export interface Transfer {
  from: string;
  to: string;
  amount: bigint;
  blockNumber: number;
  transactionHash: string;
  timestamp: number;
}
