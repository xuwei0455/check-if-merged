const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  var title = "Not Merged";

  try {
    const token = core.getInput('github_token');
    const params = github.context.repo; // owner and repo
    params.head = core.getInput('source_branch'); // default is master, see action.yml
    params.base = github.context.sha; // cuurent commit sha

    const octokit = github.getOctokit(token);
    // https://docs.github.com/en/rest/reference/commits#compare-two-commits
    const response = await octokit.rest.repos.compareCommits(params);

    if(response.status != 200) {
      title = "Error";
      throw response.err;
    }

    if(response.data.merge_base_commit.sha != params.head) {
        throw `${params.head} is not merged to ${params.base} and response is ${response.data.merge_base_commit.sha}`
    }

    core.notice(`${params.head} is merged to ${params.base}`, { title: "Merged" });
  }
  catch (err) {
    core.setFailed(`${err}`);
  }
};

module.exports = run;
