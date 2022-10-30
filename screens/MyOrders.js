import { Text, View, StyleSheet, FlatList } from "react-native";
import ListItem from "../components/ListItem"; 
const OrdersList = [
	{
		orderId: 1,
		itemName: "19KG Cylinder",
		price: 2000,
		quantity: 12,
	},
	{
		orderId: 2,
		itemName: "19KG Cylinder",
		price: 2000,
		quantity: 11,
	},
	{
		orderId: 3,
		itemName: "19KG Cylinder",
		price: 2000,
		quantity: 112,
	},
	{
		orderId: 4,
		itemName: "19KG Cylinder",
		price: 2000,
		quantity: 2,
	},
	{
		orderId: 5,
		itemName: "47Kg Cyclinder",
		price: 5000,
		quantity: 12,
	},
	{
		orderId: 6,
		itemName: "19KG Cylinder",
		price: 2000,
		quantity: 1,
	},
];

function MyOrders() {
	return (
		<View style={styles.container}>
			<Text style={styles.headingStyle}>My Orders</Text>
			<View style={styles.listContainer}>
				<FlatList
					data={OrdersList}
					renderItem={({ item }) => {
						return (
							<ListItem
								orderId={item.orderId}
								itemName={item.itemName}
								price={item.price}
								quantity={item.quantity}
							/>
						);
					}}
					keyExtractor={(item) => item.orderId}
					style={styles.flatListStyle}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		marginHorizontal: "3%",
	},
	headingStyle: {
		fontFamily: "MontserratSemiBold",
		fontSize: 50,
		marginTop: "5%",
	},
	listContainer: {
		flex: 1,
		width: "100%",
		marginTop: "15%",
	},
});

export default MyOrders;
