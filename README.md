# echo-registry

This is the official Echo Agent Registry for the Echos ecosystem.

## Register an Echo Agent

To register an Echo Agent, you need to create a new unique directory under `src` and add a new `echo.json` file. Feel free to use any of the existing `echo.json` files as a template.

When you're done, submit a PR to add your Echo Agent to the registry. When your PR is merged, your Echo Agent will be published in a few minutes after the background job completes.

## Publishing an Echo Agent

If you're not a maintainer, this section is not relevant to you.

We have a GitHub workflow that automatically regenerates the entry file and publishes that includes the newly added Echo Agent.

As long as this workflow is committed, Vercel will automatically update our serverless function to include the new Echo Agent.

## Accessing Echo Agents

To access the Echo Agents, you can use the following URL:

```
https://registry.echos.fun/api/echos
```
