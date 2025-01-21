const express=require('express');
const fs=require('fs');
const app=express();
const PORT=3000;

app.use((req,res,next)=>{
    const logdetails={
        timestamp: new Date().toISOString(),
        ip: req.ip,
        url: req.originalUrl,
        protocol: req.protocol,
        method: req.method,
        hostname: req.hostname,
    };
    const logLine= JSON.stringify(logdetails) + '\n';
    fs.appendFile('requests.log',logLine,(err)=>{
        if(err){
            console.error("Failed to write to the log file: ",err);
        }
    });
    next();
});

app.get('/',(req,res)=>{
    res.send("Hello World!!");
});

app.post('/',(req,res)=>{
    res.send('Post request received!');
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});