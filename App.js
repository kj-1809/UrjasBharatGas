import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";
import Loading from "./components/Loading";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { useState } from "react";
import Homepage from "./screens/Homepage";
// import {registerPending} from "./screens/Register"

export default function App() {
	const [fontsLoaded] = useFonts({
		Montserrat: require("./assets/fonts/Montserrat-Bold.ttf"),
		MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
	});

	const [screen, setScreen] = useState(
		<Login onSignUpPress={handleSignUpPress} />
	);

	function handleLoginPress() {
		setScreen(<Login onSignUpPress={handleSignUpPress} />);
	}
	function handleSignUpPress() {
		console.log("signUP pressed");
		setScreen(<Register onLoginPress={handleLoginPress} />);
	}
	if (!fontsLoaded) {
		return null;
	}
	return (
		<>
			<StatusBar style="dark" />
			{/* {screen} */}
			<Homepage/>
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
