// /server/services/deployService.js
import { exec } from 'child_process';
import path from 'path';

const  deployManifest = (filePath) => {
  const remotePath = '/path/to/destination/manifest.yaml'; // Chemin de destination sur le master node
  const remoteServer = 'user@master-node'; // Détails de connexion au master node

  // Transférer le fichier via SCP
  exec(`scp ${filePath} ${remoteServer}:${remotePath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error transferring file: ${err.message}`);
      return;
    }
    console.log(`File transferred: ${stdout}`);

    // Appliquer le fichier via kubectl
    exec(`ssh ${remoteServer} "kubectl apply -f ${remotePath}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error applying manifest: ${err.message}`);
        return;
      }
      console.log(`Manifest applied: ${stdout}`);
    });
  });
};
export default deployManifest;

