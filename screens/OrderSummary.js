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
import {
	collection,
	addDoc,
	getDocs,
	serverTimestamp,
	where,
	query,
	updateDoc,
	increment,
	doc,
	writeBatch,
} from "firebase/firestore";
import LoadingView from "../components/LoadingView";
import SuccessAnimation from "../components/SuccessAnimation";
import axios from "axios";

function OrderSummary({ navigation, route }) {
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const currentUser = auth.currentUser;
	const [animate, setAnimate] = useState(false);
	const [additionalDiscount, setAdditionalDiscount] = useState(0);
	const [userData, setUserData] = useState({});
	const [fetchingData, setFetchingData] = useState(false);
	const [userPhoneNumber, setUserPhoneNumber] = useState("");
	async function getUserData() {
		console.log("uid", currentUser.uid);
		setFetchingData(true);
		const q = query(
			collection(db, "users"),
			where("uid", "==", currentUser.uid)
		);
		const querySnapshot = await getDocs(q);
		let temp = {};
		querySnapshot.forEach((doc) => {
			temp = doc.data();
			console.log(doc.data());
		});
		setUserData(temp);
		setFetchingData(false);
	}

	async function fetchCurrentOrderNumber() {
		const fetchPromise = new Promise(async (resolve, reject) => {
			const querySnapshot = await getDocs(collection(db, "ordernumber"));
			querySnapshot.forEach((doc) => {
				if (doc.data().curnum) {
					resolve(doc.data().curnum);
				} else {
					reject(0);
				}
			});
		});

		// maybe implement try-catch here
		const curOrderNum = await fetchPromise;
		console.log(curOrderNum, "curOrderNum");

		return curOrderNum;
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
		console.log("im here")

		const curOrderNumber = await fetchCurrentOrderNumber();
		const batch = writeBatch(db);
		const uuid  = uuidv4()

		const orderRef = doc(db, "orders", uuid);
		batch.set(orderRef, {
			orderId: curOrderNumber,
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

		const updateOrderRef = doc(db, "ordernumber", "ie2fi9ZeUWWxhSQi4ssO");
		batch.update(updateOrderRef, {
			curnum: increment(1),
		});

		try{
			await batch.commit()
		}catch(err){
			console.log("Error inside")
			throw Error(err)
		}
	}

	function handleSubmit() {
		if (quantity <= 0) {
			Alert.alert("Invalid Quantity !", "Minimum quantity is 1.");
			return;
		}

		setLoading(true);
		uploadDataToFirebase()
			.then((res) => {
				setLoading(false);
				setAnimate(true);
				setTimeout(() => {
					setAnimate(false);
					navigation.navigate("Homepage");
				}, 2500);

				const options = {
					method: "POST",
					url: `https://urja-proxy-api-production.up.railway.app/api/send`,
					params: {
						phone: userPhoneNumber,
						order_number:10, 
						item_name: route.params.productName,
						quantity: quantity,
						price:
							Number(route.params.price) -
							Number(route.params.discount) -
							Number(additionalDiscount),
						type: "orderplaced",
					},
				};
				axios
					.request(options)
					.then(function (response) {
						console.log("Status : ", response.status);
						console.log("Message sent from the server!");
					})
					.catch(function (error) {
						console.error(error);
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
		// alignItems : 'center'
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
