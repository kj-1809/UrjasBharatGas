import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import ProductView from "../components/ProductView";


const Products = [
  {
    productId : 1,
    productName : "Shoe UK 10",
    price : 7999,
    img : require("../assets/images/shoesImg.jpg")
  },
  {
    productId : 2,
    productName : "Shoe US 10",
    price : 79999,
    img : require("../assets/images/newimg.jpg")
  },
  {
    productId : 3,
    productName : "Shoe US 10",
    price : 79999,
    img : require("../assets/images/newimg.jpg")
  },
  {
    productId : 4,
    productName : "Shoe US 10",
    price : 79999,
    img : require("../assets/images/shoesImg.jpg")
  },
  {
    productId : 5,
    productName : "Shoe US 10",
    price : 79999,
    img : require("../assets/images/shoesImg.jpg")
  },
  {
    productId : 6,
    productName : "Shoe US 10",
    price : 79999,
    img : require("../assets/images/newimg.jpg")
  },
]


function OrderNow() {
	return (
		<View style = {styles.container}>
			<Text style = {styles.headingText}>Order Now</Text>
			<Text style = {styles.headingSubText}>Select a product to order</Text>
      <View style = {styles.productsContainer}>
        <FlatList numColumns={2} 
        data = {Products}
        renderItem = {(item) => {
          return (<ProductView img = {item.item.img}/>)
        }}
        keyExtractor = {(item) => item.productId}
        // style = {{marginBottom : "10%"}}
        />
      </View>
		</View>
	);
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center'
  },
  headingText : {
    fontFamily : "MontserratSemiBold",
    fontSize : 45
  },
  headingSubText : {
    fontFamily : "MontserratSemiBold",
    fontSize : 18 , 
    opacity : 0.5,
    marginTop : "2%"
  },
  productsContainer : {
    marginTop : "10%",
    // marginBottom : "10%"
    paddingBottom : "25%"
  }
})


export default OrderNow;
