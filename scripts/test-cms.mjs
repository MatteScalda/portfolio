import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { spawnSync } from "node:child_process";

const directory = mkdtempSync(path.join(tmpdir(), "portfolio-cms-test-"));
const env = {
  ...process.env,
  PAYLOAD_SECRET: randomBytes(32).toString("hex"),
  DATABASE_URL: `file:${path.join(directory, "test.db")}`,
  PAYLOAD_MEDIA_DIR: path.join(directory, "media"),
  CMS_INTEGRATION_TEST: "true",
};

try {
  for (const args of [["migrate"], ["run", "src/cms/verify.ts"]]) {
    const result = spawnSync(process.execPath, ["node_modules/payload/bin.js", ...args], { env, stdio: "inherit" });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exitCode = result.status || 1;
    if (process.exitCode) break;
  }
} finally {
  rmSync(directory, { recursive: true, force: true });
}
