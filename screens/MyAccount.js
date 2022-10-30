import { useState } from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView} from "react-native";
import NextButton from "../components/NextButton";
import InputWithText from "../components/InputWithText"

function MyAccount() {
  const [password , setPassword] = useState('Password')
  const [address, setAddress] = useState("");
	const [gstin, setGstin] = useState("");

  function handlePasswordChange(text){
    setPassword(text);
  }
  function handleAddressChange(text) {
		setAddress(text);
	}
  function handleGstinChange(text) {
		setGstin(text);
	}

  function handleSubmit(){
    console.log("Submitted successfully !")
  }



	return (
		<View style={styles.container}>
			<Text style={styles.headingStyle}>My Account</Text>
			<KeyboardAvoidingView style={styles.scrollViewStyle} behavior="padding">
				<ScrollView>
					<View style={styles.inputContainer}>

						<InputWithText value = "Olivia" title = "Name"/>
						<InputWithText value = "olivia@icloud.com" title = "Email"/>
						<InputWithText value = "somerandompass" title = "Password"/>
						<InputWithText value = "Pine View Street , 7th Ave" title = "Address"/>
						<InputWithText value = "P1ACXCR7266L" title = "GSTIN"/>
						
					</View>
					<View style={styles.submitContainer}>
						<NextButton onClick={handleSubmit}>Submit</NextButton>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems : 'center'
	},
	headingStyle: {
		fontSize: 50,
		marginTop: "5%",
		fontFamily: "MontserratSemiBold",
	},
	inputContainer: {
		// backgroundColor: "green",
		// marginTop: "20%",
		marginHorizontal: "3%",
		marginTop : "15%"
		// padding : 10
	},
	inputView: {
		height: 50,
		margin: 10,
		borderRadius: 15,
		backgroundColor : 'white',
		justifyContent: "center",
		shadowColor: "black",
		shadowOpacity: 0.4,
		shadowOffset: { width: 5, height: 5 },
	},
	inputText: {
		fontSize: 15,
		fontFamily: "MontserratSemiBold",
		// backgroundColor : "#F6F6C9",
		paddingHorizontal: 12,
		paddingVertical: 12,
	},
	submitContainer: {
		marginTop: "10%",
		marginBottom: "15%",
	},
	scrollViewStyle: {
		flex: 1,
	},
});

export default MyAccount;
