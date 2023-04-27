# Send personalized emails to your Lens followers using Mailchain SDK

Send emails to your Lens followers using mailchain following the next steps:

## Clone the repo or create new next app

```bash
npx create-next-app mailchain-lens-followers-tutorial
```

## Install Dependencies

```bash
npm install ethers @lens-protocol/client @mailchain/sdk
# or
yarn add ethers @lens-protocol/client @mailchain/sdk
```

## Create sender and receiver accounts in mailchain

https://app.mailchain.com/register

## Set `SECRET_RECOVERY_PHRASE` value on `.env`

```bash
SECRET_RECOVERY_PHRASE='word word word ...'
```

## Modified files

- `pages/index.ts`: The user interface for following one Lens profile.
- `pages/api/welcome.ts`: The api endpoint for sending the Mailchain email.
- `services/lens.ts`: The lens client SDK functions for following a profile.

## Run dev server

```bash
npm run dev
# or
yarn dev
```
