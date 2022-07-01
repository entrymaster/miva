import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import NoFile from './NoFile';

const ImageBucket = ({ frontImage, leftImage, rightImage, onDeleteHandler }) => {

    const NoFileRender = () =>{
        if(!frontImage && !rightImage && !leftImage){
            return <NoFile />
        }
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={{ height: 20 }} />
                {frontImage && <View style={[styles.bucketItemContainer, Platform.OS === 'ios' ? styles.shadowIOS: styles.shadowAndroid]}>
                    <Image
                        style={styles.logoImg}
                        source={frontImage}
                    />
                    <View>
                        <Text style={styles.profileLabel}>FRONT PROFILE</Text>
                        {/* <Text style={styles.labelText}>{frontImage.name}</Text> */}
                    </View>
                    <TouchableOpacity onPress={()=>onDeleteHandler('front')} style={{ position: 'absolute', right: -10, top: -10 }}>
                    <Entypo name="circle-with-cross" size={24} color="#545b62" />
                    </TouchableOpacity>
                </View>}
                {leftImage && <View style={[styles.bucketItemContainer, Platform.OS === 'ios' ? styles.shadowIOS: styles.shadowAndroid]}>
                    <Image
                        style={styles.logoImg}
                        source={leftImage}
                    />
                    <View>
                        <Text style={styles.profileLabel}>LEFT PROFILE</Text>
                        {/* <Text style={styles.labelText}>{leftImage.name}</Text> */}
                    </View>
                    <TouchableOpacity onPress={()=>onDeleteHandler('left')} style={{ position: 'absolute', right: -10, top: -10 }}>
                    <Entypo name="circle-with-cross" size={24} color="#545b62" />
                    </TouchableOpacity>
                </View>}
                {rightImage && <View style={[styles.bucketItemContainer, Platform.OS === 'ios' ? styles.shadowIOS: styles.shadowAndroid]}>
                    <Image
                        style={styles.logoImg}
                        source={rightImage}
                    />
                    <View>
                        <Text style={styles.profileLabel}>RIGHT PROFILE</Text>
                        {/* <Text style={styles.labelText}>{rightImage.name}</Text> */}
                    </View>
                    <TouchableOpacity onPress={()=>onDeleteHandler('right')} style={{ position: 'absolute', right: -10, top: -10 }}>
                    <Entypo name="circle-with-cross" size={24} color="#545b62" />
                    </TouchableOpacity>
                </View>}
                {NoFileRender()}
            </ScrollView>
        </View>
    )
}

export default ImageBucket

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 50,
    },
    logoImg: {
        height: 120,
        width: 120,
        alignSelf: "center",
        // resizeMode: "contain",
        borderRadius: 10
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
    bucketItemContainer: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: '#dddddd',
        flexDirection: 'row',
        padding: 15,
        marginVertical: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    labelText: {
        color: '#545b62',
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    profileLabel: {
        color: '#2596be',
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 10
    }
})