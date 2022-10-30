import { View, Text, Pressable, StyleSheet } from "react-native";

function NextButton({ children, onClick , style }) {
	return (
		<View style={[styles.buttonContainer , style]}>
			<Pressable style={styles.buttonPressable} onPress={onClick}>
				<Text style={styles.innerText}>{children}</Text>
			</Pressable>
		</View>
	);
}

export default NextButton;

const styles = StyleSheet.create({
	buttonContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: "30%",
		margin: 5,
	},
	innerText: {
		fontFamily: "Montserrat",
		fontSize: 18,
	},
	buttonPressable: {
		// backgroundColor: "blue",
		backgroundColor: "#6CD2D9",
		paddingVertical: 12,
		paddingHorizontal: 30,
		// elevation : 2
		borderRadius: 35,
	},
});
