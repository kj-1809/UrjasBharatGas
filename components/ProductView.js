import { View, Pressable, StyleSheet, Dimensions, Image } from "react-native";
const deviceWidth = Dimensions.get("screen").width;

const imgName = "shoesImg.jpg";

function ProductView(props) {
	return (
		<Pressable onPress={props.onNavigate}>
			<View style={styles.container}>
				{props.img ? <Image source={{ uri: props.img }} style={styles.image} /> : null}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		height: (deviceWidth / 2 - 30) * (4 / 3),
		width: deviceWidth / 2 - 30,
		backgroundColor: "white",
		margin: 10,
		borderRadius: 25,
		shadowColor: "#6CD2D9",
		shadowOpacity: 1,
		shadowOffset: { width: 5, height: 5 },
		elevation : 15
	},
	image: {
		height: (deviceWidth / 2 - 30) * (4 / 3),
		width: deviceWidth / 2 - 30,
		borderRadius: 25,
	},
});

export default ProductView;
