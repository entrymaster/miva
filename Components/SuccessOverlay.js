import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Overlay } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

const SuccessOverlay = ({visible, setVisible}) => {
    const navigation = useNavigation();
    return (
        <View>
            <Overlay
                    isVisible={visible}
                    onBackdropPress={() => setVisible(!visible)}
                    overlayStyle={styles.overlay}
                >
                    <View style={styles.overlayContainer}>
                        <Text style={styles.heading}>Success</Text>
                        <Text style={styles.crop}>Your entries have been successfully submitted. Model will be trained for these.</Text>
                        <TouchableOpacity onPress={()=>{setVisible(!visible)}} style={styles.button}>
                            
                            <Text style={{ fontSize: 20, color: '#f8f9fc', fontWeight: 'bold' }}>OK</Text>


                        </TouchableOpacity>
                    </View>

                    </Overlay> 
        </View>
    )
}

export default SuccessOverlay

const styles = StyleSheet.create({
    overlay: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#dfe1e5'
    },
    heading:{
        fontSize:24,
        color:'#004e92',
        
        fontWeight:'bold',
        textAlign:'center'
    },
    overlayContainer: {
        width: 250,
        height: 200
    },
    crop:{
        fontSize:16,
        color:'#293346',
        fontWeight:'bold',
        textAlign:'center',
        paddingVertical:20

    },
    overlayText: {
        paddingVertical: 10,
        fontSize: 16,
        color: "#2b5c4c",
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#76b5c5',
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal:25,
        borderRadius: 12,
        // flexDirection: 'row',
        // width: 100,
        // alignItems: 'center',
    }
})
