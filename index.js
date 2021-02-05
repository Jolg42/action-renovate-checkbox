const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const masterIssueId = core.getInput("master-issue-id");
    core.info(`masterIssueId ${masterIssueId}`);

    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

    const { data: masterIssue } = await octokit.issues.get({
      ...github.context.repo,
      issue_number: masterIssueId,
    });

    core.info(`Found masterIssue ${masterIssue}`);
    core.info(`Found masterIssue body ${masterIssue.body}`);

    const CHECKED = "- [x] <!-- manual job -->";
    const UNCHECKED = "- [ ] <!-- manual job -->";

    if (masterIssue.body.includes(CHECKED)) {
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
