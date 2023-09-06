import Evm from '@coolwallet/evm';
import { isChainIdSupported } from '@src/features/sdk/evm/EvmChainUtils';
import { EvmChainId, evmChainIdToSdk } from '@src/features/sdk/evm/EvmChain';

export function sdkFactory(chainId: number): Evm {
  const chainProps = evmChainIdToSdk[chainId];
  if (!isChainIdSupported(chainId) || !chainProps) throw new Error(`/evm/utils sdkFactory unrecognized chainId:${chainId}`);
  return new Evm(chainProps);
}

export function web3Factory(chainId: number, rpcUrl: string): Web3 {
  // 測試 Launchpad 測試網交易
  if (chainId === EvmChainId.ETHEREUM_GOERLI_TESTNET) return new Web3('https://rpc.ankr.com/eth_goerli');

  const jsonRpcEndpoint = `${rpcUrl}web3/${chainId}/submission`;

  return new Web3(
    new Web3.providers.HttpProvider(jsonRpcEndpoint, {
      headers: [
        { name: 'Content-Type', value: 'application/json' },
        { name: 'accept', value: 'application/json' },
        { name: 'cbx-client', value: 'coolwallet' },
      ],
    }),
  );
}

export function ethersProviderFactory(chainId: number): ethers.providers.JsonRpcProvider {
  // 測試 Launchpad 測試網交易
  if (chainId === EvmChainId.ETHEREUM_GOERLI_TESTNET)
    return new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli');

  const proxyBaseUrl = Config.getProxyApiUrl();
  const jsonRpcEndpoint = proxyBaseUrl + `web3/${chainId}/submission`;

  return new ethers.providers.JsonRpcProvider({
    url: jsonRpcEndpoint,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'cbx-client': 'coolwallet',
    },
  });
}

export function evenHexDigit(hex: string): string {
  return hex.length % 2 !== 0 ? `0${hex}` : hex;
}

export function removeHex0x(hex: string): string {
  return hex.slice(0, 2) === '0x' ? hex.slice(2) : hex;
}

export function addHex0x(hex: string): string {
  return hex.slice(0, 2) == '0x' ? hex : `0x${hex}`;
}

export function handleHex(hex: string): string {
  return evenHexDigit(removeHex0x(hex));
}

export function isHex(value?: string): boolean {
  if (!value) return false;
  return Web3.utils.isHex(value);
}
