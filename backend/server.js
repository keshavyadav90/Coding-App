import express from "express" 
import { executeSubmission } from "./jobs/executeSubmission";


const app = express()


app.post("/submit" , async (req ,res) => {
    const {code , language , user_id , problem_id } = req.body ;
    const {data} = await supabase
    .from("submissions")
    .insert ({
        user_id ,
        problem_id ,
        language ,
        code,
        status : "PANDING"
    })
    .select ()
    .single();

    executeSubmission(data) ;
    res.json({ submission_id : data.id});
})