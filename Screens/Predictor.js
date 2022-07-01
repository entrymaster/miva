import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState, useCallback} from 'react'
import UploadComponent from '../Components/UploadComponent'
import ImageBucket from '../Components/ImageBucket';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Predictor = ({navigation}) => {


  const [section, setSection] = useState('front');
  const [frontImage, setFrontImage] = useState();
  const [leftImage, setLeftImage] = useState();
  const [rightImage, setRightImage] = useState();
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  
  useEffect(() => {
    navigation.setOptions({
      title: 'Predictor >> Front View',
    })
    getUserData();
  }, [])

  useEffect(() => {
    setSection(sectionChecker());
  }, [frontImage])

  useEffect(() => {
    setSection(sectionChecker());
  }, [leftImage])

  useEffect(() => {
    setSection(sectionChecker());
  }, [rightImage])

  useEffect(() => {
    section === 'front' && navigation.setOptions({
      title: 'Predictor >> Front View',
    })
    section === 'left' && navigation.setOptions({
      title: 'Predictor >> Left View',
    })
    section === 'right' && navigation.setOptions({
      title: 'Predictor >> Right View',
    })
    section === 'submit' && navigation.setOptions({
      title: 'Predictor >> Submit',
    })
  }, [section])
  

  const getUserData = useCallback(() => {

    AsyncStorage.getItem("userData").then((value) => {
        let parseData = JSON.parse(value);
        setAccessToken(parseData.token);
    });

}, [])
  
  
  const sectionChecker = () =>{
    if(!frontImage){
      return 'front'
    }
    if(!leftImage){
      return 'left'
    }
    if(!rightImage){
      return 'right'
    }
    return 'submit';
  }

const onUploadPressHandler = async () =>{
  let result = await DocumentPicker.getDocumentAsync({
    copyToCacheDirectory: false
  });

  if (!result.cancelled) {
    switch (section) {
      case 'front':
        setFrontImage(result);
        break;
      case 'left':
        setLeftImage(result);
        break;
      case 'right':
        setRightImage(result);
        break;
      
    }
    
  }
}

const onDeleteHandler = (type) =>{
  
  switch (type) {
    case 'front':
      setFrontImage();
      break;
    case 'left':
      setLeftImage();
      break;
    case 'right':
      setRightImage();
      break;
    
  }
}

const prepareImage = (image)=>{

  let localUri = (image.uri)
  let filename = image.name;
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  const profile_pic = {
      name: (filename),
      type: (type),
      uri: (localUri),
  }
  return profile_pic
}

const submitHistoryAPI = async () => {
   setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    
    const data = new FormData();
      data.append("left", prepareImage(leftImage));
      data.append("right", prepareImage(rightImage));
      data.append("front", prepareImage(frontImage));

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };

    await fetch("https://miva-app.herokuapp.com/v1/model", requestOptions)
        .then((response) => {
            if (response.ok)
            return response.json()
            else
              throw 'History API error : ' + response.status;
        })
        .then(result => setName(result.data.name))
        .finally(() => setLoading(false))
        .catch(error => console.warn(error));
}

  return (
    <View style={styles.mainContainer}>
      <View style={styles.uploadContainer}>
       <UploadComponent name={name} loading={loading} section={section} onUploadPressHandler={()=>section === 'submit' ? submitHistoryAPI() :onUploadPressHandler()} />
      </View>
      <View style={styles.imageBucket}>
      <ImageBucket frontImage={frontImage} leftImage={leftImage} rightImage={rightImage} onDeleteHandler={onDeleteHandler}  />
      
      </View>
    </View>
  )
}

export default Predictor

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  uploadContainer: {
    height: '50%'
  },
  imageBucket:{
    height:'50%'
  }
})