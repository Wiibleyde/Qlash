# qlash-back

To install dependencies:

```bash
bun install
```

To set the environment variables, create a `.env` file in the root directory with the following content:

```
DATABASE_URL="postgresql://root:RootPassword@localhost:5432/qlashdatabase?schema=public"
JWT_SECRET="your_jwt_secret"
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


FAUT INIT LES PTN DE DONNE DONC TU FAIS UN 
```bash
bun prisma migrate deploy
```
Puis tu fais un `bun prisma generate` pour générer les types Prisma :
```bash
bun prisma generate
```
Puis tu fais un seed pour remplir la base de données avec les données initiales :
```bash
bun prisma db seed
```

ET COMME ÇA ÇA FONCTIONNE, PTN