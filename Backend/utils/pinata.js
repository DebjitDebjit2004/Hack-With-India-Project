
// utils/pinata.js
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
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

async function uploadJSONToPinata(filePath) {
  try {
    console.log('Step 1: Validating file path...');
    if (!fs.existsSync(filePath)) {
      throw new Error(`File does not exist at path: ${filePath}`);
    }

    console.log('Step 2: Reading file content...');
    const file = fs.readFileSync(filePath);
    const fileName = path.basename(filePath); // e.g., "metadata_123.json"

    console.log('Step 3: Creating FormData...');
    const formData = new FormData();
    formData.append('file', file, {
      filename: fileName,
      contentType: 'application/json'
    });

    console.log('Step 4: Checking environment variables...');
    if (!process.env.PINATA_JWT) {
      throw new Error('PINATA_JWT environment variable is missing');
    }

    console.log('Step 5: Uploading to Pinata...');
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS ';
    const res = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
        ...formData.getHeaders()
      }
    });

    if (!res.data?.IpfsHash) {
      throw new Error(`Invalid Pinata response: ${JSON.stringify(res.data)}`);
    }

    console.log('File uploaded successfully!', {
      cid: res.data.IpfsHash,
      url: `ipfs://${res.data.IpfsHash}/${fileName}`
    });

    return {
      success: true,
      ipfsHash: res.data.IpfsHash,
      fileName,
      metadataUrl: `ipfs://${res.data.IpfsHash}/${fileName}`
    };

  } catch (err) {
    console.error(' Pinata file upload failed:', err.message);
    if (err.response) {
      console.error('Server response:', err.response.status, err.response.data);
    } else if (err.request) {
      console.error('No response received:', err.request);
    } else {
      console.error('Unexpected error:', err);
    }

    return { success: false, error: err.message };
  }
}

module.exports = { uploadFileToPinata, uploadJSONToPinata };