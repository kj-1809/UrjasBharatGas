import { View, Text , StyleSheet } from "react-native";

function Homepage() {
	return (
		<View style = {styles.container}>
			<View style = {styles.header}>
				{/* <Image source = {require('../assets/images/urjalogo.jpg')} style = {styles.imgStyle} /> */}
				<Text>Welcome, yourName</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
  },
  header:{
    width : "100%",
    height: "30%",
    backgroundColor:"#6CD2D9"
  },
  imgStyle : {
    height : 100 ,
    width : 100
  }
});
export default Homepage;
