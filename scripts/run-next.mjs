import { spawn } from "node:child_process";
import process from "node:process";
import "dotenv/config";

const mode = process.argv[2];

if (!mode || !["dev", "start"].includes(mode)) {
  console.error("Usage: node scripts/run-next.mjs <dev|start>");
  process.exit(1);
}

const port = process.env.APP_PORT || "3015";
const args = [mode];

if (mode === "dev") {
  args.push("--webpack");
}

args.push("-p", port);

const child = spawn("npx", ["next", ...args], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
