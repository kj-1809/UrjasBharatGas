import { View, Image, StyleSheet } from "react-native";

function SuccessAnimation() {
	return (
		<View style={styles.gifContainer}>
			<Image
				source={require("../assets/success.gif")}
				style={styles.animatedObject}
			/>
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
		justifyContent: "center",
	},
});
