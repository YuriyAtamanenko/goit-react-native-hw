import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import RegistrationScreen from "./auth/RegistrationScreen";
import LoginScreen from "./auth/LoginScreen";
import Home from "./Home";

import { authStateChanged } from "./../redux/auth/authOperation";

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const useRoute = (isAuth) => {
  if (isAuth) {
    return (
      <MainStack.Navigator style={styles.container}>
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      </MainStack.Navigator>
    );
  } else {
    return (
      <AuthStack.Navigator style={styles.container}>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
};

export default function Main() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const routing = useRoute(isLoggedIn);

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoutBtn: {
    marginRight: 16,
  },
});
