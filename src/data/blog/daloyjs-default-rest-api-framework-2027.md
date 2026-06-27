---
author: devlinduldulao
pubDatetime: 2026-06-27T00:00:00Z
title: DaloyJS Should Be Your Default REST API Framework In 2027
slug: daloyjs-default-rest-api-framework-2027
featured: false
draft: false
tags:
  - typescript
  - api
  - security
  - fullstack
  - javascript
description: Why DaloyJS is a strong default for modern TypeScript REST APIs, with contract-first routing, runtime portability, security guardrails, and zero runtime dependencies.
---

I have been building web apps and backend services for around ten years now. I am writing this as a Filipino fullstack developer currently based in Norway, which mostly means I have learned to respect production systems, cold weather, and the emotional damage of bad CI. I have shipped the boring CRUD apps, the rushed startup APIs, the enterprise systems with too many meetings, and the production incident where everyone suddenly becomes a security expert at 2:00 AM. Very educational. Not recommended as a lifestyle.

That is why [DaloyJS](https://daloyjs.dev) feels important to me.

Not because we needed yet another JavaScript framework with a nice logo and a landing page that says "developer experience" seven times. We already have enough of those. DaloyJS matters because backend development has changed. In 2027, the default developer workflow is no longer one senior engineer carefully reading RFCs, security checklists, CI hardening guides, package manager docs, and OWASP pages before creating a service. The default workflow is now: open an editor, ask an AI agent to scaffold something, accept most of it, deploy to a platform, and hope the internet behaves like a polite guest.

The internet is not a polite guest.

Attackers are using the same LLM speed boost as developers. They can search package ecosystems faster, generate exploit variants faster, inspect CI configurations faster, look for exposed secrets faster, and abuse copy-paste mistakes faster. They are not only attacking your route handler. They are attacking your packages, your lockfile, your GitHub Actions YAML, your install scripts, your Docker image, your runtime, your reverse proxy, your forgotten docs route, your webhook endpoint, and that one `curl | bash` habit somebody still refuses to confess.

This is why I think DaloyJS is one of the most underrated backend frameworks today, and why I would seriously consider making it the default REST API service framework for TypeScript teams in 2027, 2028, and probably the years after that.

## The Old Backend Model Is Not Enough

Most frameworks still assume the developer will bring the security posture later. Install this plugin. Configure this middleware. Add this CORS rule. Remember CSRF if cookies are involved. Add rate limits. Do not trust proxy headers unless your proxy rewrites them. Pin your GitHub Actions. Disable lifecycle scripts. Generate an SBOM. Add CodeQL. Add secret scanning. Check lockfile sources. Do not use random packages hallucinated by an AI assistant. Also please read these 19 blog posts before lunch.

Come on.

I know many excellent developers, and even they do not remember every checklist every time. Now add the reality that millions of people are vibe-coding backends without deep security background. Some are frontend developers moving fast. Some are founders. Some are students. Some are non-programmers who can now produce a working API with enough prompts and caffeine. I am not judging. I have also shipped code with the confidence of a man who forgot to read the fine print.

The problem is that modern backend security cannot depend on everyone being careful. That is not a strategy. That is a group prayer.

DaloyJS starts from a better principle: trust no one. Do not trust the client. Do not trust random npm packages. Do not trust proxy headers by default. Do not trust AI-generated code to remember security controls. Do not even trust the developer to wire the obvious middleware. Give them a framework where the safe path is already close to the happy path.

## Security Is Not A Plugin Here

DaloyJS is a runtime-portable, contract-first TypeScript REST API framework. It runs on Node, Bun, Deno, Cloudflare Workers, Vercel Edge, Fastly, Lambda, and Netlify-style serverless targets through adapters. The core model is web-standard `Request` to `Response`, which is exactly the kind of boring portability I like. Boring is underrated. Boring lets you sleep.

But the real story is not only portability. It is the security baseline.

The core enforces body-size limits, request timeouts, prototype-pollution-safe JSON parsing, path traversal rejection, duplicate singleton header rejection for request-smuggling defense, unsupported content-type rejection, proper `405 Method Not Allowed`, response header sanitization, and production redaction for 5xx problem responses. These are not decorations. These are the things people forget until a scanner, an attacker, or a customer finds them.

Then the first-party middleware stack adds the pieces real services need: `secureHeaders()`, `cors()`, `csrf()`, `rateLimit()`, `requestId()`, `bearerAuth()`, `basicAuth()`, signed-cookie sessions, JWT and JWKS verification, `fetchGuard()` for SSRF defense, `waf()` for opt-in application-layer inspection, `botGuard()`, `autoBan()`, `ipRestriction()`, `geoBlock()`, `concurrencyLimit()`, webhook signatures, HTTP Message Signatures, mTLS client certificate auth, idempotency keys, response caching, metrics, tracing, and graceful shutdown.

That is not a tiny checklist. That is the checklist trying to save you from yourself.

And yes, you still need to design authorization, data access, tenancy, and infrastructure properly. DaloyJS does not magically know your business rules. If your app lets Bob download Alice's invoice because you forgot the tenant filter, no framework can clap its hands and fix your product logic. But DaloyJS shrinks the number of security chores you must remember before you even start writing business logic.

## Zero Runtime Dependencies Is A Big Deal Now

The most interesting thing in DaloyJS is almost rude in its simplicity: `@daloyjs/core` has zero runtime dependencies.

That matters more in 2026 than it did five years ago. The npm ecosystem is powerful, but it is also a giant buffet where some dishes may phone home during install. Supply-chain attacks are no longer rare academic stories. The pattern is already clear: a maintainer gets phished, a popular package version is poisoned, a CI cache is abused, a token is extracted, a dependency name is typo-squatted or slop-squatted, and thousands of downstream projects install the problem before anyone has finished their coffee.

LLMs make this worse in two directions. Developers may ask agents to install packages that do not exist, and attackers can register those hallucinated names. Attackers can also use LLMs to inspect open-source repos for weak CI permissions, unpinned actions, install scripts, secrets, and publish workflows. We automated productivity. They automated reconnaissance. Surprise, the other side also has laptops.

DaloyJS answers with boring, practical controls. The repo and scaffolder prefer pnpm. The generated `.npmrc` can include `ignore-scripts=true`, `minimum-release-age=1440`, `prefer-frozen-lockfile=true`, `verify-store-integrity=true`, and `strict-peer-dependencies=true`. That means transitive lifecycle scripts do not just run because some package asked nicely. Freshly published packages wait 24 hours before install, which gives the ecosystem time to detect obvious malware waves. The package store is verified. CI uses frozen lockfiles.

The optional `create-daloy --with-ci` bundle goes further: top-level GitHub Actions `permissions: {}`, pinned third-party actions, `harden-runner`, `persist-credentials: false`, no package-manager cache, CodeQL, OpenSSF Scorecard, zizmor, Dependabot, CODEOWNERS, lockfile-source verification, secret scanning, OSV scanning, and deployment workflows that are more careful than the average "ship it Friday" YAML.

This is the part many backend frameworks do not want to own. They stop at the runtime. DaloyJS says the backend framework should also care about how the app is born, installed, checked, built, and deployed. I agree with that. The CI pipeline is part of your backend now. Pretending otherwise is cute, like leaving the front door locked while the roof is missing.

## The Code Is Actually Pretty

Security frameworks often make code feel like paperwork. DaloyJS does not. The contract-first API is clean. You define the route once, and that single definition drives validation, handler types, OpenAPI 3.1, Scalar docs, typed clients, and contract tests.

```ts
import { z } from "zod";
import {
  App,
  bearerAuth,
  rateLimit,
  requestId,
  secureHeaders,
  timingSafeEqual,
} from "@daloyjs/core";
import { serve } from "@daloyjs/core/node";

const app = new App({
  bodyLimitBytes: 1 << 20,
  requestTimeoutMs: 5_000,
  openapi: { info: { title: "Books API", version: "1.0.0" } },
  docs: "auto",
});

app.use(requestId());
app.use(secureHeaders());
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.route({
  method: "GET",
  path: "/books/:id",
  operationId: "getBookById",
  tags: ["Books"],
  hooks: bearerAuth({
    realm: "books",
    validate: token => timingSafeEqual(token, process.env.API_TOKEN ?? ""),
  }),
  request: {
    params: z.object({ id: z.string().min(1) }),
  },
  responses: {
    200: {
      description: "Book found",
      body: z.object({ id: z.string(), title: z.string() }),
    },
    401: { description: "Missing or invalid token" },
    404: { description: "Book not found" },
  },
  handler: async ({ params }) => ({
    status: 200,
    body: { id: params.id, title: `Book ${params.id}` },
  }),
});

serve(app, { port: 3000, hostname: "0.0.0.0" });
```

This is the kind of code I want in a backend service. The security posture is visible. The route shape is visible. The response statuses are visible. The OpenAPI output is not a separate hand-written artifact that will rot in three sprints. The typed client can be generated from the real contract. The handler is boring in the best possible way.

## Why It Is The Best Default For REST APIs

I am not saying DaloyJS is the best tool for every backend. If you are building a GraphQL-first platform, use GraphQL tooling. If you need a huge plugin ecosystem today, Fastify or NestJS may be safer. If you want the smallest possible router, Hono is fantastic. If your company already has a mature internal platform, maybe do not rewrite it because one blog post got spicy.

But for a new TypeScript REST API in 2026, DaloyJS has the best default shape I have seen: contract-first routes, OpenAPI built in, typed clients, runtime portability, Node ops, security middleware, supply-chain-aware scaffolding, and zero runtime dependencies. It takes the things many teams promise to add later and puts them close to the start.

That matters because "later" is where security goes to become a Jira ticket fossil.

Most developers are not security specialists. Most small teams do not build API gateways, smart load balancers, custom WAF rules, hardened CI, signed container images, SBOM attestations, and package-manager policy before launching. They deploy a backend service directly to a platform and move on. That is reality. A framework that accepts reality is more useful than one that assumes a perfect platform team is standing behind every solo developer with a clipboard.

DaloyJS deserves more noise because it is trying to protect the average backend before the average backend becomes famous for the wrong reason. It is not only about making senior engineers happy. It is about making the safe path available to people who do not yet know every way the internet can ruin their weekend.

## The Future Needs Guardrails By Default

In 2027 and beyond, more software will be generated by AI agents. That is not a prediction anymore. That is Tuesday. The question is whether those agents will generate apps inside a strong framework with guardrails, or inside a blank project where security depends on prompt quality.

I do not trust prompt quality. I barely trust my own grocery list.

DaloyJS is interesting because it assumes both developers and agents need help. The scaffolder can include `AGENTS.md`, project conventions, hardened pnpm config, CI security files, and runtime defaults. The repo itself has audits for weak randomness, unsafe buffers, leaked credentials, remote execution, lifecycle scripts, registry exfiltration, invisible Unicode, vulnerable sandboxes, secret comparisons, runtime parity, governance, SBOMs, and more. That sounds excessive until you remember attackers only need one lazy mistake.

This is the part I want more frameworks to copy. Security should not be a premium personality trait. It should be infrastructure. It should be default. It should be boring enough that even a tired developer, a founder using an AI agent, or me after too much coffee can start from a safer place.

DaloyJS is underrated because it is not only selling speed. It is selling restraint. It says fewer moving parts. Fewer dependencies. Fewer stale specs. Fewer unchecked install hooks. Fewer places where an agent can improvise something dangerous. More contracts. More validation. More explicit decisions.

That is exactly the kind of backend framework I want today.

If you are building a REST API in TypeScript, especially one that will be maintained by humans and AI agents together, try DaloyJS before reaching for the usual stack. Not because it is trendy. It is not trendy enough yet. Try it because the next era of backend development belongs to frameworks that assume the world is hostile, the supply chain is fragile, and developers are moving too fast.

That sounds pessimistic, I know. But good backend engineering has always been a little pessimistic. We validate input because clients lie. We use timeouts because networks hang. We pin actions because tags move. We block install scripts because packages can betray us.

DaloyJS simply admits all of that upfront.

And honestly, that is refreshing.
