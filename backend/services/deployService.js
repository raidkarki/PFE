// /server/services/deployService.js
import { exec } from 'child_process';
import { log } from 'console';
import fs from 'fs';
import path from 'path';
import scpClient from 'scp2';
import { Client } from 'ssh2';


const  deployManifest = (filePath) => {
    exec(`kubectl apply -f ${filePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error('Error applying Kubernetes manifest:', err);
            return;
        }

        // Log command output
        console.log('kubectl apply output:', stdout);

        // Log any errors from stderr
        if (stderr) {
            console.error('kubectl apply STDERR:', stderr);
        }
    });
}


 
  

export default deployManifest;

