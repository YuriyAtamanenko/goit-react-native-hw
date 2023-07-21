import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
// import icons
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const initialState = {
  description: "",
  location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [inputValues, setInputValue] = useState(initialState);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    setInputValue(initialState);
    setPhoto(null);

    navigation.navigate("Список публікацій", { photo, inputValues, location });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Camera style={styles.camera} ref={setCamera}>
            <View style={styles.photoView}>
              <TouchableOpacity onPress={takePhoto} style={styles.takePhotoBtn}>
                <FontAwesome name="camera" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
          <Text style={styles.text}>
            {photo ? "Редагувати фото" : "Завантажте фото"}
          </Text>

          <View style={styles.formInputs}>
            <TextInput
              style={[styles.input]}
              placeholder="Назва..."
              placeholderTextColor={"#BDBDBD"}
              value={inputValues.description}
              onChangeText={(value) =>
                setInputValue((prevState) => ({
                  ...prevState,
                  description: value,
                }))
              }
            />
            <TextInput
              style={[styles.input, { paddingLeft: 28 }]}
              placeholder="Місцевість..."
              placeholderTextColor={"#BDBDBD"}
              value={inputValues.location}
              onChangeText={(value) =>
                setInputValue((prevState) => ({
                  ...prevState,
                  location: value,
                }))
              }
            />
            <SimpleLineIcons
              style={styles.locationIcon}
              name="location-pin"
              size={24}
              color="#BDBDBD"
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.submit,
              { backgroundColor: photo ? "#FF6C00" : "#F6F6F6" },
            ]}
            onPress={photo && sendPhoto}
          >
            <Text
              style={[
                styles.textSubmit,
                { color: photo ? "#FFFFFF" : "#BDBDBD" },
              ]}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
  },
  camera: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 32,
    height: 240,

    borderRadius: 8,
  },
  photoView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },

  takePhotoBtn: {
    backgroundColor: "rgba(255,255,255, 0.3)",
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  text: {
    color: "#BDBDBD",
    fontFamily: "R-Regular",
    fontSize: 16,
    marginTop: 8,
  },
  formInputs: {
    position: "relative",
    width: "100%",
    gap: 16,
    marginVertical: 32,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",

    fontFamily: "R-Medium",
    fontSize: 16,
    color: "#212121",
  },
  locationIcon: {
    position: "absolute",
    bottom: 28,
  },
  submit: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "100%",

    border: 1,
    borderRadius: 100,
  },
  textSubmit: {
    fontFamily: "R-Regular",
    fontSize: 16,
  },
});
