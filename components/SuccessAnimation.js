import { View, StyleSheet } from "react-native";
import Lottie from "lottie-react-native";

function SuccessAnimation() {
	return (
		<View style={[StyleSheet.absoluteFillObject, styles.container]}>
			<Lottie source={require("../assets/successLottie.json")} autoPlay />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: (0, 0, 0, 0.2),
		zIndex: 1,
	},
});

export default SuccessAnimation;
