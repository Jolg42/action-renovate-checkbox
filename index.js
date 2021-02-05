const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('token');
    const masterIssueId = core.getInput('dependency-dashboard-id');
    core.info(`masterIssueId ${masterIssueId}`);
    
    const octokit = new github.GitHub(token);

    const masterIssue = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
      ...github.context.repo,
      issue_number: masterIssueId
    })
    
    core.info(`Found masterIssue ${masterIssue}`);
    core.info(`Found masterIssue body ${masterIssue.body}`);
    
    const CHECKED = '- [x] <!-- manual job -->' 
    const UNCHECKED = '- [ ] <!-- manual job -->'
    
    if (masterIssue.body.contains(CHECKED)) {
      return 'Already Checked'
    }
    
    await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
      ...github.context.repo,
      issue_number: masterIssueId,
      body: masterIssue.body.replace(UNCHECKED, CHECKED)
    })
  
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();



    const response = await octokit.issues.create({
      ...github.context.repo,
      title,
      body,
      assignees: assignees ? assignees.split(',') : undefined
    })

    core.setOutput('issue', JSON.stringify(response.data));

  } catch (err) {
    core.setFailed(err.message)
  }
}

run();
