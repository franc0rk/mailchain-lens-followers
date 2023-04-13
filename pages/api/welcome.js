// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Mailchain } from "@mailchain/sdk";

export default function handler(req, res) {
  const { method } = req;
  const { address } = req.body;

  if (method === "POST") {
    sendWelcomeEmail(address);
  }
}

async function sendWelcomeEmail(address) {
  const secretRecoveryPhrase = process.env.SECRET_RECOVERY_PHRASE;
  const mailchain = Mailchain.fromSecretRecoveryPhrase(secretRecoveryPhrase);
  const { address: senderAddress } = await mailchain.user();
  const { data, error } = await mailchain.sendMail({
    from: senderAddress,
    to: [`${address}@ethereum.mailchain.com`],
    subject: "Welcome to my profile",
    content: {
      text: "Thanks for following my profile",
      html: `
        <h1>Web3SocialMedia</h1>
        <div>
          <p>Thanks for following my profile, you can now access to exclusive content. This includes:</p>
          <ul>
            <li>Advanced web3 courses and tutorials</li>
            <li>One to one mentoring once a week</li>
            <li>Collaboration opportunities</li>
          </ul>
          <p>I will also keep you updated about new stuff via mailchain.</p>
          <p>See you soon!</p>
        </div>
      `,
    },
  });

  console.log(data, error);
}
