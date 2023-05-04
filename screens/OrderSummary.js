import { useEffect, useState } from "react";
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
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as Haptics from 'expo-haptics';

import {
	increment,
	collection,
	getDocs,
	serverTimestamp,
	where,
	query,
	doc,
	runTransaction
} from "firebase/firestore";
import LoadingView from "../components/LoadingView";
import SuccessAnimation from "../components/SuccessAnimation";
import axios from "axios";

function OrderSummary({ navigation, route }) {
	const [loading, setLoading] = useState(false);
	const currentUser = auth.currentUser;
	const [animate, setAnimate] = useState(false);
	const [additionalDiscount, setAdditionalDiscount] = useState(0);
	const [userData, setUserData] = useState({});
	const [fetchingData, setFetchingData] = useState(false);
	const [userPhoneNumber, setUserPhoneNumber] = useState("");
	const [quantity, setQuantity] = useState(1);
	async function getUserData() {
		setFetchingData(true);
		const q = query(
			collection(db, "users"),
			where("uid", "==", currentUser.uid)
		);
		const querySnapshot = await getDocs(q);
		let temp = {};
		querySnapshot.forEach((doc) => {
			temp = doc.data();
		});
		setUserData(temp);
		setFetchingData(false);
	}

	useEffect(() => {
		getUserData();
	}, []);

	useEffect(() => {
		if (route.params.productId == 1) {
			setAdditionalDiscount(Number(userData.disc5));
		} else if (route.params.productId == 2) {
			setAdditionalDiscount(Number(userData.disc19));
		} else if (route.params.productId == 3) {
			setAdditionalDiscount(Number(userData.disc47));
		} else if (route.params.productId == 4) {
			setAdditionalDiscount(Number(userData.disc430));
		} else {
			setAdditionalDiscount(0);
		}
		setUserPhoneNumber(userData.phone);
	}, [userData]);

	async function uploadDataToFirebase() {
		const uuid  = uuidv4()
		const orderRef = doc(db, "orders", uuid);
		const orderNumberRef = doc(db, "ordernumber", "ie2fi9ZeUWWxhSQi4ssO");
		try{
			await runTransaction(db , async (transaction) => {
				const orderNumberDoc = await transaction.get(orderNumberRef);
				if(!orderNumberDoc.exists()){
					throw "Document does not exist"
				}
				
				const orderNumber = Number(orderNumberDoc.data().curnum);
				console.log("Order Number from transaction : " , orderNumber);

				transaction.set(orderRef, {
					orderId: Number(orderNumber),
					price:
						Number(route.params.price) -
						Number(route.params.discount) -
						Number(additionalDiscount),
					productId: route.params.productId,
					productName: route.params.productName,
					quantity: quantity,
					uid: currentUser.uid,
					orderStatus: "Pending",
					createdAt: serverTimestamp(),
				});

				transaction.update(orderNumberRef, {
					curnum: increment(1)
				});
			});
		}catch(err){
			throw Error(err)
		}	
	}

	function handleSubmit() {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		if (quantity <= 0) {
			Alert.alert("Invalid Quantity !", "Minimum quantity is 1.");
			return;
		}

		setLoading(true);
		uploadDataToFirebase()
			.then(async (res) => {
				setLoading(false);
				setAnimate(true);
				// haptic feedback
				Haptics.notificationAsync()
				setTimeout(() => {
					setAnimate(false);
					navigation.navigate("Homepage");
				}, 2500);

				const options = {
					method: "POST",
					url: "https://urjas-bharat-gas-api.cyclic.app/api/send",
					params: {
						phone: userPhoneNumber,
						item_name: route.params.productName,
						price:
							Number(route.params.price) -
							Number(route.params.discount) -
							Number(additionalDiscount),
						type: "orderplaced",
					},
				};
				axios
					.request(options)
					.then((response) => {
						console.log("Status : ", response.status);
					})
					.catch((error) => {
						console.log(error)
					});
			})
			.catch((error) => {
				setLoading(false);
				console.log("error:: " , error)
				Alert.alert("Error", "Please try again in some time!");
			});
	}

	if (fetchingData) {
		return <LoadingView message="Loading..." />;
	}
	if (animate) {
		return <SuccessAnimation />;
	}
	if (loading) {
		return <LoadingView message="Placing Order..." />;
	}

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView style={styles.scrollViewStyle} behavior="position">
				<Text style={styles.headingText}>Order Summary</Text>
				<ScrollView>
					<View style={styles.imageWholeContainer}>
						<View style={styles.imageContainer}>
							{route.params.img ? (
								<Image
									source={{ uri: route.params.img }}
									style={styles.image}
								/>
							) : null}
						</View>
					</View>
					<View style={styles.detailsContainer}>
						<Text style={styles.priceText}>
							Rs.{" "}
							{route.params.price - route.params.discount - additionalDiscount}
						</Text>
						<Text style = {styles.detailsText2}>(inc. GST + Delivery)</Text>
						<Text style={styles.detailsText}>{route.params.productName}</Text>
					</View>
					<View style={styles.inputWholeContainer}>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.inputStyle}
								placeholder="Quantity"
								keyboardType="number-pad"
								onChangeText={setQuantity}
								value = {quantity}
								returnKeyType = {'done'}
							/>
						</View>
					</View>
					<View style={styles.totalContainer}>
						<Text style={styles.totalText}>Quantity : {quantity}</Text>
						<Text style={styles.totalText}>
							Total :{" "}
							{Number(route.params.price) -
								Number(route.params.discount) -
								Number(additionalDiscount)}{" "}
							{""}x {quantity} = {""}
							{(Number(route.params.price) -
								Number(route.params.discount) -
								Number(additionalDiscount)) *
								quantity}
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
	},
	image: {
		height: (deviceWidth / 2 - 30) * (4 / 3),
		width: deviceWidth / 2 - 30,
		borderRadius: 25,
	},
	priceText: {
		marginTop: 20,
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
	detailsText2 : {
		fontFamily: "MontserratSemiBold",
		fontSize: 12,
		opacity: 0.4,
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
		shadowColor: "#6CD2D9",
		shadowOpacity: 0.4,
		elevation: 10,
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
		paddingBottom : "7%"
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
