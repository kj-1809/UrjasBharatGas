import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

function AboutUs() {
	return (
		<View style={styles.container}>
			<ScrollView>
				<Text style={styles.headingText}>About Us</Text>
				<View style={styles.imageContainer}>
					<Image
						source={require("../assets/images/about.jpeg")}
						style={styles.imageStyle}
					/>
				</View>
				<Text style={styles.infoText}>
					We are the non-domesitc LPG distributer of Bharat Petroleum for
					Himachal Pradesh.{" "}
				</Text>
				<Text style={styles.contactUsText}>
					{
						"You can contact us for any customer support and also for account deletion (that erases all of your data from our servers ) at : urjasbharatgas@gmail.com"
					}
				</Text>
				<Text style={styles.developerText}>
					Contact developer : krishnajindal1809@icloud.com
				</Text>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		marginHorizontal: 10,
	},
	headingText: {
		fontSize: 50,
		marginTop: "5%",
		fontFamily: "MontserratSemiBold",
		textAlign: "center",
	},
	infoText: {
		fontSize: 15,
		fontFamily: "MontserratSemiBold",
		textAlign: "center",
		marginTop: "10%",
		marginHorizontal: "5%",
	},
	contactUsText: {
		fontSize: 12,
		fontFamily: "MontserratSemiBold",
		textAlign: "center",
		marginTop: "10%",
		marginHorizontal: "5%",
	},
	imageContainer: {
		width: "90%",
		marginTop: 50,
		marginHorizontal: "5%",
		alignItems: "center",
	},
	imageStyle: {
		height: 200,
		width: "100%",
		borderRadius: 20,
	},
	developerText: {
		fontFamily: "MontserratSemiBold",
		fontSize: 12,
		textAlign: "center",
		marginTop: "10%",
		paddingBottom: "10%",
	},
});

export default AboutUs;
