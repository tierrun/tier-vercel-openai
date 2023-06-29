# Metered billing for an AI content creator app

![Blip - Metered billing based AI content creator app](/src/app/opengraph-image.png)

Get started with usage based billing for your OpenAI based apps!

This project generates marketing content using OpenAI, implements metered pricing model, checks for feature access based on their current subscription, reports usage of a feature, manages subscription and more using Tier.

## Demo

- https://tier-vercel-openai.vercel.app/

## Features

- NextJS 13 `/app` dir
- AI content generation using **OpenAI**
- Pricing using **[Tier](<(https://tier.run)>)** and Stripe.
  - Pricing model using Tier Model Builder
  - Subscriptions and Checkout
  - Feature access and upsells
  - Reporting usage of a feature
  - Pricing table
  - Customer billing portal
- Authentication using Auth.js
- ORM using **Prisma**
- Database on **Vercel Postgres (Default)** / **Planetscale** / **Supabase**

## Why Tier?

Tier decouples billing, metering, and access checks from your application code. With it, you can conveniently establish new pricing models without needing to restructure your app or concern yourself with grandfathering or breaking changes.

## Running locally

1. Install dependencies

```bash
npm i
```

1. Copy `.env.example` to `.env.local` and update the variables.

```bash
cp .env.example .env.local
```

3. Run the project locally

```bash
npm run dev
```

## Tier Pricing Models

- Prod - https://model.tier.run/clhdwdn8v01zgkef5viv10kwr
- Staging - https://model.tier.run/clhdwboez01uqkef5s0qailg5
- Dev - https://model.tier.run/clhdvg0ab01i7kef5dy920jm6

You can clone the pricing model from the above links and make it your own.

## Environment variables

We have considerably reduced the number of environment variables in the project to make it easier for you to get started. This is an exhaustive list of all the environment variables in the project

1. App: `NEXT_PUBLIC_APP_URL` - The is the URL of your application, once you deploy this application in Vercel you will get this URL from your dashboard. In local dev mode, you can set this variable in `env.local / env.development` and give it this value `http://localhost:3000`.
2. Auth: `NEXTAUTH_URL` - Used by [Auth.JS](https://authjs.dev/) - When deploying to vercel you do not have to set this value, but when you develop you can set this as `http://localhost:3000`. Find more details [here](https://next-auth.js.org/configuration/options#nextauth_url).
3. Auth: `NEXTAUTH_SECRET` - Used by [Auth.JS](https://authjs.dev/) - Used to encrypt JWT and you can easily generate a secret using `openssl rand -base64 32`. Find more details [here](https://next-auth.js.org/configuration/options#nextauth_secret).
4. Github OAuth: `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` - Both Client ID and Client Secret of Github App can be generated at your [Github Developer Settings](https://github.com/settings/developers) page and you can read the step-by-step directions [here](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
5. Tier: `TIER_BASE_URL` & `TIER_API_KEY` - You can set your `TIER_BASE_URL` variable as `https://api.tier.run` default value in all your environments and `TIER_API_KEY` is your Stripe secret key. You can follow the steps in our [docs](https://www.tier.run/docs/quickstarts/create-pricing-model#5-sync-with-stripe) to sync your pricing model with your Stripe account.
6. OpenAI: `OPENAI_API_KEY` - Get your OpenAI API key from [OpenAI User Settings](https://platform.openai.com/account/api-keys)
7. Vercel Storage: `POSTGRES_PRISMA_URL` & `POSTGRES_URL_NON_POOLING` - You will only need these two variables after you have setup your database as we are using Prisma. You can find more details [here](https://vercel.com/docs/storage/vercel-postgres/quickstart).

## Powered by

This example is powered by the following services:

- [Tier](https://tier.run) (Subscriptions and Pricing)
- [OpenAI](https://openai.com/) (AI API)
- [Vercel](https://vercel.com/) (Hosting NextJS)
- [Auth.js](https://authjs.dev/) (Auth)
- [Vercel Postgres (default)](https://vercel.com/storage/postgres) / [Supabase](https://supabase.com/) / [Planetscale](https://planetscale.com/) (Database)
- [Stripe](https://stripe.com/) (Payments)

## License

License under the [MIT license](/LICENSE.md).
