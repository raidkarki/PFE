// /server/services/deployService.js
import { exec } from 'child_process';
import { log } from 'console';
import fs from 'fs';
import path from 'path';
import scpClient from 'scp2';
import { Client } from 'ssh2';


const  deployManifest = (filePath) => {
    console.log(filePath.filePath);
  const remotePath = '/home/karkiraid35/manifests'; // Chemin de destination sur le master node
  const remoteServer = 'azureuser@4.233.222.154'; // Détails de connexion au master node
  const privateKeyPath = 'C:/Users/karki/.ssh/masternodessh.pem';
  // Transférer le fichier via SCP
  const conn = new Client();




conn.on('ready', function() {
    console.log('SSH connection established');

    // Upload file via SCP
    scpClient.scp(filePath, {
        host: '4.233.222.154',
        username: 'azureuser',
       
        path: remotePath
    }, function(err) {
        if (err) {
            console.error('Error uploading file:', err);
            conn.end();
            return;
        }

        console.log('File uploaded successfully via SCP');

        // Apply Kubernetes manifest using kubectl on remote server
        conn.exec(`kubectl apply -f ${remotePath}/manifest.yaml`, function(err, stream) {
            if (err) {
                console.error('Error applying manifest:', err);
                conn.end();
                return;
            }

            stream.on('close', function(code, signal) {
                console.log('kubectl apply command executed');
                conn.end();
            }).on('data', function(data) {
                console.log('kubectl apply output:', data.toString());
            }).stderr.on('data', function(data) {
                console.error('kubectl apply STDERR:', data.toString());
            });
        });
    });
}).connect({
    host: '4.233.222.154',
    port: 22,
    username: 'azureuser',
    privateKey: fs.readFileSync(privateKeyPath)
});




 
  
};
export default deployManifest;

