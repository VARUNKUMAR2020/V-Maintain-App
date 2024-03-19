import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import styles from "../Styles";
import { StatusBar } from "expo-status-bar";

const FarmCount = ({ URL, CountURL }) => {
  const [selectedValue, setSelectedValue] = useState("அனைத்து");
  const [villageName, setVillageName] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    await axios.get(URL).then((response) => setVillageName(response.data.data));
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  useEffect(() => {
    try {
      axios.post(CountURL, { Village: selectedValue }).then((response) => {
        setCount(response.data.count);
        setData(response.data.data);
      });
    } catch (error) {
      console.log("Error", error);
    }
  }, [selectedValue]);

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <StatusBar/>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
          >
            <Picker.Item
              label="அனைத்து"
              value="அனைத்து"
              style={{ color: "red" }}
            />
            {villageName.length > 0 &&
              villageName.map((village, index) => (
                <Picker.Item
                  key={index}
                  label={village}
                  value={village}
                  style={{ color: "black" }}
                />
              ))}
          </Picker>
          <Text style={{ paddingLeft: 10, fontSize: 16 }}>
            {selectedValue} கொட்டகையின் எண்ணிக்கை -{" "}
            <Text style={{ color: "red", fontSize: 30 }}>{count}</Text>
          </Text>
        </>
      )}
      <View style={styles.MainTable}>
        <View style={styles.tables}>
          <Text style={styles.tableText}>டிரைவர் பெயர்</Text>
          <Text style={styles.tableText}>ஊர் பெயர்</Text>
          <Text style={styles.tableText}>எண்ணிக்கை</Text>
        </View>

        {data &&
          data.map((item, index) => (
            <ScrollView key={index}>
              <View style={styles.tablesData} >
                <Text style={styles.text}>{item.DriverName}</Text>
                <Text style={styles.text}>{item.VillageName}</Text>
                <Text style={styles.text}>{item.TotalFarmLoaded}</Text>
              </View>
            </ScrollView>
          ))}
      </View>
    </>
  );
};

export default FarmCount;