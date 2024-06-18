

import dataService from './dataRetreive.js';

import manifestService from './manifestService.js';

import deployService from './deployService.js';
const createAndDeployManifests = async (req, res) => {
  try {
    
    const teachers = await dataService();

    teachers.forEach(teacher => {
      const manifestFilePaths = manifestService(teacher.preference,teacher.name);
      manifestFilePaths.forEach(filePath => deployService(filePath));
    });
    
    res.status(200).json({ message: 'Manifests created and deployed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export default createAndDeployManifests;