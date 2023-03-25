import { View, Text, StyleSheet } from "react-native";
import NextButton from "./NextButton";

function ListItem(props) {
	return (
		<View style={styles.container}>
			<View style={styles.itemContainer}>
				<View>
					<Text style={styles.textStyle}>Date</Text>
					<Text style={styles.textStyle}>Order ID</Text>
					<Text style={styles.textStyle}>Item Name</Text>
					<Text style={styles.textStyle}>Price</Text>
					<Text style={styles.textStyle}>Quantity</Text>
					<Text style={styles.textStyle}>Total</Text>
					<Text style={styles.textStyle}>Status</Text>
				</View>
				<View style={styles.valueContainer}>
					<Text style={styles.textStyle}>: {props.createdAt}</Text>
					<Text style={styles.textStyle}>: {props.orderId}</Text>
					<Text style={styles.textStyle}>: {props.itemName}</Text>
					<Text style={styles.textStyle}>: {props.price}</Text>
					<Text style={styles.textStyle}>: {props.quantity}</Text>
					<Text style={styles.textStyle}>: {props.quantity * props.price}</Text>
					<Text style={styles.textStyle}>: {props.orderStatus}</Text>
				</View>
			</View>
			{props.orderStatus === "Pending" && (
				<View style={styles.buttonContainer}>
					<NextButton onClick={props.onCancel} style={styles.cancelButton}>
						Cancel
					</NextButton>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		backgroundColor: "white",
		// alignItems : "center",
		justifyContent: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 25,
		margin: 10,
		shadowColor: "#6CD2D9",
		shadowOpacity: 1,
		elevation: 5,
	},
	buttonContainer: {
		marginTop: 10,
	},
	cancelButton: {
		marginHorizontal: "3%",
	},
	itemContainer: {
		flexDirection: "row",
	},
	textStyle: {
		fontFamily: "MontserratSemiBold",
		fontSize: 15,
	},
	valueContainer: {
		marginLeft: "10%",
	},
});

export default ListItem;
