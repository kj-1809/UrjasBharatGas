import { Text, View, StyleSheet, FlatList } from "react-native";
import ListItem from "../components/ListItem";

import {
	collection,
	query,
	where,
	getDocs,
	doc,
	limit,
	orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useState, useEffect } from "react";
import LoadingView from "../components/LoadingView";
import Loading from "../components/Loading";

function MyOrders() {
	const [orders, setOrders] = useState([]);
	const currentUser = auth.currentUser;
	console.log(currentUser.uid);

	const q = query(
		collection(db, "orders"),
		where("uid", "==", currentUser.uid),
		orderBy("orderId", "desc")
	);

	async function getDataFromFirebase(queryData) {
		const querySnapshot = await getDocs(queryData);
		let arr = [];
		querySnapshot.forEach((doc) => {
			let newObj = {};
			for (let key in doc.data()) {
				if (key == "createdAt") {
					// const newTime = new Date(doc.data()[key].seconds * 1000)
					// console.log(newTIme)
					const options = {
						year: "numeric",
						month: "short",
						day: "numeric",
					};
					const orderDate = new Date(doc.data()[key].seconds * 1000);
					newObj.createdAt = orderDate.toLocaleDateString("en-GB", options);
				} else {
					newObj[key] = doc.data()[key];
				}
			}
			arr.push(newObj);
		});
		if (arr.length == 0) {
			arr.push(1);
		}
		setOrders(arr);
	}

	useEffect(() => {
		getDataFromFirebase(q);
	}, []);

	console.log(orders);

	if (!orders[0] == 1) {
		return <LoadingView message="fetching data.." />;
		// return <Loading />;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.headingStyle}>My Orders</Text>
			<View style={styles.listContainer}>
				<FlatList
					data={orders}
					renderItem={({ item }) => {
						return (
							<ListItem
								orderId={item.orderId}
								itemName={item.productName}
								price={item.price}
								quantity={item.quantity}
								createdAt={item.createdAt}
								orderStatus={item.orderStatus}
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
