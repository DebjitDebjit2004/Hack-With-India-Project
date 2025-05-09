
// const PINATA_JWT = `Bearer ${process.env.PINATA_JWT}`;

// const { uploadFileToPinata, uploadJSONToPinata } = require('../utils/pinata');

// module.exports.createAnimal = async (data, req) => {
//     try {
//         let imageIpfsUrl = data.image;

//         // Upload image to Pinata if file exists
//         if (req && req.file) {
//             const ipfsHash = await uploadFileToPinata(req.file.path);
//             imageIpfsUrl = `ipfs://${ipfsHash}`;
//         }

//         // Create metadata
//         const metadata = {
//             animalName: data.animalName,
//             timestamp: Date.now(),
//             location: {
//                 lat: data.location.latitude,
//                 lng: data.location.longitude
//             },
//             temperature: data.temperature,
//             ismoving: data?.ismoving || false,
//             description: data.description,
//             image: imageIpfsUrl
//         };

//         // Upload metadata to IPFS
//         const metadataHash = await uploadJSONToPinata(metadata);
//         const metadataUrl = `ipfs://${metadataHash}`;

//         return {
//             message: "Animal data uploaded to IPFS successfully",
//             metadataUrl,
//             metadata
//         };
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };
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
        // Upload image first
        const img = await uploadFileToPinata(imagePath);
        if (!img.success) return { success: false, error: img.error };
        
        const imageUrl = `ipfs://${img.ipfsHash}`;
        
        // Create metadata object
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

        // Create JSON file
        const jsonFilePath = path.join(tempDir, `${Date.now()}.json`);
        fs.writeFileSync(jsonFilePath, JSON.stringify(metadata, null, 2));
        console.log(`JSON file created at: ${jsonFilePath}`);

        // Upload JSON to IPFS
        const meta = await uploadJSONToPinata(metadata);
        if (!meta.success) {
            // Clean up JSON file if upload fails
            if (fs.existsSync(jsonFilePath)) fs.unlinkSync(jsonFilePath);
            return { success: false, error: meta.error };
        }

        // Return success response with file paths
        return { 
            success: true, 
            ipfsData: { 
                imageUrl, 
                metadataUrl: `ipfs://${meta.ipfsHash}`, 
                metadata,
                jsonFilePath // Include local JSON file path in response
            } 
        };
    } catch (error) {
        console.error('Error in registerAnimalToIpfs:', error);
        return { success: false, error: error.message };
    }
}

module.exports = { registerAnimalToIpfs };