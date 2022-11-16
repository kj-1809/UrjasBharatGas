import { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
	Alert,
} from "react-native";
import NextButton from "../components/NextButton";
import InputWithText from "../components/InputWithText";
import { signOut } from "firebase/auth";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import LoadingView from "../components/LoadingView";
import { sendPasswordResetEmail } from "firebase/auth";

function MyAccount({ navigation }) {
	const [address, setAddress] = useState("");
	const [gstin, setGstin] = useState("");
	const [phone, setPhone] = useState("");
	const [uploadPending, setUploadPending] = useState(false);
	const [docId, setDocId] = useState();

	const currentUser = auth.currentUser;

	const [userData, setUserData] = useState();

	const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));
	async function getDataFromFirebase(queryData) {
		const querySnapshot = await getDocs(queryData);
		querySnapshot.forEach((doc) => {
			setUserData(doc.data());
			setDocId(doc.id);
			setAddress(doc.data().address);
			setGstin(doc.data().gstin);
			setPhone(doc.data().phone)
		});
	}

	useEffect(() => {
		getDataFromFirebase(q);
	}, []);


	function handleResetPassword() {
		setUploadPending(true)
		sendPasswordResetEmail(auth, currentUser.email)
			.then(() => {
				Alert.alert("Success" , "Password reset email sent successfully !")
				setUploadPending(false)
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				Alert.alert("Error" , errorMessage)
				setUploadPending(false)
			});
	}

	async function handleSubmit() {
		setUploadPending(true);
		// // upload data to firestore
		await updateDoc(doc(db, "users", docId), {
			address: address,
			gstin: gstin,
			phone : phone,
		});
		console.log("Submitted successfully !");
		setUploadPending(false);
		Alert.alert("Success", "Your details were updated successfully");
		navigation.navigate("Homepage");
	}

	function handleSignOut() {
		signOut(auth)
			.then(() => {
				console.log("Sign out successfull");
				Alert.alert("Success", "Logged out successfully");
			})
			.catch((error) => {
				console.log("error", error);
				Alert.alert("error", error);
			});
	}

	if (!userData || uploadPending) {
		return <LoadingView message="loading.." />;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.headingStyle}>My Account</Text>
			<KeyboardAvoidingView style={styles.scrollViewStyle} behavior="padding">
				<ScrollView>
					<View style={styles.inputContainer}>
						<InputWithText
							placeholder={userData && userData.name}
							title="Name"
							editable={false}
						/>
						<InputWithText
							placeholder={userData && userData.email}
							title="Email"
							editable={false}
						/>
						<InputWithText
							placeholder={userData && userData.phone}
							title="Phone"
							onTextChange = {setPhone}
							value = {phone}
						/>
						<InputWithText
							placeholder={userData && userData.address}
							title="Address"
							onTextChange={setAddress}
							value={address}
						/>
						<InputWithText
							placeholder={userData && userData.gstin}
							title="GSTIN"
							onTextChange={setGstin}
							value={gstin}
						/>
					</View>
					<View style={styles.submitContainer}>
						<NextButton onClick={handleSubmit}>Save</NextButton>
					</View>
					<View style={styles.signoutContainer}>
						<NextButton onClick={handleSignOut}>Sign out</NextButton>
					</View>
					<View style={styles.signoutContainer}>
						<NextButton onClick={handleResetPassword} style = {styles.resetPasswordButton}>
							Reset Password
						</NextButton>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
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
		marginTop: "15%",
		// padding : 10
	},
	inputView: {
		height: 50,
		margin: 10,
		borderRadius: 15,
		backgroundColor: "white",
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
	},
	scrollViewStyle: {
		flex: 1,
	},
	signoutContainer: {
		marginTop: "5%",
	}, 
	resetPasswordContainer: {
		marginTop: "5%",
	}, 
	resetPasswordButton : {
		marginHorizontal : "5%",
	}
});

export default MyAccount;
