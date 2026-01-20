import { runInDocker } from "../runner/dockerRunner.js";
import {supabase} from "../config.js";

export async function executeSubmission(submission) {
    
     const {id , code , language} = submission ;
     try {
        const result = await runInDocker({ code , language}) ;
        await supabase .from("submissions")
        .update({
            status : result.status, 
            stderr : result.stderr ,
            stdout : result.stdout ,
            execution_time : result.execution_time
        })
        .eq("id" , id)
     } catch (error) {
        await supabase .from("submissions")
        .update({
            status : "SYSTEM_ERROR" ,
            stderr : error.message
        })
        .ed("id" , id)
     }
}