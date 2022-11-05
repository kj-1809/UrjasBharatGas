import { useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
	Alert,
} from "react-native";
import NextButton from "../components/NextButton";
const deviceWidth = Dimensions.get("screen").width;
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import LoadingView from "../components/LoadingView"

function OrderSummary({ navigation, route }) {
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const currentUser = auth.currentUser;

	async function uploadDataToFirebase() {
		const querySnapshot = await getDocs(collection(db, "orders"));
		console.log(querySnapshot.size);

		const docRef = await addDoc(collection(db, "orders"), {
			orderId: querySnapshot.size + 1,
			price: route.params.price,
			productId: route.params.productId,
			productName: route.params.productName,
			quantity: quantity,
			uid: currentUser.uid,
		});
	}

	function handleSubmit() {
		setLoading(true);
		uploadDataToFirebase();
		setLoading(false);
		navigation.navigate("Homepage");
		Alert.alert("Success", "Your order was placed successfully !");
	}

	if (loading) {
		return <LoadingView message="Loading..." />;
	}

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView style={styles.scrollViewStyle} behavior="position">
				<Text style={styles.headingText}>Order Summary</Text>
				<ScrollView>
					<View style={styles.imageWholeContainer}>
						<View style={styles.imageContainer}>
							<Image source={{ uri: route.params.img }} style={styles.image} />
						</View>
					</View>
					<View style={styles.detailsContainer}>
						<Text style={styles.priceText}>Rs. {route.params.price}</Text>
						<Text style={styles.detailsText}>{route.params.productName}</Text>
					</View>
					<View style={styles.inputWholeContainer}>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.inputStyle}
								placeholder="Quantity"
								keyboardType="number-pad"
								onChangeText={setQuantity}
								value={quantity}
							/>
						</View>
					</View>
					<View style={styles.totalContainer}>
						<Text style={styles.totalText}>Quantity : {quantity}</Text>
						<Text style={styles.totalText}>
							Total : {route.params.price} x {quantity} ={" "}
							{route.params.price * quantity}
						</Text>
					</View>
					<View style={styles.submitContainer}>
						<NextButton style={styles.buttonStyle} onClick={handleSubmit}>
							Place Order
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
		marginBottom: 1,
	},
	headingText: {
		fontFamily: "MontserratSemiBold",
		fontSize: 35,
		marginTop: "2%",
		textAlign: "center",
	},
	imageContainer: {
		height: (deviceWidth / 2 - 30) * (4 / 3),
		width: deviceWidth / 2 - 30,
		backgroundColor: "white",
		margin: 10,
		marginTop: "5%",
		borderRadius: 25,
		shadowColor: "#6CD2D9",
		shadowOpacity: 1,
		shadowOffset: { width: 5, height: 5 },
		// alignItems : 'center'
	},
	image: {
		height: (deviceWidth / 2 - 30) * (4 / 3),
		width: deviceWidth / 2 - 30,
		borderRadius: 25,
	},
	priceText: {
		fontFamily: "MontserratSemiBold",
		fontSize: 28,
		textAlign: "center",
	},
	detailsText: {
		fontFamily: "MontserratSemiBold",
		fontSize: 18,
		opacity: 0.5,
		marginTop: "2%",
		textAlign: "center",
		marginHorizontal: "5%",
	},
	inputWholeContainer: {
		alignItems: "center",
	},
	inputContainer: {
		height: 50,
		margin: 10,
		backgroundColor: "white",
		borderRadius: 15,
		justifyContent: "center",
		shadowColor: "black",
		shadowOpacity: 0.4,
		shadowOffset: { width: 5, height: 5 },
		marginTop: "10%",
		width: "50%",
	},
	inputStyle: {
		fontSize: 15,
		fontFamily: "MontserratSemiBold",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 15,
	},
	totalContainer: {
		marginTop: "10%",
		marginHorizontal: "5%",
	},
	totalText: {
		fontFamily: "MontserratSemiBold",
		fontSize: 16,
		textAlign: "center",
		opacity: 0.5,
	},
	submitContainer: {
		marginTop: "10%",
	},
	buttonStyle: {
		marginHorizontal: "20%",
	},
	scrollViewStyle: {
		flex: 1,
	},
	imageWholeContainer: {
		alignItems: "center",
	},
});

export default OrderSummary;
