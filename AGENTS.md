# Agentify Panel

## Scope

This is the **functional** app: auth pages (login, register, password reset,
email verification) and the dashboard where users build, configure and ship
their agents. The marketing site lives in the Next.js app one level up
(`../`). That app is the show; this one is the product. Don't mix their concerns.

The panel sits behind auth, so it is not an SEO surface. Priorities are
correctness, speed, accessibility and a UI that's clear and stays out of the way.

## Stack

- **Vite + React 19 SPA**, TypeScript, React Compiler enabled (via
  `@rolldown/plugin-babel`). Don't hand-write `useMemo`/`useCallback`
  for performance; the compiler does it.
- **Tailwind CSS v4**, configured in CSS only (`src/index.css`). There is no
  `tailwind.config`.
- **shadcn/ui, `base-lyra` style, built on Base UI** (`@base-ui/react`), not Radix:
  - Compose with the `render` prop, not `asChild`:
    `<DropdownMenuTrigger render={<Button variant="outline" />}>`.
  - Add components with `npx shadcn@latest add <name>`. Don't hand-write them.
  - Files in `src/components/ui/` are generated. Edit them only when needed and
    keep them close to upstream so future `add`s don't conflict.
- **Icons:** `@remixicon/react` only.
- **Font:** Oxanium (`@fontsource-variable/oxanium`), the only typeface.
- **`cn`** comes from the `cn` package (a clsx + tailwind-merge replacement), re-exported from `@/lib/utils`.

Before using an API you're unsure of, read the installed package's types or
docs in `node_modules`. Versions here are newer than most training data.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build; must pass before you're done
npm run lint      # ESLint; must be clean
npm run format    # Prettier (with tailwind class sorting)
```

## Code guidelines

- **Code Splitting** Don't go stuffing all kind of code in a single file even it it belongs to the same module. Types, constants, declarations, UI, service logic all should be in separate files and organized in folders. Example, if you're creating a new widget for agents, then create a new folder for it and put all the files in it. Don't put all the files in the components folder.
- **Think first.** Understand the problem, trace the code it touches, break it
  into small pieces, then write code. Ask when something is ambiguous instead
  of guessing. Jumping straight to code is how scope creep and endless
  iterations happen.
- **One file, one purpose.** No file over 100 lines (generated `components/ui/`
  files excepted). Split into components and hooks when a file grows.
- **No prop drilling.** Share state through context (see `components/theme/`
  for the pattern: context file + provider + `useX` hook in separate files).
- **Fast-refresh rule:** a `.tsx` file exports components only. Put contexts,
  hooks, constants and types in `.ts` files.
- **Imports:** use the `@/` alias (`@/components/...`, `@/lib/...`) and avoid deep relative paths.
- **Comments:** short, and only to explain _why_. No essays.
- **Dependencies:** don't add a library because you can. Propose it with the
  reason and impact, and wait for approval. Prefer the platform, React, Base UI
  and what's already installed.
- **Project Architecture:** folder structure is simple pages go in pages, types in types, interfaces, enums, utils, constants, hooks, lib, and components. everything is self contained and modular.
- Keep it simple. Readability beats cleverness.

## Styling

- **Theme:** plain shadcn tokens, monochrome. Light is black on white
  (`#ffffff` / `#000000`), dark is white on black, with neutral greys between
  them. The only colour is `destructive` (red), so errors stay recognisable.
  Tokens live in `:root` / `.dark` in `src/index.css`.
- **Use semantic utilities** (`bg-background`, `text-muted-foreground`,
  `border-border`, `bg-primary`…). Never hard-code colours in components.
- **Square corners:** `--radius: 0`. Don't add rounding; `rounded-full` is for
  dots and avatars only.
- **Theme switching:** `ThemeProvider` (in `main.tsx`) puts `.dark` on `<html>`.
  Read or set the theme with `useTheme()` and drop in `<ThemeToggle />`.
  The storage key is shared with the no-flash script in `index.html`; keep
  them in sync.
- **Tailwind v4 class names only.** ESLint (`eslint-plugin-better-tailwindcss`)
  auto-fixes deprecated and non-canonical classes (`flex-shrink-0` →
  `shrink-0`, `h-4 w-4` → `size-4`, `bg-gradient-to-*` → `bg-linear-to-*`) on
  save and through the Claude Code hook. Write the canonical form in the first place.
- **Responsive and accessible by default:** test at phone width, keep keyboard
  focus visible, and give icon-only buttons an `aria-label`.

## Done means

`npm run lint` is clean, `npm run build` passes, and the change has been
checked in the running app, not just compiled.
