import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";

import Login from "./screens/Login";
import Register from "./screens/Register";

export default function App() {
	const [fontsLoaded] = useFonts({
		Montserrat: require("./assets/fonts/Montserrat-Bold.ttf"),
		MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			<StatusBar style="dark" />
			{/* <Login /> */}
      <Register />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
