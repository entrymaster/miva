import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Octicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const UploadComponent = ({ name, loading, section, onUploadPressHandler }) => {

    const ImageView = (profile) => {
        switch (profile) {
            case 'front':
                return <Image
                    style={styles.logoImg}
                    source={require("../assets/front.png")}
                />
            case 'left':
                return <Image
                    style={styles.logoImg}
                    source={require("../assets/left.png")}
                />
            case 'right':
                return <Image
                    style={styles.logoImg}
                    source={require("../assets/right.png")}
                />
            case 'submit':
                return <MaterialCommunityIcons style={{ alignSelf: 'center' }} name="check-decagram" size={100} color="#8dbb33" />

        }
    }
    return (
        <LinearGradient style={{ flex: 1, justifyContent: 'space-around' }} colors={["#004e92", "#000428"]}>

            {loading ? <ActivityIndicator style={{flex:1}} size="large" color="#8dbb33" /> : ImageView(section)}
            {section !== 'submit' &&
            <Text style={styles.headingText}>Please upload a image having{'\n'}
                <Text style={{ color: '#8dbb33' }}>
                    {section && section.toUpperCase()} PROFILE
                </Text>
                of the person
            </Text>}
            {name !== '' && <Text style={styles.headingText}>Predicted name of person is{'\n'}
                <Text style={{ color: '#8dbb33' }}>
                    {name && name.split(/(?=[A-Z])/).join(' ').toUpperCase()}
                </Text>
            </Text>}

            <TouchableOpacity
                activeOpacity={1}
                style={[styles.loginBtn, Platform.OS === 'ios' ? styles.shadowIOS : styles.shadowAndroid]}
                onPress={onUploadPressHandler}
            >
                {section === 'submit' ? <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Text style={styles.loginBtnText}>Submit</Text>
                    <FontAwesome name="send-o" size={24} color="#2b5c4c" />
                </View>
                    : <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Text style={styles.loginBtnText}>Upload</Text>
                        <Octicons name="upload" size={24} color="#2b5c4c" />
                    </View>}
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default UploadComponent

const styles = StyleSheet.create({
    loginBtn: {
        alignSelf: "center",
        position: 'absolute',
        bottom: -25,

        borderRadius: 10,
        backgroundColor: "#8dbb33",
        padding: 14,
        width: 170,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 30,
    },
    loginBtnText: {
        textAlign: "center",
        color: "#2b5c4c",
        fontSize: 18,
        fontWeight: "bold",
    },
    logoImg: {
        height: 200,
        width: 200,
        alignSelf: "center",
        resizeMode: "contain",
    },
    headingText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 60
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
})