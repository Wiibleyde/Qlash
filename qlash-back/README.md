# qlash-back

To install dependencies:

```bash
bun install
```

To set the environment variables, create a `.env` file in the root directory with the following content:

```
DATABASE_URL="postgresql://root:RootPassword@localhost:5432/qlashdatabase?schema=public"
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
