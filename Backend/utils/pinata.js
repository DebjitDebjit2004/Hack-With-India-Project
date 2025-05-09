// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');

// const PINATA_JWT = `Bearer ${process.env.PINATA_JWT}`;

// async function uploadFileToPinata(filePath) {
//     try {
//         const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
//         const data = new FormData();
        
//         if (!fs.existsSync(filePath)) {
//             throw new Error(`File not found at path: ${filePath}`);
//         }

//         data.append('file', fs.createReadStream(filePath));

//         const res = await axios.post(url, data, {
//             maxBodyLength: Infinity,
//             headers: {
//                 'Authorization': PINATA_JWT,
//                 ...data.getHeaders()
//             }
//         });

//         if (!res.data || !res.data.IpfsHash) {
//             throw new Error('Invalid response from Pinata');
//         }

//         console.log('File upload successful:', res.data);
//         return {
//             success: true,
//             ipfsHash: res.data.IpfsHash,
//             details: res.data
//         };
//     } catch (error) {
//         console.error('Error uploading file to Pinata:', error.message);
//         return {
//             success: false,
//             error: error.message
//         };
//     }
// }

// async function uploadJSONToPinata(jsonData) {
//     try {
//         const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        
//         if (!jsonData) {
//             throw new Error('No JSON data provided');
//         }

//         const res = await axios.post(url, jsonData, {
//             headers: {
//                 'Authorization': PINATA_JWT,
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!res.data || !res.data.IpfsHash) {
//             throw new Error('Invalid response from Pinata');
//         }

//         console.log('JSON upload successful:', res.data);
//         return {
//             success: true,
//             ipfsHash: res.data.IpfsHash,
//             details: res.data
//         };
//     } catch (error) {
//         console.error('Error uploading JSON to Pinata:', error.message);
//         return {
//             success: false,
//             error: error.message
//         };
//     }
// }

// module.exports = { uploadFileToPinata, uploadJSONToPinata };


// utils/pinata.js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const PINATA_JWT = `Bearer ${process.env.PINATA_JWT}`;

async function uploadFileToPinata(filePath) {
  try {
    if (!fs.existsSync(filePath)) throw new Error(`File not found: ${filePath}`);
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const data = new FormData();
    data.append('file', fs.createReadStream(filePath));
    const res = await axios.post(url, data, { maxBodyLength: Infinity, headers: { Authorization: PINATA_JWT, ...data.getHeaders() } });
    if (!res.data?.IpfsHash) throw new Error('Invalid Pinata response');
    return { success: true, ipfsHash: res.data.IpfsHash, details: res.data };
  } catch (err) {
    console.error('Pinata file upload error:', err.message);
    return { success: false, error: err.message };
  }
}

async function uploadJSONToPinata(jsonData) {
  try {
    if (typeof jsonData !== 'object') throw new Error('Invalid JSON');
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    const res = await axios.post(url, jsonData, { headers: { Authorization: PINATA_JWT, 'Content-Type': 'application/json' } });
    if (!res.data?.IpfsHash) throw new Error('Invalid Pinata response');
    return { success: true, ipfsHash: res.data.IpfsHash, details: res.data };
  } catch (err) {
    console.error('Pinata JSON upload error:', err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { uploadFileToPinata, uploadJSONToPinata };