import { Contract } from 'web3-eth-contract';

export default abstract class Wallet {
    // public abstract checkIfWalletReady(): boolean;
    public abstract connect(): void;
    // public abstract disconnect(): void;
    // public abstract clean(): void;
    public abstract decodeKey(): string;
    public abstract encodeKey(): string;
    public abstract getContract(): Contract;
}
