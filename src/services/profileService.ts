import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { storage, db } from '../config/firebase';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  userType: 'renter' | 'owner' | 'both';
  birthday: string;
  profilePictureUrl?: string;
  joinDate: string;
  lastActive: string;
  rating: number;
  totalRentals: number;
  totalEarnings: number;
  responseTime: string;
  verificationLevel: number;
  badges: string[];
  stats: {
    itemsListed: number;
    timesRented: number;
    repeatCustomers: number;
    averageRating: number;
    responseRate: number;
    onTimeDelivery: number;
  };
}

/**
 * Upload profile picture to Firebase Storage
 * @param file - The image file to upload
 * @param userId - The user's ID
 * @returns Promise<string> - The download URL of the uploaded image
 */
export const uploadProfilePicture = async (file: File, userId: string): Promise<string> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `profile-pictures/${userId}/${timestamp}.${fileExtension}`;
    
    // Create a reference to the file location
    const storageRef = ref(storage, fileName);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw new Error('Failed to upload profile picture');
  }
};

/**
 * Delete profile picture from Firebase Storage
 * @param imageUrl - The URL of the image to delete
 */
export const deleteProfilePicture = async (imageUrl: string): Promise<void> => {
  try {
    // Extract the file path from the URL
    const url = new URL(imageUrl);
    const path = decodeURIComponent(url.pathname.split('/o/')[1]?.split('?')[0] || '');
    
    if (path) {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    }
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    // Don't throw error as this is not critical
  }
};

/**
 * Save user profile to Firestore
 * @param profile - The user profile data
 */
export const saveUserProfile = async (profile: UserProfile): Promise<void> => {
  try {
    const userRef = doc(db, 'users', profile.id);
    await setDoc(userRef, profile, { merge: true });
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw new Error('Failed to save user profile');
  }
};

/**
 * Get user profile from Firestore
 * @param userId - The user's ID
 * @returns Promise<UserProfile | null> - The user profile or null if not found
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw new Error('Failed to get user profile');
  }
};

/**
 * Update user profile picture URL
 * @param userId - The user's ID
 * @param imageUrl - The new profile picture URL
 */
export const updateProfilePictureUrl = async (userId: string, imageUrl: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      profilePictureUrl: imageUrl,
      lastActive: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating profile picture URL:', error);
    throw new Error('Failed to update profile picture');
  }
};

/**
 * Create a new user profile during signup
 * @param userData - The user data from signup form
 * @param profilePictureUrl - Optional profile picture URL
 * @returns Promise<UserProfile> - The created user profile
 */
export const createUserProfile = async (
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    userType: 'renter' | 'owner' | 'both';
    birthday: string;
  },
  profilePictureUrl?: string
): Promise<UserProfile> => {
  const userId = `user_${Date.now()}`;
  const now = new Date().toISOString();
  
  const profile: UserProfile = {
    id: userId,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
    userType: userData.userType,
    birthday: userData.birthday,
    profilePictureUrl,
    joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    lastActive: now,
    rating: 0,
    totalRentals: 0,
    totalEarnings: 0,
    responseTime: '< 24 hours',
    verificationLevel: 0,
    badges: [],
    stats: {
      itemsListed: 0,
      timesRented: 0,
      repeatCustomers: 0,
      averageRating: 0,
      responseRate: 100,
      onTimeDelivery: 100
    }
  };
  
  await saveUserProfile(profile);
  return profile;
}; 