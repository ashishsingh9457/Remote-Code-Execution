import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
    }));
    
app.post('/exec-script', (req, res) => {
    const scriptContent = req.body.scriptContent;
    const lang = req.body.lang;
    const input = req.body.input;
    let runner = ""
    let filename = ""

    switch (lang){
        case "python": 
          runner="python3 Main.py"; filename="Main.py"; break;
        case "javascript": 
          runner="node Main.js"; filename="Main.js"; break;
        case "cpp": 
          runner="g++ Main.cpp -o Main && ./Main && rm Main"; filename="Main.cpp"; break;
        case "java": 
          runner="javac Main.java && java Main && rm Main.class"; filename="Main.java"; break;
        default: 
          return res.status(400).send('language not supported');
    }

    if (!scriptContent) {
    return res.status(400).send('Script content is required');
    }

    fs.writeFile(path.join(__dirname, filename), scriptContent, (err) => {
    if (err) {
        return res.status(500).send(`Error writing script file: ${err.message}`);
    }

    const child = exec(`cd ${__dirname} && ${runner}`);
    child.stdin.write(input);

    child.stdout.on('data', (data) => {
        res.write(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        res.write(`stderr: ${data}`);
    });

    child.on('close', (code) => {
        res.write(`child process exited with code ${code}`);
        res.end();

        // Clean up the temporary script file
        fs.unlink(path.join(__dirname, filename), (unlinkErr) => {
        if (unlinkErr) {
            console.error(`Error deleting script file: ${unlinkErr.message}`);
        }
        });
    });
    });
});

app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html'))});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
