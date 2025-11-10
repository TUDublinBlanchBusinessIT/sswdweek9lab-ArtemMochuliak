import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db, auth } from './firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

export default function UserProfileScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [favoriteCity, setFavoriteCity] = useState('');
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        signInAnonymously(auth)
          .then(() => console.log('Signed in anonymously'))
          .catch((error) => console.error('Anonymous sign-in failed', error));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!fullName || !favoriteCity) {
      alert('Please fill in both fields');
      return;
    }

    if (!user) {
      alert('User not signed in');
      return;
    }

    try {
      await addDoc(collection(db, 'userProfiles'), {
        fullName,
        favoriteCity,
        uid: user.uid,
        createdAt: new Date()
      });
      alert('Profile saved successfully!');
      setFullName('');
      setFavoriteCity('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error saving profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your full name"
      />
      <Text style={styles.label}>Favorite City:</Text>
      <TextInput
        style={styles.input}
        value={favoriteCity}
        onChangeText={setFavoriteCity}
        placeholder="Enter your favorite city"
      />
      <Button title="Save Profile" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { marginTop: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 10, marginTop: 5, borderRadius: 5 }
});
