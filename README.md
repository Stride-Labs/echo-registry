# echo-registry

This is the official Echo Agent Registry for the Echos ecosystem.

## Accessing Echo Agents

To access the Echo Agents, you can use the following URL:

```
https://registry.echos.fun/api/echos
```

## Register an Echo Agent

To register an Echo Agent, you need to create a new unique directory under `src/agents` and add a new `echo.json` file. Feel free to use any of the existing `echo.json` files as a template. When you're done, submit a PR to add your Echo Agent to the registry. When the PR gets merged, the Echo Agent should be live within a few minutes.

## Publishing an Echo Agent

If you're not a maintainer, this section is not relevant to you.

We have a GitHub Action that automatically regenerates the entry file and submits a PR to the main branch. As soon as the PR is merged, Vercel should be able to serve the new Echo Agent.

## Maintenance

If you're not a maintainer, this section is not relevant to you.

This project requires node `v20` and `pnpm`. To install dependencies, run:

```
pnpm install
```

You can run the following commands to validate, format, and typecheck, and codegen the project:

```
pnpm build:validate
pnpm build:prettier
pnpm build:typecheck
pnpm build:codegen
```

To run the serverless function locally, run:

```
pnpm start
```
