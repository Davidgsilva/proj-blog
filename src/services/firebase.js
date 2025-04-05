// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if it hasn't been initialized already
// This prevents multiple initializations during development with Fast Refresh
let app;
let db;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
} else {
  app = getApps()[0];
  db = getFirestore(app);
}

// Add a story to Firestore
export const addStory = async (storyData) => {
  try {
    // Check if Firebase is properly initialized
    if (!db) {
      throw new Error('Firestore database is not initialized');
    }

    // Log the attempt with sanitized data
    console.log('Attempting to add document to Firestore:', {
      collection: 'stories',
      data: { ...storyData, content: `${storyData.content.substring(0, 30)}...` }
    });

    // Check if the Firebase project exists and is properly configured
    try {
      // First try to access the collection to check permissions
      const storiesRef = collection(db, "stories");
      console.log('Successfully accessed the stories collection');

      // Then add the document
      const docRef = await addDoc(storiesRef, {
        ...storyData,
        createdAt: serverTimestamp(),
      });

      console.log('Document successfully added with ID:', docRef.id);
      return docRef.id;
    } catch (firestoreError) {
      // Handle specific Firestore errors
      if (firestoreError.code === 'permission-denied') {
        console.error('Firebase permission denied. Check your Firestore rules.');
        throw new Error('Permission denied. Your Firebase project may not have proper security rules set up.');
      } else if (firestoreError.message && firestoreError.message.includes('400')) {
        console.error('Received 400 Bad Request from Firebase:', firestoreError);
        throw new Error('Firebase returned a 400 Bad Request error. Your project configuration may be incorrect or the service may be unavailable.');
      } else {
        throw firestoreError;
      }
    }
  } catch (error) {
    console.error("Error adding story: ", error);
    throw error;
  }
};

// Export a function to check Firebase connection
export const checkFirebaseConnection = async () => {
  try {
    if (!db) {
      return { success: false, error: 'Firestore database is not initialized' };
    }
    
    // Try to access a collection to verify connection
    const testCollection = collection(db, 'connection_test');
    return { success: true, message: 'Firebase connection successful' };
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error connecting to Firebase',
      code: error.code
    };
  }
};

// Fetch all stories from Firestore
export const getStories = async () => {
  try {
    if (!db) {
      throw new Error('Firestore database is not initialized');
    }

    console.log('Fetching stories from Firestore...');
    
    // Create a query to get all stories ordered by creation time (newest first)
    const storiesRef = collection(db, "stories");
    const q = query(storiesRef, orderBy("createdAt", "desc"));
    
    // Execute the query
    const querySnapshot = await getDocs(q);
    
    // Convert the query snapshot to an array of story objects
    const stories = [];
    querySnapshot.forEach((doc) => {
      stories.push({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to JavaScript Date
        createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date()
      });
    });
    
    console.log(`Successfully fetched ${stories.length} stories`);
    return stories;
  } catch (error) {
    console.error("Error fetching stories: ", error);
    throw error;
  }
};

export { db };
