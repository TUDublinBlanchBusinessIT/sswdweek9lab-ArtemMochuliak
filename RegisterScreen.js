// RegisterScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    console.log("Register button pressed"); 
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert("Account created!"))
      .catch((e) => Alert.alert("Error", e.message));
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} style={{ margin: 5, borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={{ margin: 5, borderWidth: 1, padding: 8 }} />
      <Button title="Register" onPress={register} />
      <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
