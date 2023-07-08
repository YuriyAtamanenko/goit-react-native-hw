import { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import BGIMG from "../../assets/images/BG.jpg";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isFocusLogin, setIsFocusLogin] = useState(false);
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isFocusPass, setIsFocusPass] = useState(false);
  const [inputValues, setInputValue] = useState(initialState);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const onSubmitForm = () => {
    if (
      inputValues.email === "" ||
      inputValues.password === "" ||
      inputValues.login === ""
    )
      return alert("Заповніть всі поля");

    setInputValue({ ...initialState });
    navigation.navigate("Home");
  };

  return (
    <ImageBackground source={BGIMG} style={styles.background}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-180}
        >
          <View style={styles.form}>
            <View style={styles.photo}>
              <TouchableOpacity activeOpacity={0.7} style={styles.addPhotoBtn}>
                <Text style={styles.addPhotoText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.formInputs}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: isFocusLogin ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusLogin ? "#FFFFFF" : "#F6F6F6",
                  },
                ]}
                placeholder="Логін"
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => setIsFocusLogin(true)}
                onBlur={() => setIsFocusLogin(false)}
                value={inputValues.login}
                onChangeText={(value) =>
                  setInputValue((prevState) => ({ ...prevState, login: value }))
                }
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: isFocusEmail ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusEmail ? "#FFFFFF" : "#F6F6F6",
                  },
                ]}
                placeholder="Адреса електронної пошти"
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => setIsFocusEmail(true)}
                onBlur={() => setIsFocusEmail(false)}
                value={inputValues.email}
                onChangeText={(value) =>
                  setInputValue((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: isFocusPass ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusPass ? "#FFFFFF" : "#F6F6F6",
                  },
                ]}
                placeholder="Пароль"
                placeholderTextColor={"#BDBDBD"}
                secureTextEntry={!isShowPassword}
                onFocus={() => setIsFocusPass(true)}
                onBlur={() => setIsFocusPass(false)}
                value={inputValues.password}
                onChangeText={(value) =>
                  setInputValue((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
                onPress={() => setIsShowPassword((prevState) => !prevState)}
              >
                <Text style={styles.showPassBtn}>
                  {isShowPassword ? "Приховати" : "Показати"}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.submit}
              onPress={onSubmitForm}
            >
              <Text style={styles.textSubmit}>Зареєстуватися</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.textBtn}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    maxHeight: 550,
    marginTop: "auto",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 80,
  },
  photo: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: 120,
    maxHeight: 120,
    marginTop: -60,
    marginBottom: 32,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addPhotoBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    maxHeight: 25,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 12.5,
    backgroundColor: "#FFF",
    marginBottom: 14,
    marginRight: -12,
  },
  addPhotoText: {
    color: "#FF6C00",
    fontSize: 16,
  },
  title: {
    marginBottom: 32,
    fontFamily: "R-Medium",
    fontSize: 30,
    color: "#212121",
  },
  formInputs: {
    position: "relative",
    width: "100%",
    gap: 16,
    marginBottom: 43,
  },
  input: {
    fontFamily: "R-Regular",
    fontSize: 16,
    color: "#212121",
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    height: 50,
  },
  showPassBtn: {
    color: "#1B4371",
    fontFamily: "R-Regular",
    fontSize: 16,
    position: "absolute",
    right: 15,
    bottom: 32,
  },
  submit: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 50,
    width: "100%",
    backgroundColor: "#FF6C00",
    border: 1,
    borderRadius: 100,
    marginBottom: 16,
  },
  textSubmit: {
    color: "#fff",
    fontFamily: "R-Regular",
    fontSize: 16,
  },
  textBtn: {
    color: "#1B4371",
    fontFamily: "R-Regular",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
