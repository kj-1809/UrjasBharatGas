import { View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "../components/CustomButton";

function Homepage({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image
					source={require("../assets/images/urjalogo.png")}
					style={styles.imgStyle}
				/>
				<Text style={styles.welcomeText}>Welcome, Olivia</Text>
			</View>

			<View style={styles.buttonContainer}>
				<View style={styles.buttonHorizontalContainer}>
					<CustomButton
						style={{ backgroundColor: "#FDFDBD" }}
						onClick={() => {
							navigation.navigate("OrderNow");
						}}
					>
						ORDER NOW
					</CustomButton>
					<CustomButton
						style={{ backgroundColor: "#B8E8FC" }}
						onClick={() => {
							navigation.navigate("MyOrders");
						}}
					>
						MY ORDERS
					</CustomButton>
				</View>
				<View style={styles.buttonHorizontalContainer}>
					<CustomButton style={{ backgroundColor: "#C8FFD4" }} onClick = {()=>{
            navigation.navigate("MyAccount")
          }}>
						MY ACCOUNT
					</CustomButton>
					<CustomButton style={{ backgroundColor: "#BCCEF8" }} onClick = {()=>{
            navigation.navigate("AboutUs")
          }}>
						ABOUT US
					</CustomButton>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		width: "100%",
		height: "35%",
		backgroundColor: "#6CD2D9",
		alignItems: "center",
		justifyContent: "center",
	},
	imgStyle: {
		height: 100,
		width: 100,
		borderRadius: 50,
	},
	welcomeText: {
		marginTop: "5%",
		fontFamily: "MontserratSemiBold",
		fontSize: 20,
	},
	buttonContainer: {
		flex: 1,
		alignItems: "center",
		// justifyContent : 'center',
		marginTop: "5%",
	},
	buttonHorizontalContainer: {
		flexDirection: "row",
		marginVertical: "3%",
	},
});
export default Homepage;