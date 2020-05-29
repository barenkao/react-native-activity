import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [permission, setPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  useEffect(() => {
    getPermissionAsync()
  }, []);
  const getPermissionAsync = async () => {
      // Camera roll Permission 
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      // Camera Permission
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setPermission(status === 'granted');
    }
  const handleCameraType=()=>{
    setCameraType(cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back);
  }
  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      console.log(photo);
    }
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }
  
  
  if (permission === null) {
    return <View />;
  } else if (permission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={cameraType} ref={ref => {setCamera(ref)}}>
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',                  
                }}
                onPress={()=>pickImage()}
                >
                <Ionicons
                    name="ios-photos"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={()=>takePicture()}
                >
                <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={()=>handleCameraType()}
                >
                <MaterialCommunityIcons
                    name="camera-switch"
                    style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
            </View>
          </Camera>
          
      </View>
    );
  }
}
  

