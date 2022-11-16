import { View ,StyleSheet} from "react-native";
import LottieView from "lottie-react-native";

function Loading(props) {
	return (
		<View style = {[StyleSheet.absoluteFillObject,styles.container]}>
			<LottieView source={require("../assets/successLottie.json")} autoPlay/>
		</View>
	);
}

const styles = StyleSheet.create({
  container : {
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : (0,0,0,0.2),
    zIndex : 1
  }
  
})

export default Loading;
