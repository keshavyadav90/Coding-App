import dotenv from 'dotenv';
import express from "express";
import { executeSubmission } from "./jobs/executeSubmission";


const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.post("/submit", async (req, res) => {
    const { code, language, user_id, problem_id } = req.body;
    const { data } = await supabase
        .from("submissions")
        .insert({
            user_id,
            problem_id,
            language,
            code,
            status: "PENDING"
        })
        .select()
        .single();

    executeSubmission(data);
    res.json({ submission_id: data.id });

})
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);

})