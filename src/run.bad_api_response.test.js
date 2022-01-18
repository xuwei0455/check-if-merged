process.env.GITHUB_REPOSITORY = "someOwner/repository";
process.env.INPUT_GITHUB_TOKEN = "token"
process.env.INPUT_DESTINATION_BRANCH = "staging"
process.env.GITHUB_SHA = "xx";

const run = require("./run");
const nock = require("nock");
const assertWriteCalls = require("./run.shared-test-context");

describe("when it's merged", () => {
  beforeEach(() => {
    process.stdout.write = jest.fn();

    nock("https://api.github.com").get("/repos/someOwner/repository/compare/staging...xx").reply(404, {
      message: 'Not Found',
      documentation_url: 'https://docs.github.com/rest/reference/repos#compare-two-commits'
    });
  });

  test("when there is no branch to compare", async () => {
    await run();

    assertWriteCalls(["::error::HttpError: Not Found\n"]);
  });
});
