

// 1️⃣ React Native (Client Side)
// What the app sends
{
  "language": "python",
    "code": "print(2+2)",
      "problem_id": "two_sum_001",
        "user_id": "uuid"
}


// API call
await fetch("https://api.yourapp.com/submit",
  {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });



// 2️⃣ Backend API (Node.js + Express)
// Why Node.js?
// ✔ Good Docker integration✔ Async process handling✔ You already plan to use it

// ---
// /submit endpoint
app.post("/submit", async (req, res) => {  const { language, code, user_id, problem_id } = req.body;
  // create submission record (PENDING)  const { data } = await supabase    .from("submissions")    .insert({      user_id,      problem_id,      language,      status: "PENDING"    })    .select()    .single();
  // async execution  executeCode({    submissionId: data.id,    language,    code  });
  res.json({ submission_id: data.id });});




//   3️⃣ Docker Execution(Core Part)
// Strategy
// One container per submission
// Hard limits(CPU, memory, time)
// Destroy container after execution


// ---
//   4️⃣ Language - Based Docker Images
// Example images
// Language	Image
// Python	python: 3.11 - alpineJS	node: 20 - alpineJava	openjdk: 21 - slimC++	gcc: 13


// ---
//   5️⃣ Executing Code Inside Docker
// Node.js Docker runner

import { exec } from "child_process";
function executeCode({ submissionId, language, code }) {
  const filename = getFileName(language); 
  const command = `docker run --rm \  --cpus="0.5" \  --memory="128m" \  -v /tmp/${submissionId}:/app \  ${getImage(language)} \  sh -c "echo '${escape(code)}' > ${filename} && ${getRunCmd(language)}"`;
  exec(command, { timeout: 3000 }, 
    async (err, stdout, stderr) => { await saveResult({ submissionId, stdout, stderr, status: err ? "ERROR" : "SUCCESS" }); });
}


  // Language helpers

function getImage(lang) { return { python: "python:3.11-alpine", javascript: "node:20-alpine", java: "openjdk:21-slim" }[lang]; }
function getRunCmd(lang) { return { python: "python main.py", javascript: "node main.js", java: "javac Main.java && java Main" }[lang]; }
function getFileName(lang) { return { python: "main.py", javascript: "main.js", java: "Main.java" }[lang]; }



  // 6️⃣ Saving Result to Supabase
// Schema(important)
// submissions----------- id(uuid)user_idproblem_idlanguagestatusstdoutstderrexecution_timecreated_at


  // Save execution output
async function saveResult({ submissionId, stdout, stderr, status }) { await supabase.from("submissions").update({ stdout, stderr, status }).eq("id", submissionId); }


//   7️⃣ Security(NON - NEGOTIABLE)
// ✅ Docker flags:
// --network none--read - only--pids - limit 64--cap - drop ALL
// ✅ Timeout execution✅ No volume access except temp folder✅ No internet inside container

---
//   8️⃣ Scaling(When Users Grow)
// Small scale
// Direct Docker execution

// Medium scale
// Job Queue(BullMQ / Redis)

// Large scale(LeetCode style)
// Kubernetes
// Pre - warmed runners
// Judge workers
