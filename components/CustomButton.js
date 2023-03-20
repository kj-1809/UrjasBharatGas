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

let sz = 0;
if((deviceWidth / 2) <= deviceHeight * 0.325){
	sz = (deviceWidth/2) - 30;
}else{
	sz = (deviceHeight * 0.325) - deviceHeight * 0.09; 
}


export default CustomButton;

const styles = StyleSheet.create({
	buttonContainer: {
    height : sz, 
    width : sz, 
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
    height : sz, 
    width : sz, 
    alignItems : 'center',
    justifyContent : 'center',
		borderRadius: 35,
    shadowColor : 'black',
    shadowOpacity : 0.5,
    shadowOffset : {width : 5 , height : 5},
		elevation : 5
	},
});
