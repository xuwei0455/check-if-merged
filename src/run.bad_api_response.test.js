process.env.GITHUB_REPOSITORY = "someOwner/repository";
process.env.INPUT_GITHUB_TOKEN = "token"
process.env.GITHUB_SHA = "xx";

const run = require("./run");
const nock = require("nock");
const assertWriteCalls = require("./run.shared-test-context");

describe("when it's merged", () => {
  let oldWrite;
  let mock;

  beforeEach(() => {
    mock = jest.fn();
    oldWrite = process.stdout.write;
    process.stdout.write = mock;
    nock("https://api.github.com").get("/repos/someOwner/repository/compare/staging...xx").reply(404, {
      message: 'Not Found',
      documentation_url: 'https://docs.github.com/rest/reference/repos#compare-two-commits'
    });
  });

  test("when there is no branch to compare", async () => {
    await run();

    process.stdout.write = oldWrite;

    assertWriteCalls(["::error::HttpError: Not Found\n"], mock);
  });
});
