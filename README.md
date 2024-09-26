# REQUIREMENTS

- [Bun](https://bun.sh/): package manager
- [Rust](https://www.rust-lang.org/tools/install): we use [Tauri](https://v2.tauri.app/) for our desktop app which is based on Rust

## How to use

1. Clone the repository
   `git clone git@github.com:kyodohq/core.git`

2. Install the dependency (from the root directly, don't go inside each apps)

```bash
pnpm install
```

3. Start the project

```bash
pnpm dev
```

After that last command you should have:

- a TUI showing both the front and back apps running, you can navigate to see the state of both applications.
- The desktop app of Kyodo.
