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

import BGIMG from "../assets/images/BG.jpg";

export default function LoginScreen() {
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isFocusPass, setIsFocusPass] = useState(false);

  return (
    <ImageBackground source={BGIMG} style={styles.background}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-230}
        >
          <View style={styles.form}>
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.formInputs}>
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
                secureTextEntry={true}
                onFocus={() => setIsFocusPass(true)}
                onBlur={() => setIsFocusPass(false)}
              />
              <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
                <Text style={styles.showPassBtn}>Показати</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.submit}>
              <Text style={styles.textSubmit}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
              <Text style={styles.textBtn}>
                Немає акаунту?{" "}
                <Text style={{ textDecorationLine: "underline" }}>
                  Зареєструватися
                </Text>
              </Text>
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
    maxHeight: 490,
    marginTop: "auto",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
    paddingBottom: 80,
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
  },
});
