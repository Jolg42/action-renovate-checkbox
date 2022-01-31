# action-renovate-checkbox

Trigger Renovate with the Dependency Dashboard checkbox.

## Usage

You can now consume the action by referencing the v1 branch

```yaml
uses: Jolg42/action-renovate-checkbox@v1
with:
  master-issue-id: 1234
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Full example

```yaml
name: Renovate Checkbox

on:
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: Jolg42/action-renovate-checkbox@v1
        with:
          master-issue-id: 1234
          owner: Jolg42 # Optional - useful if you want to trigger renovate in another project
          repo: repo123 # Optional - useful if you want to trigger renovate in another project
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
