import { useState } from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView} from "react-native";
import NextButton from "../components/NextButton";

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
			{/* <Text style={styles.myAccountText}>My Account</Text> */}
			<KeyboardAvoidingView style={styles.scrollViewStyle} behavior="padding">
				<ScrollView>
					<View style={styles.inputContainer}>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Name"
								style={styles.inputText}
                editable = {false}
                value = "Olivia"
                />
						</View>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Email"
								style={styles.inputText}
                editable = {false}
                value = "olivia@icloud.com"
							/>
						</View>
						<View style={styles.inputView}>
							<TextInput
								placeholder="Password"
								style={styles.inputText}
								autoCapitalize={false}
								autoCorrect={false}
								onChangeText={handlePasswordChange}
								value={password}
							/>
						</View>
						
						<View style={styles.inputView}>
							<TextInput
								placeholder="Address"
								style={styles.inputText}
								onChangeText={handleAddressChange}
								value={address}
							/>
						</View>
						<View style={styles.inputView}>
							<TextInput
								placeholder="GSTIN (optional)"
								style={styles.inputText}
								autoCapitalize={false}
								autoCorrect={false}
								onChangeText={handleGstinChange}
								value={gstin}
							/>
						</View>
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
	},
	myAccountText: {
		fontSize: 50,
		marginTop: "5%",
		marginLeft: "7%",
		fontFamily: "MontserratSemiBold",
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
		paddingHorizontal: 12,
		paddingVertical: 12,
	},
	submitContainer: {
		marginTop: "10%",
		marginBottom: "15%",
	},
	scrollViewStyle: {
		flex: 1,
		marginVertical: 30,
	},
});

export default MyAccount;
