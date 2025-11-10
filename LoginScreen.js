// LoginScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Logged in!");
        navigation.navigate("Info"); 
      })
      .catch((e) => Alert.alert("Error", e.message));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} style={{ margin: 5, borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={{ margin: 5, borderWidth: 1, padding: 8 }} />
      <Button title="Login" onPress={login} />
      <Button title="Go to Register" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}
