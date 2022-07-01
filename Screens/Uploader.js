import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState, useCallback} from 'react'
import UploadComponent from '../Components/UploadComponent'
import ImageBucket from '../Components/ImageBucket';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SuccessOverlay from '../Components/SuccessOverlay';

const Uploader = ({navigation}) => {


  const [section, setSection] = useState('front');
  const [frontImage, setFrontImage] = useState();
  const [leftImage, setLeftImage] = useState();
  const [rightImage, setRightImage] = useState();
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    navigation.setOptions({
      title: 'Uploader >> Front View',
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
      title: 'Uploader >> Front View',
    })
    section === 'left' && navigation.setOptions({
      title: 'Uploader >> Left View',
    })
    section === 'right' && navigation.setOptions({
      title: 'Uploader >> Right View',
    })
    section === 'submit' && navigation.setOptions({
      title: 'Uploader >> Submit',
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


const submitHistoryAPI = async () => {
   setLoading(true);
   setTimeout(() => {
    setLoading(false);
    setVisible(true);
   }, 3000);
}

  return (
    <View style={styles.mainContainer}>
      <View style={styles.uploadContainer}>
       <UploadComponent name={name} loading={loading} section={section} onUploadPressHandler={()=>section === 'submit' ? submitHistoryAPI() :onUploadPressHandler()} />
      </View>
      <View style={styles.imageBucket}>
      <ImageBucket frontImage={frontImage} leftImage={leftImage} rightImage={rightImage} onDeleteHandler={onDeleteHandler}  />
      
      </View>
      <SuccessOverlay visible={visible} setVisible={setVisible} />
    </View>
  )
}

export default Uploader

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