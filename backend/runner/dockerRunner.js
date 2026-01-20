import { spawn } from "child_process";
import crypto from 'crypto';
import fs from 'fs';
import os from "os";
import path from "path";
import { LANGUAGES } from "./languages";

const BASE_DIR = path.join(os.tmpdir(), 'judge');

export async function runInDocker({ code, language, timeoutMs = 3000 }) {

  if (!LANGUAGES[language]) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const { image, fileName, runCmd } = LANGUAGES[language];

  // Create unique working directory
  const id = crypto.randomUUID();
  const workDir = path.join(BASE_DIR, id);

  // Ensure directory exists
  if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir, { recursive: true });
  }

  const codePath = path.join(workDir, fileName);
  fs.writeFileSync(codePath, code);

  // Resolve absolute path for Docker volume mount (crucial for cross-platform)
  // On Windows, Docker might need special handling for paths, but path.resolve usually helps.
  // Ensure that your Docker Desktop has file sharing enabled for the drive if necessary.
  const absoluteWorkDir = path.resolve(workDir);

  const dockerArgs = [
    "run",
    "--rm",
    "--network", "none",
    "--cpus", "0.5",
    "--memory", "128m",
    "--pids-limit", "64",
    // "--cap-drop", "ALL", // Note: Commented out as it sometimes causes issues with some languages needing basic capabilities
    "--read-only",
    "-v", `${absoluteWorkDir}:/app`, // Correct syntax: host_path:container_path
    "-w", "/app",
    image,
    "/bin/sh", "-c", runCmd // Use /bin/sh to be safer across alpine images
  ];

  return new Promise((resolve) => {
    const startTime = Date.now();
    const childProcess = spawn("docker", dockerArgs, { stdio: ["ignore", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";
    let killed = false;

    const timer = setTimeout(() => {
      killed = true;
      childProcess.kill("SIGKILL");
    }, timeoutMs);

    childProcess.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    childProcess.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    childProcess.on("close", (code) => {
      clearTimeout(timer);

      // Cleanup: remove temporary directory
      try {
        fs.rmSync(workDir, { recursive: true, force: true });
      } catch (cleanupErr) {
        console.error("Failed to cleanup workDir:", cleanupErr);
      }

      const execTime = Date.now() - startTime;

      if (killed) {
        return resolve({
          status: "TLE",
          stdout: stdout,
          stderr: "Time limit exceeded",
          execution_time: execTime
        });
      }

      resolve({
        status: code === 0 ? "SUCCESS" : "RUNTIME_ERROR",
        stdout,
        stderr,
        execution_time: execTime
      });
    });

    childProcess.on("error", (err) => {
      clearTimeout(timer);
      resolve({
        status: "SYSTEM_ERROR",
        stdout: "",
        stderr: `Docker execution failed: ${err.message}`,
        execution_time: 0
      });
    });
  });
}