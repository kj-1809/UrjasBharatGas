import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";


import NextButton from "../components/NextButton";

function Login() {
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
			<View style={styles.inputContainer}>
				<View style={styles.emailView}>
					<TextInput placeholder="email" style={styles.inputText} />
				</View>
				<View style={styles.passwordView}>
					<TextInput placeholder="password" style={styles.inputText} />
				</View>
			</View>
			

			<View style = {styles.submitContainer}>
				<NextButton>Submit</NextButton>
			</View>

			<View style = {styles.signUpTextContainer}>
				<Text style = {styles.signUpText}>Don't have an account? Register</Text>
			</View>

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
	emailView: {
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
	passwordView: {
		height: 50,
		backgroundColor: "white",
		padding: 10,
		borderRadius: 15,
		margin: 10,
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
	submitContainer : {
		marginTop : '10%'
	},
	signUpTextContainer : {
		position : 'absolute',
		marginTop : '10%',
		bottom : 10,
		left : 1,
		right : 1
		
	},
	signUpText : {
		fontFamily : 'Montserrat',
		color : 'black',
		textAlign : 'center',
		opacity : 0.5

	},
});

export default Login;
