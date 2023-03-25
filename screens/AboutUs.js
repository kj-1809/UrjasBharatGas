import { Text, View, StyleSheet, Image } from "react-native";

function AboutUs() {
	return (
		<View style={styles.container}>
			<Text style={styles.headingText}>About Us</Text>
			<View style = {styles.imageContainer}>
				<Image
					source={require("../assets/images/about.jpeg")}
					style={styles.imageStyle}
				/>
			</View>
			<Text style={styles.infoText}>
				We are Leading providers of LPG In Himachal Pradesh , Jammu and Kashmir
				, Punjab and Chandigarh . We have partnered up with Indane for these
				services .{" "}
			</Text>

			<Text style = {styles.developerText}>Contact developer : krishnajindal1809@icloud.com</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "center",
		alignItems: "center",
		marginHorizontal: 10,
	},
	headingText: {
		fontSize: 50,
		marginTop: "5%",
		fontFamily: "MontserratSemiBold",
	},
	infoText: {
		fontSize: 15,
		fontFamily: "MontserratSemiBold",
		textAlign: "center",
		marginTop: "10%",
		marginHorizontal: "5%",
	},
  imageContainer : {
    width : "90%",
    marginTop : 50,
    marginHorizontal : "5%",
    alignItems : 'center'
  },
	imageStyle: {
    height: 200,
    width : "100%",
    borderRadius : 20
	},
  developerText : {
    fontFamily : 'MontserratSemiBold',
    fontSize : 12,
		position : "absolute",
		bottom : 15,
		left : 0, 
		right : 0,
		textAlign : "center"
  }
});

export default AboutUs;
