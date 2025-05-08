import fs from 'fs';

// File paths
const inputFilePath = 'c:/Users/ANKIT KUMAR GUPTA/OneDrive/Desktop/Hack-With-India-Project/Frontend/public/data/geoBoundaries-IND-ADM1_simplified.geojson';
const outputFilePath = 'c:/Users/ANKIT KUMAR GUPTA/OneDrive/Desktop/Hack-With-India-Project/Frontend/public/data/geoBoundaries-IND-ADM1_simplified_cleaned.geojson';

// Function to remove macrons (diacritical marks)
function removeMacrons(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Read the GeoJSON file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Parse the GeoJSON data
  let geoJson;
  try {
    geoJson = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error parsing the GeoJSON file:', parseErr);
    return;
  }

  // Process each feature and clean the shapeName
  geoJson.features.forEach((feature) => {
    if (feature.properties && feature.properties.shapeName) {
      feature.properties.shapeName = removeMacrons(feature.properties.shapeName);
    }
  });

  // Write the cleaned GeoJSON data to a new file
  fs.writeFile(outputFilePath, JSON.stringify(geoJson, null, 2), (writeErr) => {
    if (writeErr) {
      console.error('Error writing the cleaned file:', writeErr);
    } else {
      console.log('Cleaned GeoJSON file saved to:', outputFilePath);
    }
  });
});