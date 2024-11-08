import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
    }));
    
app.post('/exec-script', (req, res) => {
    const scriptContent = req.body.scriptContent;
    const lang = req.body.lang;
    let parser = ""

    switch (lang){
        case "python": parser="python"; break;
        case "javascript": parser="node"; break;
        case "c++": parser="gcc"; break;
        case "java": parser="java"; break;
        default: return res.status(400).send('language not supported');
    }

    if (!scriptContent) {
    return res.status(400).send('Script content is required');
    }

    const scriptPath = path.join(__dirname, 'tempScript.js');
    console.log(scriptContent)

    fs.writeFile(scriptPath, scriptContent, (err) => {
    if (err) {
        return res.status(500).send(`Error writing script file: ${err.message}`);
    }

    const child = exec(`${parser} ${scriptPath}`);

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
        fs.unlink(scriptPath, (unlinkErr) => {
        if (unlinkErr) {
            console.error(`Error deleting script file: ${unlinkErr.message}`);
        }
        });
    });
    });
});

app.post('/exec', (req, res) => {
  const { file } = req.body;

  if (!file) {
    return res.status(400).send('Command is required');
  }
  const child = exec(file);

  child.stdout.on('data', (data) => {
    res.write(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    res.write(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    res.write(`child process exited with code ${code}`);
    res.end();
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
