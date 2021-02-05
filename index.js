const core = require("@actions/core");
const github = require("@actions/github");

const CHECKED = "- [x] <!-- manual job -->";
const UNCHECKED = "- [ ] <!-- manual job -->";

async function run() {
  try {
    const masterIssueId = core.getInput("master-issue-id");
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

    const { data: masterIssue } = await octokit.issues.get({
      ...github.context.repo,
      issue_number: masterIssueId,
    });

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
      ...github.context.repo,
      issue_number: masterIssueId,
      body: masterIssue.body.replace(UNCHECKED, CHECKED),
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
