const core = require("@actions/core");
const github = require("@actions/github");

const CHECKED = "- [x] <!-- manual job -->";
const UNCHECKED = "- [ ] <!-- manual job -->";

async function run() {
  try {
    const masterIssueId = core.getInput("master-issue-id");
    const owner = core.getInput("owner");
    const repo = core.getInput("repo");
    const token = core.getInput("token");

    if (!masterIssueId) {
      core.setFailed("master-issue-id is missing! Please take a look at the documentation and set the missing parameter.");
      return;
    }

    if (!(token ? token : process.env.GITHUB_TOKEN)) {
      core.setFailed("token and GITHUB_TOKEN is missing! Please take a look at the documentation and set the missing parameter.");
      return;
    }

    const octokit = github.getOctokit(token ? token : process.env.GITHUB_TOKEN);

    const { data: masterIssue } = await octokit.issues.get({
      owner: owner ? owner : github.context.repo.owner,
      repo: repo ? repo : github.context.repo.repo,
      issue_number: masterIssueId,
    }).catch(err => core.error(err));

    // if (masterIssue.user.login !== "renovate[bot]") {
    //   const message = `Issue ID ${masterIssue.id} author must be "renovate[bot]"`;
    //   core.setFailed(message);
    // }

    // Stop here if already checked
    if (masterIssue.body.includes(CHECKED)) {
      core.info(`Checkbox already checked.`);
      return "Already Checked";
    }

    await octokit.issues.update({
      owner: owner ? owner : github.context.repo.owner,
      repo: repo ? repo : github.context.repo.repo,
      issue_number: masterIssueId,
      body: masterIssue.body.replace(UNCHECKED, CHECKED),
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
