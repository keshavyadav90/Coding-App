const { exec } = require('child_process');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');


const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_SECRET_KEY');

async function handleSubmission(userId, code, language, problemId) {
    let command = '';
    let fileName = '';


    if (language === 'python') {
        fileName = `submission_${Date.now()}.py`;
        fs.writeFileSync(fileName, code);


        command = `docker run --rm -v $(pwd)/${fileName}:/app/${fileName} my-code-runner python3 /app/${fileName}`;
    } else if (language === 'javascript') {
        fileName = `submission_${Date.now()}.js`;
        fs.writeFileSync(fileName, code);
        command = `docker run --rm -v $(pwd)/${fileName}:/app/${fileName} my-code-runner node /app/${fileName}`;
    }


    exec(command, { timeout: 5000 }, async (error, stdout, stderr) => {
        

        fs.unlinkSync(fileName); 

        let status = 'Accepted';
        let finalOutput = stdout;

        if (error || stderr) {
            status = 'Error';
            finalOutput = stderr || error.message;
        }



        const { data, error: dbError } = await supabase
            .from('submissions')
            .insert([
                {
                    user_id: userId,
                    problem_id: problemId,
                    code: code,
                    language: language,
                    status: status,
                    output: finalOutput
                }
            ]);

        if (dbError) console.error("Supabase Error:", dbError);
        else console.log("Saved to DB:", data);
    });
}