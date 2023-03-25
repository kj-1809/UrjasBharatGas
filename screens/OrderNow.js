import { Text, View, StyleSheet, FlatList } from "react-native";
import ProductView from "../components/ProductView";
import { useEffect, useState } from "react";
import { collection, getDocs, doc } from "firebase/firestore";
import { db, } from "../firebase";
import * as Haptics from 'expo-haptics';

import LoadingView from "../components/LoadingView";

function OrderNow(props) {
	const [products, setProducts] = useState([]);

	async function getProductsFromDatabase() {
		const querySnapshot = await getDocs(collection(db, "products"));
		const arr = [];
		querySnapshot.forEach((doc) => {
			arr.push(doc.data());
		});
		setProducts(arr);
	}

	useEffect(() => {
		getProductsFromDatabase();
	}, []);

	
	if (products.length == 0) {
		return <LoadingView message="loading.." />;
	}

	function navigateToSummary(item) {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
		const data = {
			productId: item.productId,
			productName: item.productName,
			price: item.price,
			img: item.img,
			discount : item.discount,
		};
		props.navigation.navigate("OrderSummary", data);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.headingText}>Order Now</Text>
			<Text style={styles.headingSubText}>Select a product to order</Text>
			<View style={styles.productsContainer}>
				<FlatList
					numColumns={2}
					data={products}
					renderItem={(item) => {
						return (
							<ProductView
								img={item.item.img}
								onNavigate={navigateToSummary.bind(this, item.item)}
							/>
						);
					}}
					keyExtractor={(item) => item.productId}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	headingText: {
		fontFamily: "MontserratSemiBold",
		fontSize: 45,
	},
	headingSubText: {
		fontFamily: "MontserratSemiBold",
		fontSize: 18,
		opacity: 0.5,
		marginTop: "2%",
	},
	productsContainer: {
		marginTop: "10%",
		paddingBottom: "25%",
	},
});

export default OrderNow;
