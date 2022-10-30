import { View, Text, StyleSheet } from "react-native";

function ListItem(props) {
	return (
    <View style = {styles.itemContainer}>
      <View style = {styles.keyContainer}>
        <Text style = {styles.textStyle}>Order ID</Text>
        <Text style = {styles.textStyle}>Item Name</Text>
        <Text style = {styles.textStyle}>Price</Text>
        <Text style = {styles.textStyle}>Quantity</Text>
        <Text style = {styles.textStyle}>Total</Text>
      </View>
      <View style = {styles.valueContainer}>
        <Text style = {styles.textStyle}>:  {props.orderId}</Text>
        <Text style = {styles.textStyle}>:  {props.itemName}</Text>
        <Text style = {styles.textStyle}>:  {props.price}</Text>
        <Text style = {styles.textStyle}>:  {props.quantity}</Text>
        <Text style = {styles.textStyle}>:  {props.quantity * props.price}</Text>
      </View>
    </View>

	);
}

const styles = StyleSheet.create({
  itemContainer : {
		padding: 15,
    borderRadius : 25,
    flexDirection : 'row',
    backgroundColor : 'white',
    margin : 10,
    shadowColor : '#6CD2D9',
    shadowOpacity : 1,
	},
	textStyle: {
		fontFamily: "MontserratSemiBold",
		fontSize: 15,
	},
  valueContainer : {
    marginLeft : "10%"
  }
  
});

export default ListItem;
