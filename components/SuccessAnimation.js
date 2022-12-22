import { View, Image, StyleSheet, Text } from "react-native";

function SuccessAnimation() {
	return (
		<View style = {styles.container}>
			<View style={styles.gifContainer}>
				<Image
					source={require("../assets/success.gif")}
					style={styles.animatedObject}
				/>
				<Text style={styles.successText}>Order Placed!</Text>
			</View>
		</View>
	);
}

export default SuccessAnimation;

const styles = StyleSheet.create({
	animatedObject: {
		width: 200,
		height: 200,
	},
	gifContainer: {
		flex: 1,
		alignItems: "center",
		// justifyContent: "center",
		marginTop : "40%"
	},
	successText: {
		marginTop : 5,
		fontSize: 20,
		fontFamily: "MontserratSemiBold",
		backgroundColor : 'white',
	},
	container : {
		// backgroundColor : 'cyan',
		flex : 1,
		alignItems : 'center',
		justifyContent : 'center'
	}

});
