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
    nock("https://api.github.com").get("/repos/someOwner/repository/compare/staging...xx").reply(200, { merge_base_commit: { sha: "xx" } });
  });

  test("if merge-base is equal to head, it's merged", async () => {
    await run();

    process.stdout.write = oldWrite;

    assertWriteCalls(["::notice title=Merged::xx is merged to staging\n"], mock);
  });
});

/* compare response for reference
{
  status: 200,
  url: 'https://api.github.com/repos/CareMessagePlatform/CareMessage/compare/staging...mc_hla_720_online_user',
  headers: {
    'access-control-allow-origin': '*',
    'access-control-expose-headers': 'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset',
    'cache-control': 'private, max-age=60, s-maxage=60',
    connection: 'close',
    'content-encoding': 'gzip',
    'content-security-policy': "default-src 'none'",
    'content-type': 'application/json; charset=utf-8',
    date: 'Fri, 14 Jan 2022 19:58:38 GMT',
    etag: 'W/"6450aa5f3973c643f60041690e3593366124de94153c3689e3c2bd226a3d3576"',
    'github-authentication-token-expiration': '2022-02-13 19:04:31 UTC',
    'last-modified': 'Fri, 14 Jan 2022 16:10:48 GMT',
    'referrer-policy': 'origin-when-cross-origin, strict-origin-when-cross-origin',
    server: 'GitHub.com',
    'strict-transport-security': 'max-age=31536000; includeSubdomains; preload',
    'transfer-encoding': 'chunked',
    vary: 'Accept, Authorization, Cookie, X-GitHub-OTP, Accept-Encoding, Accept, X-Requested-With',
    'x-accepted-oauth-scopes': '',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'deny',
    'x-github-media-type': 'github.v3; format=json',
    'x-github-request-id': '3D52:0C92:46F358:5BC603:61E1D5EE',
    'x-oauth-scopes': 'read:repo_hook, repo, workflow',
    'x-ratelimit-limit': '5000',
    'x-ratelimit-remaining': '4987',
    'x-ratelimit-reset': '1642190363',
    'x-ratelimit-resource': 'core',
    'x-ratelimit-used': '13',
    'x-xss-protection': '0'
  },
  data: {
    url: 'https://api.github.com/repos/CareMessagePlatform/CareMessage/compare/staging...mc_hla_720_online_user',
    html_url: 'https://github.com/CareMessagePlatform/CareMessage/compare/staging...mc_hla_720_online_user',
    permalink_url: 'https://github.com/CareMessagePlatform/CareMessage/compare/CareMessagePlatform:06b504b...CareMessagePlatform:1b27953',
    diff_url: 'https://github.com/CareMessagePlatform/CareMessage/compare/staging...mc_hla_720_online_user.diff',
    patch_url: 'https://github.com/CareMessagePlatform/CareMessage/compare/staging...mc_hla_720_online_user.patch',
    base_commit: {
      sha: '06b504bf927588362ee8a388cb1f5117e5716997',
      node_id: 'C_kwDOALtzltoAKDA2YjUwNGJmOTI3NTg4MzYyZWU4YTM4OGNiMWY1MTE3ZTU3MTY5OTc',
      commit: [Object],
      url: 'https://api.github.com/repos/CareMessagePlatform/CareMessage/commits/06b504bf927588362ee8a388cb1f5117e5716997',
      html_url: 'https://github.com/CareMessagePlatform/CareMessage/commit/06b504bf927588362ee8a388cb1f5117e5716997',
      comments_url: 'https://api.github.com/repos/CareMessagePlatform/CareMessage/commits/06b504bf927588362ee8a388cb1f5117e5716997/comments',
      author: [Object],
      committer: [Object],
      parents: [Array]
    },
    merge_base_commit: {
      sha: 'a035dba015d2bcb5a4a545619d68648e2352f79b',
      node_id: 'C_kwDOALtzltoAKGEwMzVkYmEwMTVkMmJjYjVhNGE1NDU2MTlkNjg2NDhlMjM1MmY3OWI',
      commit: [Object],
      url: 'https://api.github.com/repos/CareMessagePlatform/CareMessage/commits/a035dba015d2bcb5a4a545619d68648e2352f79b',
      html_url: 'https://github.com/CareMessagePlatform/CareMessage/commit/a035dba015d2bcb5a4a545619d68648e2352f79b',
      comments_url: 'https://api.github.com/repos/CareMessagePlatform/CareMessage/commits/a035dba015d2bcb5a4a545619d68648e2352f79b/comments',
      author: [Object],
      committer: [Object],
      parents: [Array]
    },
    status: 'diverged',
    ahead_by: 1,
    behind_by: 111,
    total_commits: 1,
    commits: [ [Object] ],
    files: [ [Object], [Object], [Object], [Object] ]
  }
}
*/
