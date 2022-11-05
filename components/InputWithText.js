import { View, Text, TextInput, StyleSheet } from "react-native";

function InputWithText(props) {
	return (
		<View style = {styles.rootContainer}>
			<Text style = {styles.textStyle}>{props.title}</Text>
			<View style = {styles.inputContainer}>
				<TextInput
					placeholder={props.placeholder}
					value={props.value}
					editable={props.editable}
					style={styles.inputStyle}
					onChangeText = {props.onTextChange}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  rootContainer : {
		// backgroundColor : 'cyan'
		marginVertical : "2%"
	},
  textStyle : {
		marginLeft : '3%',
		marginTop : '2%',
		fontFamily : 'Montserrat',
		opacity : 0.4
	},
	inputContainer : {
		margin : "1%",
		justifyContent : 'center',
		// backgroundColor : 'blue',
		shadowColor : '#6CD2D9',
		shadowOpacity : 0.6,
	},
	inputStyle: {
		backgroundColor : 'white',
		height : 50,
		borderRadius : 15,
		padding : 10,
		fontFamily : 'MontserratSemiBold'
	},
});

export default InputWithText;
