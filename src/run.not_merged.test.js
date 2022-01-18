process.env.GITHUB_REPOSITORY = "someOwner/repository";
process.env.INPUT_GITHUB_TOKEN = "token"
process.env.INPUT_DESTINATION_BRANCH = "staging"
process.env.GITHUB_SHA = "xx";

const run = require("./run");
const nock = require("nock");
const assertWriteCalls = require("./run.shared-test-context");

describe("when it's not merged", () => {
  beforeEach(() => {
    process.stdout.write = jest.fn();
    nock("https://api.github.com").get("/repos/someOwner/repository/compare/staging...xx").reply(200, { merge_base_commit: { sha: "other_sha" } });
  });

  test("if merge-base is not equal to head, it's not merged", async () => {
    await run();

    assertWriteCalls(["::error::xx is not merged to staging\n"]);
  });
});
