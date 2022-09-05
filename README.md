# Linktree clone using Next.js and Tailwind.css

This is a [Next.js](https://nextjs.org/) typescript project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
using Tailwind.css for styles. It was mainly intended to get some experience
with the Tailwind.css.

## Getting Started

The site sources its data from the [data/siteData.yaml](data/siteData.yaml)
file. Entries in the `pages` object there are converted into pages, with the
`pageLinks` key containing a list of links. In production use this data could
come from any api of course - just edit `lib/api.ts`.

After cloning, run the app like any other next.js app.

```bash
yarn install
yarn dev
```
