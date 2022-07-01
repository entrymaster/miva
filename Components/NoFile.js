import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NoFile = () => {
  return (
    <View style={[styles.mainContainer, Platform.OS === 'ios' ? styles.shadowIOS: styles.shadowAndroid]}>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-evenly'}}>
      <MaterialCommunityIcons name="file-image-remove" size={50} color="#fff" />
      <Text style={styles.text}>No file has been selected</Text>
      </View>
    </View>
  )
}

export default NoFile

const styles = StyleSheet.create({
    mainContainer:{
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor:'#AAAAAA',
        width:'70%',
        paddingVertical:20,
        marginTop:100,
        borderRadius:10
       
    },
    shadowIOS: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      shadowAndroid: {
        elevation: 10,
        shadowColor: '#000'
      },
    text:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold'
    }
})