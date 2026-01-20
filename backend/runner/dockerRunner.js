import {spawn} from "child_process";
import fs from 'fs' ;
import path, { resolve } from "path";
import crypto from 'crypto';
import {LANGUAGES} from "./languages";

const BASE_DIR = '/tmp/judge' ;
export async function runInDocker({code , language , timeoutMs = 3000}) {

   if(!LANGUAGES[language]) {
    throw new Error ("Unsupported language")
   }   

   const id = crypto.randomUUID()
   const workDir = path.join(BASE_DIR , id)
   fs.mkdirSync(workDir, {recursive : true}); 

   const {image , fileName , runCmd } = LANGUAGES[language]; 
   const codePath  = path.join(workDir , fileName)
   fs.writeFileSync(codePath , code) ;

   
  const dockerArgs = [
    "run" ,
    "--rm" ,
    "--network", "none" ,
    "--cpus" , "0.5" ,
    "--memory", "128m" ,
    "--pids-limit" , "64" ,
    "--cap-drop" , "ALL" ,
    "--read-only" , 
    "-v" , `${workDir} : app:ro` ,
    "-w", "/app" ,
    image ,
    "sh" , "-c", runCmd
  ];

  return new Promise((resolve) => {
    const startTime = Date.now(); 
    const process = spawn("docker" , dockerArgs ,{stdio : ["ignore", "pipe" ,"pipe"]});

    let stdout = "" ;
    let stderr = "" ;
    let killed = false ;

    const timer = setTimeout(() => {
        killed = true ;
        process.kill("SIGKILL");
    },timeoutMs); 
    process.stdout.on("data" ,(data) => {
        stdout += data.toString();

    });
    process.stderr.on("data", (data) => {
        stderr += data.toString()
    });
    process.on("close" , (code) => {
        clearTimeout(timer) ;
        fs.rmSync(workDir, {recursive : true , force : true});
     
    const execTime = Date.now() - startTime;

    if(killed) {
          return resolve ({
            status : "TLE" ,
            stdout : "" ,
            stderr : "Time limit exceeded" ,
            execution_time : execTime
           })
    } 
     resolve ({
        status : code === 0 ? "SUCCESS" : "RUNTIME_ERROR" ,
        stdout ,
        stderr , 
        execution_time : execTime 
     })

    })

  })

}