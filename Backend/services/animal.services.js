
const fs = require('fs');
const path = require('path');
const { uploadFileToPinata, uploadJSONToPinata } = require('../utils/pinata');

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

async function registerAnimalToIpfs(animalData, imagePath) {
    try {
      // Step 1: Upload image
      const img = await uploadFileToPinata(imagePath);
      if (!img.success) throw new Error('Image upload failed');
      const imageUrl = `ipfs://${img.ipfsHash}`;
  
      // Step 2: Create metadata
      const metadata = {
        name: animalData.animalName,
        description: animalData.description,
        image: imageUrl,
        attributes: [
          { trait_type: 'Location', value: `${animalData.location.lat},${animalData.location.lng}` },
          { trait_type: 'Temperature', value: `${animalData.temperature}°C` },
          { trait_type: 'Movement Status', value: animalData.ismoving ? 'Moving' : 'Stationary' },
          { display_type: 'date', trait_type: 'Timestamp', value: animalData.timestamp }
        ]
      };
  
      // Step 3: Save metadata to temp file
      const metadataFilePath = path.join(tempDir, `metadata_${Date.now()}.json`);
      fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));
      console.log('Metadata file created:', metadataFilePath);
  
      // Step 4: Upload metadata file to IPFS
      const meta = await uploadJSONToPinata(metadataFilePath); // ✅ Pass file path, NOT object
      if (!meta.success) throw new Error(`Metadata upload failed: ${meta.error}`);
  
      return {
        success: true,
        data: {
          animal: animalData,
          ipfs: {
            imageUrl,
            metadataUrl: meta.metadataUrl
          }
        }
      };
    } catch (error) {
      console.error('Error in registerAnimalToIpfs:', error.message);
      return { success: false, error: error.message };
    }
  }

module.exports = { registerAnimalToIpfs };