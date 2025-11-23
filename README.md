# SkillChain

SkillChain is a web app built with *Next.js* and *TypeScript, generated via [v0](https://v0.app/) and deployed on **Vercel*.  
This repository stays in sync with your v0 chat, so UI and logic changes made in the v0 editor can be pushed here and redeployed automatically.

> ⚠ This README is custom-written for this repo, but you should update the *Description, **Features, and **Roadmap* sections to match what SkillChain actually does in your use-case.

---

## Demo

- *Production URL*: https://vercel.com/akashcodex679-3406s-projects/v0-skill-chain-demo-walkthrough  
- https://skillchainbuilder.vercel.app/

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Environment Variables](#environment-variables)
- [QR Code Flows](#qr-code-flows)
- [Deployment](#deployment)
- [Scripts](#scripts)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

SkillChain is an experimental app managed through v0’s chat-based builder and synced to this GitHub repo. The goal of this project is to provide a clean, modern front-end that you can iterate on quickly using v0, while still having full control of the underlying Next.js codebase in Git.

You edit the app in *v0*, deploy from there, and v0 keeps this repository updated so Vercel can build and ship the latest version.

If you want this project to be more than a demo, *rewrite this section* to describe your real product (e.g. “SkillChain is a tool to model skill trees, track learning progress, and share skill roadmaps via QR codes.”).

---

## Features

Update this list to match reality as you add real functionality.

- ⚡ *Next.js App Router* structure under /app
- 🧩 *Componentized UI* in /components for reusable layout elements
- 🧠 *Hooks and utilities* in /hooks and /lib for client-side logic
- 📱 *Responsive layout* with modern CSS (and/or Tailwind, depending on your setup)
- 🔗 *Tight integration with v0* – changes in your v0 chat can sync back here
- 📦 *Ready for Vercel deployment* out of the box
- 📷 (Optional) *QR-based flows* – documented in QR_CODE_GUIDE.md

---

## Tech Stack

- *Framework:* Next.js (App Router)
- *Language:* TypeScript
- *UI:* React + CSS (and likely Tailwind / utility classes)
- *Tooling:*  
  - Vite/Next build tooling (via Next.js)  
  - PostCSS (configured via postcss.config.mjs)  
- *Package manager:* pnpm (lockfile committed)

If you’re using shadcn/ui, Tailwind, or any specific design system, list it explicitly here.

---

## Project Structure

High-level layout based on the current repository:

```txt
skillchain-app/
├─ app/               # Next.js app router routes, layouts, pages
├─ components/        # Reusable React components
├─ hooks/             # Custom React hooks
├─ lib/               # Helper utilities, config, and shared logic
├─ public/            # Static assets (images, favicon, etc.)
├─ styles/            # Global / shared styles
├─ auth.ts            # Auth-related configuration / helpers
├─ SETUP_GUIDE.md     # Additional setup instructions from v0
├─ DEPLOYMENT_GUIDE.md# Extra deployment instructions
├─ QR_CODE_GUIDE.md   # Documentation for QR-related flows
├─ next.config.mjs    # Next.js configuration
├─ package.json       # Dependencies and project scripts
├─ pnpm-lock.yaml     # pnpm lockfile
└─ tsconfig.json      # TypeScript configuration
