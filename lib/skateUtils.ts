import { ethers } from 'ethers';

const SKATE_GATEWAY_ADDRESS = 'replace with ur gateway';

const SKATE_GATEWAY_ABI = [
  'function createIntent(address app, bytes calldata intentData) external payable returns (uint256)',
];

export async function createRedeemIntent(chainId: number, amount: number, userAddress: string) {
  if (!window.ethereum) {
    throw new Error('No Ethereum wallet detected');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const skateGateway = new ethers.Contract(SKATE_GATEWAY_ADDRESS, SKATE_GATEWAY_ABI, signer);

  const intentData = ethers.utils.defaultAbiCoder.encode(
    ['uint256', 'uint256', 'address'],
    [chainId, amount, userAddress]
  );

  const tx = await skateGateway.createIntent(SKATE_GATEWAY_ADDRESS, intentData);
  const receipt = await tx.wait();
  return receipt.transactionHash;
}
