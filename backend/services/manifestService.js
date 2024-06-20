// /server/services/manifestService.js
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  } else {
    console.log(`Directory already exists: ${dirPath}`);
  }
};

const manifestService = (preferences, name) => {
  if (!Array.isArray(preferences)) {
    console.error("Preferences is not an array");
    return [];
  }

  const manifestsDir = path.join(__dirname,  'manifests');
  ensureDirectoryExists(manifestsDir);

  const manifests = preferences.filter(preference => {
    if (!preference.tools || !Array.isArray(preference.tools)) {
      console.error("Preference tools is not an array", preference);
      return false;
    }
    return preference.tools.length > 0;
  }).map(preference => {
    const containers = preference.tools.map(tool => {
      if (!tool.tool || !tool.tool.name || !tool.version) {
        console.error("Tool or tool properties missing", tool);
        return null;
      }

      return {
        name: `${tool.tool.name}-container`, // Adjust name formatting as needed
        image: `${tool.tool.imagename}:${tool.version}`,
        command: ['sleep', 'infinity'], // Keep container running indefinitely
        stdin: true,
        tty: true,
      };
    }).filter(container => container !== null);

    if (containers.length === 0) {
      console.error("No valid containers found for preference", preference);
      return null;
    }
    const teachername=name.replace(/\s/g, '-').toLowerCase();
    const subjectname = preference.subject.name.replace(/\s/g, '-').toLowerCase();
    const subjectdegree = preference.subject.degree.replace(/\s/g, '-').toLowerCase();
    
    
    const manifest = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: `${teachername}-${subjectname}`,
        namespace: 'default',
        labels:{
            subject:`${subjectname}`,
            degree:`${subjectdegree}`
            
        }
      },
      spec: {
        replicas: 2,
        selector: {
          matchLabels: {
            app: `${subjectname}`, // Adjust label based on preference name
          },
        },
        template: {
          metadata: {
            labels: {
              app: `${subjectname}`, // Example label for the template
            },
          },
          spec: {
            containers: containers
          },
        },
      },
    };

   

    const filePath = path.join(manifestsDir, `manifest-${name}-${preference.subject._id}.yaml`);
    return {
      content: yaml.dump(manifest),
      filePath: filePath
    };
  }).filter(manifest => manifest !== null);

  console.log("Manifests to write:", manifests);

  manifests.forEach(({ content, filePath }) => {
    try {
      ensureDirectoryExists(path.dirname(filePath));
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Manifest written to ${filePath}`);
    } catch (error) {
      console.error(`Error writing manifest to ${filePath}:`, error);
    }
  });

  return manifests;
};

export default manifestService;