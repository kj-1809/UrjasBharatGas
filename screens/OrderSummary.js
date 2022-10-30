import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TextInput,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import NextButton from "../components/NextButton";
const deviceWidth = Dimensions.get("screen").width;

function OrderSummary(props) {
	return (
		<View style={styles.container}>
			<Text style={styles.headingText}>Order Summary</Text>
			<KeyboardAvoidingView style={styles.scrollViewStyle} behavior="padding">
				<ScrollView>
					<View style={styles.imageWholeContainer}>
						<View style={styles.imageContainer}>
							<Image
								source={require("../assets/images/shoesImg.jpg")}
								style={styles.image}
							/>
						</View>
					</View>
					<View style={styles.detailsContainer}>
						<Text style={styles.priceText}>Rs. 7999</Text>
						<Text style={styles.detailsText}>Vans Shoe UK 10</Text>
					</View>
					<View style={styles.inputWholeContainer}>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.inputStyle}
								placeholder="Quantity"
								keyboardType="number-pad"
							/>
						</View>
					</View>
					<View style={styles.totalContainer}>
						<Text style={styles.totalText}>Quantity : 1</Text>
						<Text style={styles.totalText}>Total : 7999 x 1 = 7999</Text>
					</View>
					<View style={styles.submitContainer}>
						<NextButton style={styles.buttonStyle}>Place Order</NextButton>
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
    marginBottom : 1
	},
	headingText: {
		fontFamily: "MontserratSemiBold",
		fontSize: 35,
		marginTop: "10%",
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
    alignItems : 'center'
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
		marginTop: "5%",
		marginHorizontal: "5%",
	},
	totalText: {
		fontFamily: "MontserratSemiBold",
		fontSize: 16,
		textAlign: "center",
		opacity: 0.5,
	},
	submitContainer: {
		marginTop: "15%",
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