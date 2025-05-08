// const fs = require('fs');
// const path = require('path');
// const { uploadFileToPinata } = require('../utils/pinata');
// const createAndUploadNFTMetadata = require('../services/animal.services');

// module.exports.registerAnimal = async (req, res) => {
//     try {
//         // Check if file exists
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Image file is required"
//             });
//         }

//         const requiredFields = ['animalName', 'latitude', 'longitude', 'temperature', 'description'];
//         const missingFields = requiredFields.filter(field => !req.body[field]);

//         if (missingFields.length > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Missing required fields: ${missingFields.join(', ')}`
//             });
//         }

//         console.log('Validation passed, processing data...');

//         // Prepare animal data
//         const animalData = {
//             animalName: req.body.animalName,
//             location: {
//                 lat: parseFloat(req.body.latitude),
//                 lng: parseFloat(req.body.longitude)
//             },
//             temperature: parseFloat(req.body.temperature),
//             description: req.body.description,
//             ismoving: req.body.ismoving === 'true',
//             timestamp: Date.now()
//         };

//         // Upload image to IPFS
//         console.log('Uploading image to IPFS...');
//         const imageUploadResult = await uploadFileToPinata(req.file.path);

//         if (!imageUploadResult.success) {
//             return res.status(500).json({
//                 success: false,
//                 message: `Failed to upload image: ${imageUploadResult.error}`
//             });
//         }

//         console.log('Image upload successful:', imageUploadResult);

//         // Create and upload NFT metadata using the service
//         const metadataResult = await createAndUploadNFTMetadata(animalData, imageUploadResult.ipfsHash);

//         if (!metadataResult.success) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Failed to create and upload NFT metadata"
//             });
//         }

//         // Clean up uploaded file
//         if (fs.existsSync(req.file.path)) {
//             fs.unlinkSync(req.file.path);
//         }

//         // Send response
//         console.log('Sending response:', JSON.stringify(metadataResult));
//         return res.status(201).json(metadataResult);

//     } catch (error) {
//         console.error("Error processing animal NFT:", error);
//         // Clean up file if exists
//         if (req.file && fs.existsSync(req.file.path)) {
//             fs.unlinkSync(req.file.path);
//         }
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

const fs = require('fs');
const path = require('path');
const { registerAnimalToIpfs } = require('../services/animal.services');
const upload = require('../middlewares/upload');

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

module.exports.registerAnimal = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image file is required"
            });
        }

        const requiredFields = ['animalName', 'latitude', 'longitude', 'temperature', 'description'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        console.log('Validation passed, processing data...');

        // Prepare animal data
        const animalData = {
            animalName: req.body.animalName,
            location: {
                lat: parseFloat(req.body.latitude),
                lng: parseFloat(req.body.longitude)
            },
            temperature: parseFloat(req.body.temperature),
            description: req.body.description,
            ismoving: req.body.ismoving === 'true',
            timestamp: Date.now()
        };

        // Call service to handle IPFS upload
        const result = await registerAnimalToIpfs(animalData, req.file.path);

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: result.error
            });
        }

        // Clean up uploaded file
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        // Send response
        return res.status(201).json({
            success: true,
            animal: animalData,
            ipfs: result.ipfsData
        });

    } catch (error) {
        console.error("Error processing animal NFT:", error);
        // Clean up file if exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};