import { ethers } from "ethers";
import { LensClient, development } from "@lens-protocol/client";

// init the lens client
const lensClient = new LensClient({
  environment: development,
});

// connect wallet and authenticate on lensClient
async function authenticate() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const challenge = await lensClient.authentication.generateChallenge(
      address
    );

    const signature = await signer.signMessage(challenge);

    await lensClient.authentication.authenticate(address, signature);

    const isAuth = await lensClient.authentication.isAuthenticated();

    return { signer, isAuth };
  }
}

// create the follow typed data and sends the transaction
export async function createFollow() {
  const { signer } = await authenticate();
  const address = await signer.getAddress();

  const followTypedDataResult = await lensClient.profile.createFollowTypedData({
    follow: [
      {
        profile: "0x72b1", // our profileId
      },
    ],
  });

  const data = followTypedDataResult.unwrap();

  const signedTypedData = await signer._signTypedData(
    data.typedData.domain,
    data.typedData.types,
    data.typedData.value
  );

  const broadcastResult = await lensClient.transaction.broadcast({
    id: data.id,
    signature: signedTypedData,
  });

  return { address, broadcastResult };
}
