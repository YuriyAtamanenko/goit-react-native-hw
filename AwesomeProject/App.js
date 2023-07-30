import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { useFonts } from "expo-font";

// import screens
import Main from "./Screens/Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    "R-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "R-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "R-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
