import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      // config: {
      //   documentMode: "string",
      // },
      plugins: [],
    },
  },
  hooks: { afterAllFileWrite: ["npx prettier --write"] },
};

export default config;
