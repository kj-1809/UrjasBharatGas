import { View, Text, Pressable, StyleSheet } from "react-native";

function NextButton({children}) {
	return (
		<View style = {styles.buttonContainer}>
			<Pressable style = {styles.buttonPressable}>
				<Text style = {styles.innerText}>{children}</Text>
			</Pressable>
		</View>
	);
}

export default NextButton;


const styles = StyleSheet.create({
    buttonContainer : {
        backgroundColor : '#6CD2D9',
        height : 50,
        borderRadius : 35,
        alignItems : 'center',
        justifyContent : 'center',
        marginHorizontal : '30%',
        opacity : 0.8
    },
    innerText : {
        fontFamily : 'Montserrat',
        fontSize : 18
    }
    
})
