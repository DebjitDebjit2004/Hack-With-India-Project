import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
// import { db } from '../firebase';
// import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore';
// import { Web3Storage } from 'web3.storage';

const AdminPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'wildlifeData'));
        const dataArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(dataArray);
        toast.success('Data fetched successfully');
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const uploadToIPFS = async (jsonData) => {
    const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_TOKEN });
    const file = new File([JSON.stringify(jsonData)], 'data.json', { type: 'application/json' });
    try {
      const cid = await client.put([file]);
      toast.success(`Uploaded to IPFS with CID: ${cid}`);
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      toast.error('IPFS upload failed');
    }
  };

  const handleAccept = async (item) => {
    await uploadToIPFS(item);
    await handleDecline(item.id);
  };

  const handleDecline = async (id) => {
    try {
      await deleteDoc(doc(db, 'wildlifeData', id));
      setData(data.filter((item) => item.id !== id));
      toast.success('Data removed successfully');
    } catch (error) {
      console.error('Error removing data:', error);
      toast.error('Failed to remove data');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      {data.map((item) => (
        <motion.div key={item.id} className="p-4 bg-white rounded-lg shadow-md mb-4">
          <p className="text-lg">{JSON.stringify(item)}</p>
          <div className="mt-4 flex gap-4">
            <button onClick={() => handleAccept(item)} className="px-4 py-2 bg-green-500 text-white rounded">Accept</button>
            <button onClick={() => handleDecline(item.id)} className="px-4 py-2 bg-red-500 text-white rounded">Decline</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminPage;
