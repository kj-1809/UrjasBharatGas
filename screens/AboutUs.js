import {Text , View , StyleSheet} from 'react-native'

function AboutUs(){
  return (
    <View style = {styles.container}>
      <Text style = {styles.headingText}>About Us</Text>
      <Text style = {styles.infoText}>We are Leading providers of LPG In Himachal Pradesh , Jammu and Kashmir , Punjab and Chandigarh . We have partnered up with Indane for these services . </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    flexDirection : "column",
    alignItems : 'center',
    marginHorizontal : 10,
  },
  headingText: {
		fontSize: 50,
		marginTop: "5%",
		fontFamily: "MontserratSemiBold",
	},
  infoText : {
    fontSize : 15,
    fontFamily : 'MontserratSemiBold',
    textAlign : 'center',
    marginTop : "15%",
    marginHorizontal : "5%"

  }
})


export default AboutUs;


