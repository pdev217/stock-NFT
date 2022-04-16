import { LazyMinter } from "./lazyMinter";

export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
};

export const switchNetwork = async (network, library) => {
    await library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(network) }],
    });
};

export { LazyMinter }