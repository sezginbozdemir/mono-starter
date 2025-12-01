# Full‑Stack Monorepo Boilerplate

## Overview

This project is a full‑stack monorepo designed to streamline development across the backend, frontend, and shared packages. It provides a modern and scalable foundation using a combination of powerful tools and libraries.

## Project Structure

This repository is organized as a monorepo using Turborepo, containing apps and shared packages:

### apps/

- **client** — Next.js frontend using shadcn/ui and TypeScript
- **server** — Express backend powered by Drizzle ORM and Supabase

### packages/

- **database** — Drizzle schema and database utilities
- **env** — Centralized environment validation
- **mailer** — Email utilities (template + sender logic)
- **shared** — Shared utilities and logic between apps
- **typescript-config** — tsconfig base configuration
- **ui** — Reusable UI components

## Tech Stack

- **Next.js** + **shadcn/ui** for the frontend
- **Express** for the backend API
- **Drizzle ORM** for schema and migrations
- **Supabase** as the Postgres backend and potential auth provider
- **TypeScript** everywhere
- **Turborepo** for monorepo management

## Purpose

This boilerplate is meant to serve as a clean starting point for full‑stack projects with shared code, modular architecture, and modern tooling.

## Status

This README is a work in progress.  
It will be updated as the project evolves.
