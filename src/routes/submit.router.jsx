app.post("/submit", async (req, res) => {  const { language, code, user_id, problem_id } = req.body;
  create submission record (PENDING)  


  const { data } = await supabase    .from("submissions")    .insert({      user_id,      problem_id,      language,      status: "PENDING"    })    .select()    .single();
  async execution  executeCode({    submissionId: data.id,    language,    code  });
  
  res.json({ submission_id: data.id });});


