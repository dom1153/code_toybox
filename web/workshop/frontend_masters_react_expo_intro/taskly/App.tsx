import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./theme";

export default function App() {
  const handleDelete = () => {
    console.log("Pressed Delete");
    Alert.alert(
      "Are you sure you want to delete this",
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => console.log("Ok, deleting"),
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        {/* <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#1a759f",
            paddingHorizontal: 8,
            paddingVertical: 16,
          }}
        > */}
        <Text style={styles.itemText}>Coffee</Text>
        {/* <Pressable onPress={() => console.log("pressed")}>
            <Text>Pressable</Text>
          </Pressable> */}
        <TouchableOpacity
          onPress={handleDelete}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text style={styles.buttonText}>TouchableOpacity</Text>
        </TouchableOpacity>
        {/* Button cannot be sytled; so it's not used; use 'Touchable/Pressable */}
        {/* <Button title="Press me"></Button> */}
      </View>

      {/* <StatusBar style="auto" /> */}
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itemText: {
    fontSize: 16,
    fontWeight: "200",
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
