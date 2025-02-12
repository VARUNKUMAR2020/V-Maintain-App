import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import styles from "../Styles";
import axios from "axios";

const AddFarm = ({ URL }) => {
  const [button, setButton] = useState(true);
  const [VehicleNumber, setVehicleNumber] = useState("");
  const [DriverName, setDriverName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [VillageName, setVillageName] = useState("");
  const [TotalFarmLoaded, setTotalFarmLoaded] = useState("");

  const handleSubmitData = () => {
    axios
      .post(URL, {
        VehicleNumber: VehicleNumber.toUpperCase(),
        DriverName,
        PhoneNumber,
        VillageName: VillageName.trim(),
        TotalFarmLoaded,
      })
      .then((res) => {
        alert(res.data);
        setVehicleNumber("");
        setDriverName("");
        setPhoneNumber("");
        setVillageName("");
        setTotalFarmLoaded("");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    if (
      VehicleNumber &&
      DriverName &&
      PhoneNumber &&
      VillageName &&
      TotalFarmLoaded
    ) {
      setButton(false);
    } else {
      setButton(true);
    }
  }, [VehicleNumber, DriverName, PhoneNumber, VillageName, TotalFarmLoaded]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.addFarm}>நிரப்பப்பட வேண்டிய விவரங்கள்</Text>
        <View style={styles.inputField}>
          <Text style={styles.inputText}>ஓட்டுநரின் பெயர் :-</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setDriverName(text)}
            value={DriverName}
          />

          <Text style={styles.inputText}>வாகன எண் :-</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setVehicleNumber(text)}
            value={VehicleNumber}
          />

          <Text style={styles.inputText}>கைபேசி எண் :-</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setPhoneNumber(text)}
            value={PhoneNumber}
          />

          <Text style={styles.inputText}>கொட்டகை ஏற்றப்பட்ட கிராமம் :-</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setVillageName(text)}
            value={VillageName}
          />

          <Text style={styles.inputText}>கொட்டகை ஏற்றப்பட்ட எண்ணிக்கை :-</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setTotalFarmLoaded(text)}
            value={TotalFarmLoaded}
          />
        </View>
        <View>
          <Button
            title="கொட்டகை சேர்க்க"
            disabled={button}
            onPress={() => handleSubmitData()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddFarm;
