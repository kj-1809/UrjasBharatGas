import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	Pressable,
	KeyboardAvoidingView,
	ScrollView,
	Alert
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextButton from "../components/NextButton";
import { useState } from "react";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleEmailChange(text) {
		setEmail(text);
	}
	function handlePasswordChange(text) {
		setPassword(text);
	}

	function handleSubmit() {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log("User logged in successfully");
				console.log(user.email);
				console.log(user.uid);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
				Alert.alert("Error" , errorMessage);
			});
	}

	return (
		<View style={styles.container}>
			<View style={styles.backgroundContainer}>
				<Image
					source={require("../assets/images/Base.png")}
					style={styles.image}
				/>
			</View>
			<Text style={styles.loginText}>Login</Text>
			<Text style={styles.loginText2}>Please sign in to continue</Text>
			<KeyboardAvoidingView
				style={styles.scrollViewStyle}
				behavior="padding"
			>
				<ScrollView>
					<View style={styles.inputContainer}>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Email"
								style={styles.inputText}
								autoCapitalize={false}
								autoCorrect={false}
								onChangeText={handleEmailChange}
								value={email}
							/>
						</View>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Password"
								style={styles.inputText}
								secureTextEntry={true}
								autoCapitalize={false}
								autoCorrect={false}
								onChangeText={handlePasswordChange}
								value={password}
							/>
						</View>
					</View>

					<View style={styles.submitContainer}>
						<NextButton onClick={handleSubmit}>Submit</NextButton>
					</View>

					<View style={styles.signUpTextContainer}>
						<Pressable onPress = {props.onSignUpPress}>
							<Text style={styles.signUpText}>
								Don't have an account? Register
							</Text>
						</Pressable>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loginText: {
		fontSize: 50,
		marginTop: "45%",
		marginLeft: "7%",
		fontFamily: "MontserratSemiBold",
	},
	loginText2: {
		fontSize: 18,
		marginLeft: "7%",
		marginTop: 8,
		fontFamily: "MontserratSemiBold",
		opacity: 0.5,
	},
	inputContainer: {
		// backgroundColor: "green",
		marginTop: "20%",
		marginHorizontal: "3%",
		// padding : 10
	},
	inputView: {
		height: 50,
		margin: 10,
		backgroundColor: "white",
		padding: 10,
		borderRadius: 15,
		justifyContent: "center",
		shadowColor: "black",
		shadowOpacity: 0.4,
		shadowOffset: { width: 5, height: 5 },
	},
	inputText: {
		fontSize: 15,
		fontFamily: "MontserratSemiBold",
	},
	backgroundContainer: {
		position: "absolute",
		top: 0,
		left: 0,
	},
	image: {
		//check if this works normally
		flex: 1,
	},
	submitContainer: {
		marginTop: "10%",
	},
	signUpTextContainer: {
		marginTop : "20%"
	},
	signUpText: {
		fontFamily: "Montserrat",
		color: "black",
		textAlign: "center",
		opacity: 0.5,
	},
	scrollViewStyle: {
		flex: 1,
		// backgroundColor : 'blue'
	},
});

export default Login;
