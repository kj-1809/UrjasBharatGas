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

function MyOrders() {
	const [orders, setOrders] = useState([]);
	const currentUser = auth.currentUser;

	const q = query(
		collection(db, "orders"),
		where("uid", "==", currentUser.uid),
		orderBy("orderId", "desc"),
		limit(50)
	);

	async function getDataFromFirebase(queryData) {
		const querySnapshot = await getDocs(queryData);
		let arr = [];
		querySnapshot.forEach((doc) => {
			let newObj = {};
			for (let key in doc.data()) {
				if (key == "createdAt") {
					// date.toLocaleDateString() doesnt work properly on android! 
					const orderDate = new Date(doc.data()[key].seconds * 1000);
					const indexToMonth = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"]
					newObj.createdAt = `${orderDate.getDate()} ${indexToMonth[Number(orderDate.getMonth())]} ${orderDate.getFullYear()}`;
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


	if (!orders[0] == 1) {
		return <LoadingView message="fetching data.." />;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.headingStyle}>My Orders</Text>
			<View style={styles.listContainer}>
				{!(orders.length === 1 && orders[0] === 1) ? (
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
				) : null}
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
