import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import Login from "./screens/Login";
import Register from "./screens/Register";
import OrderNow from "./screens/OrderNow";
import MyOrders from "./screens/MyOrders";
import MyAccount from "./screens/MyAccount";
import AboutUs from "./screens/AboutUs";
import { useState, useEffect } from "react";
import Homepage from "./screens/Homepage";
import OrderSummary from "./screens/OrderSummary";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

const myTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "white",
		primary: "#6CD2D9",
	},
};

function AuthenticatedStack() {
	return (
		<NavigationContainer theme={myTheme}>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: "white",
					},
					headerShadowVisible: false,
				}}
			>
				<Stack.Screen
					name="Homepage"
					component={Homepage}
					options={{
						title: "",
						headerStyle: {
							backgroundColor: "#6CD2D9",
						},
					}}
				/>
				<Stack.Screen
					name="OrderNow"
					component={OrderNow}
					options={{
						title: "",
					}}
				/>
				<Stack.Screen
					name="MyOrders"
					component={MyOrders}
					options={{
						title: "",
					}}
				/>
				<Stack.Screen
					name="MyAccount"
					component={MyAccount}
					options={{
						title: "",
					}}
				/>
				<Stack.Screen
					name="AboutUs"
					component={AboutUs}
					options={{
						title: "",
					}}
				/>
				<Stack.Screen
					name="OrderSummary"
					component={OrderSummary}
					options={{
						title: "",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default function App() {
	const [fontsLoaded] = useFonts({
		Montserrat: require("./assets/fonts/Montserrat-Bold.ttf"),
		MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
	});

	const [screen, setScreen] = useState(
		<Login onSignUpPress={handleSignUpPress} onSuccess={handleAuthSuccess} />
	);

	function handleAuthSuccess() {
		setScreen(<AuthenticatedStack />);
	}
	function handleLoginPress() {
		setScreen(
			<Login onSignUpPress={handleSignUpPress} onSuccess={handleAuthSuccess} />
		);
	}
	function handleSignUpPress() {
		setScreen(
			<Register onLoginPress={handleLoginPress} onSuccess={handleAuthSuccess} />
		);
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				setScreen(
					<Login
						onSignUpPress={handleSignUpPress}
						onSuccess={handleAuthSuccess}
					/>
				);
			}
		});
	}, []);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			<StatusBar style="dark" />
			{screen}
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
