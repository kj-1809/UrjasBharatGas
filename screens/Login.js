import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	Pressable,
	KeyboardAvoidingView,
	ScrollView,
	Alert,
} from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextButton from "../components/NextButton";
import { useEffect, useState } from "react";
import LoadingView from "../components/LoadingView";
import * as Haptics from 'expo-haptics';
import { onAuthStateChanged } from "firebase/auth/react-native";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [fetchingUser , setFetchingUser] = useState(true);

	function handleSubmit() {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
		if(!email.includes('@') || email.length < 6){
			Alert.alert("Invalid Email" , "Please enter a valid email !")
			return;
		}
		if(password.length < 6){
			Alert.alert("Invalid Password" , "Min. Length for password is 6 characters !")
			return;
		}
		setLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log("User logged in successfully");
				console.log(user.email);
				console.log(user.uid);
				setLoading(false);
				//navigate to homepage
				props.onSuccess();
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
				Alert.alert("Error", errorMessage);
				setLoading(false);
			});
	}

	
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				console.log(user);
				props.onSuccess();
				setFetchingUser(false)
				// setScreen(<AuthenticatedStack />);
			} else {
				// not logged in
				console.log("Not logged in ! ");
				setFetchingUser(false)
			}
		});
	} , [])
	
	if (loading) {
		return <LoadingView message="Loggin you in ...." />;
	}
	if(fetchingUser){
		return null;
	}

	
	return (
		<View style={styles.container}>
			{console.log("in render")}
			<View style={styles.backgroundContainer}>
				<Image
					source={require("../assets/images/Base.png")}
					style={styles.image}
				/>
			</View>
			<Text style={styles.loginText}>Login</Text>
			<Text style={styles.loginText2}>Please sign in to continue</Text>
			<KeyboardAvoidingView style={styles.scrollViewStyle} behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<ScrollView>
					<View style={styles.inputContainer}>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Email"
								style={styles.inputText}
								autoCapitalize={false}
								autoCorrect={false}
								onChangeText={setEmail}
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
								onChangeText={setPassword}
								value={password}
							/>
						</View>
					</View>

					<View style={styles.submitContainer}>
						<NextButton onClick={handleSubmit}>Submit</NextButton>
					</View>

					<View style={styles.signUpTextContainer}>
						<Pressable onPress={props.onSignUpPress}>
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
		marginTop: "20%",
		marginHorizontal: "3%",
	},
	inputView: {
		height: 50,
		margin: 10,
		backgroundColor: "white",
		padding: 10,
		borderRadius: 15,
		justifyContent: "center",
		shadowColor: "#6CD2D9",
		shadowOpacity: 0.4,
		shadowOffset: { width: 5, height: 5 },
		elevation : 20
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
		flex: 1,
	},
	submitContainer: {
		marginTop: "10%",
	},
	signUpTextContainer: {
		marginTop: "20%",
	},
	signUpText: {
		fontFamily: "Montserrat",
		color: "black",
		textAlign: "center",
		opacity: 0.5,
	},
	scrollViewStyle: {
		flex: 1,
	},
});

export default Login;
