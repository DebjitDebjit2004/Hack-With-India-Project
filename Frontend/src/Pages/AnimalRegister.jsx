import React, { useState } from 'react';
import axios from 'axios';

const AnimalRegister = () => {
  const [formData, setFormData] = useState({
    animalName: '',
    latitude: '',
    longitude: '',
    temperature: '',
    description: '',
    ismoving: false,
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    setError('');
  
    const data = new FormData();
    data.append('animalName', formData.animalName);
    data.append('latitude', formData.latitude);
    data.append('longitude', formData.longitude);
    data.append('temperature', formData.temperature);
    data.append('description', formData.description);
    data.append('ismoving', formData.ismoving);
    data.append('image', image);
  
    try {
      const res = await axios.post('http://localhost:3000/animal/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  

      console.table({
        success: res.data.success,
        animalName: res.data.animal.animalName,
        imageUrl: res.data.ipfs.imageUrl,
        metadataUrl: res.data.ipfs.metadataUrl,
        cid: res.data.ipfs.metadataCid
      });
  
      if (res.data.success) {
        setResponse(res.data);
      } else {
        setError(res.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('❌ Upload failed:', err.message);
      if (err.response) {
        console.error('Server responded with error:', err.response.data);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Unexpected error:', err);
      }
      setError(
        err.response?.data?.message ||
        err.message ||
        'Network error: Could not connect to server'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register Animal</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Animal Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Animal Name</label>
          <input
            type="text"
            name="animalName"
            onChange={handleChange}
            value={formData.animalName}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Latitude */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="number"
            step="any"
            name="latitude"
            onChange={handleChange}
            value={formData.latitude}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Longitude */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="number"
            step="any"
            name="longitude"
            onChange={handleChange}
            value={formData.longitude}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Temperature */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
          <input
            type="number"
            step="any"
            name="temperature"
            onChange={handleChange}
            value={formData.temperature}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={formData.description}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Is Moving Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="ismoving"
            checked={formData.ismoving}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">Is Moving?</label>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Uploading...' : 'Register Animal'}
          </button>
        </div>
      </form>

      {/* Success Response */}
      {response && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="text-lg font-semibold text-green-800">✅ Success!</h3>
          <p className="mt-2">
            <strong className="block text-sm text-gray-600">Metadata URL:</strong>
            <a
              href={response.ipfs.metadataUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline break-all"
            >
              {response.ipfs.metadataUrl}
            </a>
          </p>
          <p className="mt-2">
            <strong className="block text-sm text-gray-600">Image URL:</strong>
            <a
              href={response.ipfs.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline break-all"
            >
              {response.ipfs.imageUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AnimalRegister;