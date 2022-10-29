import { View, Text, Pressable, StyleSheet,Dimensions } from "react-native";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

function CustomButton({ children, onClick , style}) {
	return (
		<View style={styles.buttonContainer}>
			<Pressable style={[styles.buttonPressable , style]} onPress={onClick}>
				<Text style={styles.innerText}>{children}</Text>
			</Pressable>
		</View>
	);
}



export default CustomButton;

const styles = StyleSheet.create({
	buttonContainer: {
    height : (deviceWidth/2) - 30,
    width : (deviceWidth/2) - 30,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: "3%",
	},
	innerText: {
		fontFamily: "Montserrat",
		fontSize: 17,
	},
	buttonPressable: {
    backgroundColor: "#6CD2D9",
    height : (deviceWidth/2) - 30,
    width : (deviceWidth/2) - 30,
    alignItems : 'center',
    justifyContent : 'center',
		borderRadius: 35,
    shadowColor : "black",
    shadowOpacity : 0.5,
    shadowOffset : {width : 5 , height : 5}
	},
});
