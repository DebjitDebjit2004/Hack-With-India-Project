const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, child } = require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyAUqGL3uHrHk3-6gqkLz3EdO0NVJNlfDgE",
    authDomain: "arayanya-5026b.firebaseapp.com",
    databaseURL: "https://arayanya-5026b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "arayanya-5026b",
    storageBucket: "arayanya-5026b.firebasestorage.app",
    messagingSenderId: "435041881130",
    appId: "1:435041881130:web:e8830dc41e1b1ba4dec753"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Function to fetch and return the tracker_001 data
async function getAnimalData() {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, 'animal_tracking_data'));

    if (snapshot.exists()) {
      const data = snapshot.val().tracker_001;
      console.log("Fetched data:", data);
      return data;
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

module.exports = { getAnimalData };
