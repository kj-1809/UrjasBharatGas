import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
	Pressable,
	Alert
} from "react-native";
import NextButton from "../components/NextButton";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import LoadingView from "../components/LoadingView"


function Register(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [gstin, setGstin] = useState("");
	const [registerPending , setRegisterPending] = useState(false);
	
	function handleSubmit() {
		//Create a new user
		setRegisterPending(true);
		if(password != confirmPassword){
			Alert.alert("Error" , "Password do not match !")
			setRegisterPending(false)
			return
		}
		if(password.length < 6){
			Alert.alert("Error" , "Password length should be greater than 6 !")
			setRegisterPending(false)
			return
		}
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log("User Created successfully");
				console.log("User id : ", user.uid);
				// add all of the data to users collection in firestore
				uploadUserData(user.uid);
				// navigate to homescreen
				setRegisterPending(false);
				props.onSuccess()
			})
			.catch((error) => {
				console.log(error.code);
				console.log(error.message);
				setRegisterPending(false);
				Alert.alert("Error" , error.message);
			});
	}

	if(registerPending){
		return <LoadingView message = "Registering User"/>
	}

	async function uploadUserData(uid) {
		try {
			const docRef = await addDoc(collection(db, "users"), {
				uid: uid,
				name: name,
				address: address,
				gstin: gstin,
				disc5: 0,
				disc19: 0,
				disc47: 0,
				disc430: 0,
				email : email,
			});
			console.log("Document written with ID: ", docRef.id);
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
				behavior="padding"
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
						<View style={styles.inputView}>
							<TextInput
								placeholder="Confirm Password"
								style={styles.inputText}
								secureTextEntry={true}
								autoCapitalize={false}
								autoCorrect={false}
								onChangeText={setConfirmPassword}
								value={confirmPassword}
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
								autoCapitalize={false}
								autoCorrect={false}
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
		// marginTop: "20%",
		marginHorizontal: "3%",
		// padding : 10
	},
	inputView: {
		height: 50,
		margin: 10,
		backgroundColor: "white",
		borderRadius: 15,
		justifyContent: "center",
		shadowColor: "black",
		shadowOpacity: 0.4,
		shadowOffset: { width: 5, height: 5 },
	},
	inputText: {
		fontSize: 15,
		fontFamily: "MontserratSemiBold",
		// backgroundColor : "#F6F6C9",
		paddingHorizontal : 12,
		paddingVertical : 12
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
		marginBottom: "15%",
	},
	signUpTextContainer: {
		position: "absolute",
		bottom: 10,
		left: 1,
		right: 1,
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
