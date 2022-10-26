import { View ,StyleSheet} from "react-native";
import LottieView from "lottie-react-native";

function Loading() {
	return (
		<View style = {[StyleSheet.absoluteFillObject,styles.container]}>
			<LottieView source={require("../assets/loading.json")} autoPlay loop />
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
