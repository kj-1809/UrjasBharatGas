import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
// import AppLoading from "expo-app-loading";
// import Loading from "./components/Loading";
import Login from "./screens/Login";
import Register from "./screens/Register";
import OrderNow from "./screens/OrderNow";
import MyOrders from "./screens/MyOrders";
import MyAccount from "./screens/MyAccount";
import AboutUs from "./screens/AboutUs";
import { useState } from "react";
import Homepage from "./screens/Homepage";
import OrderSummary from "./screens/OrderSummary";
import {
	DefaultTheme,
	NavigationContainer,
	StackActions,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const myTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: 'white',
		primary: "#000000",
	},
};

function AuthenticatedStack() {
	return (
		<NavigationContainer theme={myTheme}>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: "#6CD2D9",
					},
				}}
			>
				<Stack.Screen
					name="Homepage"
					component={Homepage}
					options={{
						title: "",
						headerStyle: {
							backgroundColor: "#6CD2D9",
							borderBottomWidth: 4,
						},
						headerShadowVisible: false,
					}}
				/>
				<Stack.Screen name="OrderNow" component={OrderNow} options={{
					title : "",
					headerStyle : {
						backgroundColor : 'white'
					},
					headerShadowVisible : false
				}}/>
				<Stack.Screen
					name="MyOrders"
					component={MyOrders}
					options={{
						title: "",
						headerStyle: {
							backgroundColor: "white",
						},
						headerShadowVisible : false,
					}}
				/>
				<Stack.Screen
					name="MyAccount"
					component={MyAccount}
					options={{
						title: "",
						headerStyle : {
							backgroundColor : 'white',
						},
						headerShadowVisible : false,
					}}
				/>
				<Stack.Screen name="AboutUs" component={AboutUs} />
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
			{/* <AuthenticatedStack /> */}
			<OrderSummary />
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
