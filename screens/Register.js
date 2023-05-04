import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
	Pressable,
	Alert,
} from "react-native";
import NextButton from "../components/NextButton";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import LoadingView from "../components/LoadingView";
import * as Haptics from "expo-haptics";

function Register(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [gstin, setGstin] = useState("");
	const [registerPending, setRegisterPending] = useState(false);
	const [phone, setPhone] = useState("");

	function handleSubmit() {
		//Create a new user
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		if (name.length == 0) {
			Alert.alert("Please enter a name!");
			return;
		}
		if (!email.includes("@") || email.length < 6) {
			Alert.alert("Invalid Email", "Please enter a valid email !");
			return;
		}
		if (phone.length != 10) {
			Alert.alert(
				"Invalid Phone number",
				"Please enter a valid phone number !"
			);
			return;
		}
		if (address.length == 0) {
			Alert.alert("Invalid Address", "Please enter the address !");
			return;
		}
		if (password.length < 6) {
			Alert.alert(
				"Invalid Password",
				"Password length should be greater than 6 !"
			);
			return;
		}
		if (password != confirmPassword) {
			Alert.alert("Invalid Password", "Password do not match !");
			return;
		}
		setRegisterPending(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// add all of the data to users collection in firestore
				uploadUserData(user.uid);
				// navigate to homescreen
				setRegisterPending(false);
				props.onSuccess();
			})
			.catch((error) => {
				console.log(error.message);
				setRegisterPending(false);
				Alert.alert("Error", error.message);
			});
	}

	if (registerPending) {
		return <LoadingView message="Registering User" />;
	}

	async function uploadUserData(uid) {
		try {
			const docRef = await addDoc(collection(db, "users"), {
				uid: uid,
				name: name,
				address: address,
				gstin: gstin,
				disc5: Number(0),
				disc19: Number(0),
				disc47: Number(0),
				disc430: Number(0),
				email: email,
				phone: phone,
				isAdmin: false,
			});
		} catch (e) {
			console.error("Error adding document: ", e);
			// maybe if the data wasnt stored on the database , then delete the created user
			// and display error
		}
	}


	return (
		<View style={styles.container}>
			<View style={styles.backgroundContainer}>
				<Image
					source={require("../assets/images/Base.png")}
					style={styles.image}
				/>
			</View>
			<Text style={styles.loginText}>Register</Text>
			<Text style={styles.loginText2}>Please sign up to continue</Text>

			<KeyboardAvoidingView
				style={styles.scrollViewStyle}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView>
					<View style={styles.inputContainer}>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Name"
								style={styles.inputText}
								value={name}
								onChangeText={setName}
							/>
						</View>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Email"
								style={styles.inputText}
								autoCapitalize= "none"
								autoCorrect= {false}
								onChangeText={setEmail}
								value={email}
								keyboardType = "email-address"
							/>
						</View>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Password"
								style={styles.inputText}
								secureTextEntry={true}
								autoCapitalize= "none"
								autoCorrect= {false}
								onChangeText={setPassword}
								value={password}
							/>
						</View>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Confirm Password"
								style={styles.inputText}
								secureTextEntry={true}
								autoCapitalize="none"
								autoCorrect= {false}
								onChangeText={setConfirmPassword}
								value={confirmPassword}
							/>
						</View>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Phone (10 digit)"
								style={styles.inputText}
								onChangeText={setPhone}
								value={phone}
								keyboardType="number-pad"
								maxLength={10}
							/>
						</View>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Address"
								style={styles.inputText}
								onChangeText={setAddress}
								value={address}
							/>
						</View>
						<View style={styles.inputView}>
							<TextInput
								placeholder="GSTIN (optional)"
								style={styles.inputText}
								autoCapitalize= "characters"
								autoCorrect= {false}
								onChangeText={setGstin}
								value={gstin}
							/>
						</View>
					</View>
					<View style={styles.submitContainer}>
						<NextButton onClick={handleSubmit}>Register</NextButton>
					</View>
					<View style={styles.signUpTextContainer}>
						<Pressable onPress={props.onLoginPress}>
							<Text style={styles.signUpText}>
								Already have an account? Login
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
		backgroundColor: "#ffffff",
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
		marginHorizontal: "3%",
	},
	inputView: {
		height: 50,
		margin: 10,
		backgroundColor: "white",
		borderRadius: 15,
		justifyContent: "center",
		shadowColor: "#6CD2D9",
		shadowOpacity: 0.4,
		shadowOffset: { width: 5, height: 5 },
		elevation: 8,
		padding: 10,
	},
	inputText: {
		fontSize: 15,
		fontFamily: "MontserratSemiBold",
		height: 50,
		borderRadius: 15,
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
		marginBottom: "15%",
	},
	signUpTextContainer: {
		position: "absolute",
		bottom: 10,
		left: 1,
		right: 1,
		padding: 5,
		marginHorizontal: 20,
	},
	signUpText: {
		fontFamily: "Montserrat",
		color: "black",
		textAlign: "center",
		opacity: 0.5,
	},
	scrollViewStyle: {
		flex: 1,
		marginVertical: 30,
	},
});

export default Register;
