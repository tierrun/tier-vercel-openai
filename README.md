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
- Database on **Vercel Postgres** / **Planetscale** / **Supabase**

## Why Tier?
Tier decouples billing, metering, and access checks from your application code. With it, you can conveniently establish new pricing models without needing to restructure your app or concern yourself with grandfathering or breaking changes.

## Running locally

1. Install dependencies

```bash
npm i
```

2. Copy `.env.example` to `.env.local` and update the variables.

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

## Powered by

This example is powered by the following services:

- [Tier](https://tier.run) (Subscriptions and Pricing)
- [OpenAI](https://openai.com/) (AI API)
- [Vercel](https://vercel.com/) (Hosting NextJS)
- [Auth.js](https://authjs.dev/) (Auth)
- [Vercel Postgres](https://vercel.com/storage/postgres) / [Supabase](https://supabase.com/) / [Planetscale](https://planetscale.com/) (Database)
- [Stripe](https://stripe.com/) (Payments)

## License

License under the [MIT license](/LICENSE.md).
