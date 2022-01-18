const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // github_token: ${{ secrets.GITHUB_TOKEN }}
  // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret

  var title = "Not Merged";

  try {
    const myToken = core.getInput('github_token');
    const params = github.context.repo; // owner and repo
    params.head = github.context.sha;
    params.base = "staging"; // TODO: GET FROM INPUT

    const octokit = github.getOctokit(myToken)
    const response = await octokit.rest.repos.compareCommits(params);

    if(response.status != 200) {
      title = "Error"
      throw response.err;
    }

    if(response.data.merge_base_commit.sha != params.head) {
      throw `${params.head} is not merged to ${params.base}`
    }

    core.notice(`${params.head} is merged to ${params.base}`, { title: "Merged" })
  }
  catch (err) {
    core.setFailed(`${err}`);
  }
};

module.exports = run;
