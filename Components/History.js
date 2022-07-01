import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { Divider } from "react-native-elements";

const History = ({ token }) => {

    const [loading, setLoading] = useState();
    const [historyData, setHistoryData] = useState([]);


    useEffect(() => {
        fetchHistory();
    }, [])


    const fetchHistory = () => {
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://miva-app.herokuapp.com/v1/model", requestOptions)
            .then((response) => {
                // if (response.ok)
                return response.json()
                // else
                //     throw 'Fetch History API error : ' + response.status;
            })
            .then(result => setHistoryData(result.history))
            .finally(() => setLoading(false))
            .catch(error => console.warn(error));
    }

    const renderItem = ({ item, index }) => {

        return (
            <View style={styles.historyItems}>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.imageContainer}>
                        <Text style={styles.labelText}>Front</Text>
                    <Image
                        style={styles.logoImg}
                        source={{ uri: item.front }}
                    />
                    </View>
                    <View style={styles.imageContainer}>
                        <Text style={styles.labelText}>Left</Text>
                    <Image
                        style={styles.logoImg}
                        source={{ uri: item.left }}
                    />
                    </View>
                    <View style={styles.imageContainer}>
                        <Text style={styles.labelText}>Right</Text>
                    <Image
                        style={styles.logoImg}
                        source={{ uri: item.right }}
                    />
                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.cropText}>{item.name.split(/(?=[A-Z])/).join(' ')}</Text>
                </View>

            </View>
        )
    }

    return (
        <View style={styles.cardView}>
            <View style={styles.headingIcon}>
                <View style={{ flexDirection: 'row' }}>
                    <FontAwesome name="history" size={24} color="#707070" />
                    <Text style={styles.cvHeading}>History</Text>
                </View>
                <TouchableOpacity onPress={() => fetchHistory()}>
                    <FontAwesome name="refresh" size={22} color="#808080" />
                </TouchableOpacity>
            </View>
            <Divider />
            <View style={styles.headingIcon}>
                <Text style={styles.headingText}>Images</Text>
                <Text style={styles.headingText}>Predicted Name</Text>
            </View>
            <Divider />
            {
                loading ? <ActivityIndicator style={styles.container} size="large" color="#00aced" />
                    :
                    historyData.length === 0 ?
                        <View style={styles.emptyDataText}><Text style={{ color: '#ca5b51' }}>No Data Found !</Text></View>
                        : <FlatList
                            data={historyData.reverse()}
                            keyExtractor={item => item._id}
                            renderItem={renderItem}
                        />
            }
        </View>
    )
}

export default History

const styles = StyleSheet.create({
    cardView: {
        width: "95%",
        backgroundColor: "white",
        alignSelf: "center",
        // minHeight:'65%',
        flex: 1,
        padding: 1,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,

        elevation: 5,
    },
    imageContainer:{
        paddingRight:5
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    logoImg: {
        height: 80,
        width: 80,
        alignSelf: "center",
        resizeMode: "contain",
        borderRadius: 5
    },
    labelText:{
        color:'#545b62',
        textAlign:'center'
    },
    emptyDataText: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyItems: {
        margin: 5,
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        borderBottomColor: '#707070',
        borderBottomWidth: 0.5,
    },
    headingIcon: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 10,
    },
    cvHeading: {
        color: "#707070",
        marginLeft: 5,
        fontSize: 18,
    },
    parametersText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#909090'
    },
    headingText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    cropText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0cac75'
    }


})