<<<<<<< HEAD
// require('dotenv').config();
// const { ethers } = require('ethers');

// // Load from .env
// const RPC_URL = process.env.RPC_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
// // Set up ethers
// const provider = new ethers.JsonRpcProvider(RPC_URL);
// const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
// const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);


// /**
//  * Mint NFT for an animal
//  * @param {Object} animal - Mongoose document
//  */
// async function mintNFT(animal) {
//   try {
//     const mongoId = animal._id.toString();  // Document ID for metadata
//     const to = process.env.RECEIVER_ADDRESS || wallet.address; // Who receives the NFT
//     const lat = Math.floor(animal.location.lat);  
//     const lng = Math.floor(animal.location.lng);
//     console.log(lat, lng, mongoId)

//     const tx = await contract.registerAnimal(to, species, mongoId, lat, lng);
//     console.log(`Transaction hash: ${tx.hash}`);

//     const receipt = await tx.wait();
//     console.log(`Confirmed in block: ${receipt.blockNumber}`);
//     return { success: true, txHash: tx.hash, tokenId: await contract.tokenIds() };
//   } catch (err) {
//     console.error('Minting failed:', err);
//     return { success: false, error: err.message };
//   }
// }

// module.exports = { mintNFT };
=======
// require('dotenv').config();
// const { ethers } = require('ethers');

// // Load from .env
// const RPC_URL = process.env.RPC_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
// // Set up ethers
// const provider = new ethers.JsonRpcProvider(RPC_URL);
// const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
// const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);


// /**
//  * Mint NFT for an animal
//  * @param {Object} animal - Mongoose document
//  */
// async function mintNFT(animal) {
//   try {
//     const mongoId = animal._id.toString();  // Document ID for metadata
//     const to = process.env.RECEIVER_ADDRESS || wallet.address; // Who receives the NFT
//     const lat = Math.floor(animal.location.lat);  
//     const lng = Math.floor(animal.location.lng);
//     console.log(lat, lng, mongoId)

//     const tx = await contract.registerAnimal(to, species, mongoId, lat, lng);
//     console.log(`Transaction hash: ${tx.hash}`);

//     const receipt = await tx.wait();
//     console.log(`Confirmed in block: ${receipt.blockNumber}`);
//     return { success: true, txHash: tx.hash, tokenId: await contract.tokenIds() };
//   } catch (err) {
//     console.error('Minting failed:', err);
//     return { success: false, error: err.message };
//   }
// }

// module.exports = { mintNFT };
>>>>>>> refs/remotes/origin/samir
