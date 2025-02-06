<h1 align="center">🤖 Chatbot</h1>
<p align="center">
    <img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-gray?logo=typescript">
    <img alt="Static Badge" src="https://img.shields.io/badge/Next.js-v15.0.1-blue?logo=next.js">
    <img alt="Static Badge" src="https://img.shields.io/badge/TailwindCSS-v3.4.3-blue?logo=tailwindcss">
    <img alt="Static Badge" src="https://img.shields.io/badge/Vercel-gray?logo=vercel">
    <img alt="Static Badge" src="https://img.shields.io/badge/NextAuth-gray?logo=auth0">
</p>

<br>
<img src="./public/chatbot_index.png"/>
<br>

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [ZenStack](https://zenstack.dev)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.


---

## 定义DB Schema

1. 修改`schema.zmodel`
2. 运行 `npx zenstack generate` 生成代码
3. 运行 `npx prisma db push` 推送到DB
4. 运行 `npx prisma db pull` 从DB拉取Schema



## 代码中怎么访问DB

### 使用生成的钩子
位置：`src/lib/hooks/`

### [使用tRPC的api](https://zenstack.dev/docs/guides/trpc)
1. 在`schema.zmodel`中使用插件
```
plugin trpc {
    provider = '@zenstackhq/trpc'
    output = 'src/server/routers/generated'
}
```
