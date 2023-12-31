import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput, Button, PermissionsAndroid, Platform, FlatList, Image
} from 'react-native';
import { CameraRoll, useCameraRoll } from "@react-native-camera-roll/camera-roll";
import ImagePicker from 'react-native-image-crop-picker';




function ImagePickers() {

    const [Photo, setPhoto] = useState([])
    const [selected, setSelected] = useState([])
    const [Piced, setPiced] = useState(false)


    useEffect(() => {
        savePicture()
    }, [Piced])


    async function hasAndroidPermission() {
        const getCheckPermissionPromise = () => {
            if (Platform.Version >= 33) {
                return Promise.all([
                    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
                    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
                ]).then(
                    ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
                        hasReadMediaImagesPermission && hasReadMediaVideoPermission,
                );
            } else {
                return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            }
        };

        const hasPermission = await getCheckPermissionPromise();
        if (hasPermission) {
            return true;
        }
        const getRequestPermissionPromise = () => {
            if (Platform.Version >= 33) {
                return PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                ]).then(
                    (statuses) =>
                        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
                        PermissionsAndroid.RESULTS.GRANTED &&
                        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
                        PermissionsAndroid.RESULTS.GRANTED,
                );
            } else {
                return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
            }
        };

        return await getRequestPermissionPromise();
    }

    async function savePicture() {
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
            return;
        }

        CameraRoll.getPhotos({ first: 50 }).then((res) => {
            const photo = res.edges.map((item) => item.node)
            setPhoto(photo)
        }).catch((error) => { console.log('error', error) })
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity activeOpacity={0.7} style={{ flex: 0.1, flexDirection: 'row' }}
            onPress={() => { setPic(item, index) }}
        >
            <Image
                source={{ uri: item.image.uri }}
                style={{ height: 50, width: 50, marginRight: 5, marginTop: 10 }}
            />

            {item?.isSlected ? <Image
                source={require('../src/img/8683794.png')} // Replace with the actual path to your image
                style={{ position: 'absolute', width: 30, height: 40 }}
            /> : null}
        </TouchableOpacity>
    );

    const renderSelected = ({ item, index }) => (
        <Image
            source={{ uri: item?.image?.uri }}
            style={{ height: 300 / selected.length, width: 300 / selected.length }}
        />
    );

    const renderSelectedView = ({ item, index }) => (
        <Image
            source={{ uri: item?.image?.uri }}
            style={{ height: 300, width: 300 }}
        />
    );

    const setPic = (item, index) => {
        let pic = [...Photo];

        pic[index].isSlected = !pic[index]?.isSlected;
        setPhoto(pic)

        let isPresent = false;
        let indexSelected = -1;

        selected.map((items, index) => {
            if (items?.timestamp == item?.timestamp) { isPresent = true, indexSelected = index }
        })


        if (isPresent) selected.splice(indexSelected, 1)
        else setSelected(prevArray => [...prevArray, item]);

    }

    const imagePiced = () => {
        setPiced(true)
    }

    //below for crop image camera 
    const [camera, setcamera] = useState([])

    const cameraPiced = () => {


        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            setcamera(prevArray => [...prevArray, image]);
          });

        // this is for multiple image selected
        // ImagePicker.openPicker({
        //     multiple: true
        // }).then(images => {
        //     console.log(images);
        //     setcamera(images);
        // });

        // ImagePicker.openCamera({
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        // }).then(image => {
        //     console.log(image);
        // });
        // console.log('camera not open in simulater');

    }

    const cameraSelected = ({ item, index }) => (
        <Image
            // source={require(item.sourceURL)}
            source={{ uri: item?.path }}
            style={{ height: 300 / camera.length, width: 300 / camera.length }}
        />
    );
    console.log('camera',camera);

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            {!Piced ?

                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', borderWidth: 3, paddingBottom: 10, marginBottom: 10 }}>
                        {selected.length >= 1 ? <TouchableOpacity onPress={imagePiced} style={{ backgroundColor: 'skyblue', width: 100, height: 30, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Text>Pick image</Text>
                        </TouchableOpacity> : null}


                        <View style={{ flex: 1, width: 315, height: 315, marginTop: 20 }}>
                            <FlatList
                                data={selected}
                                renderItem={renderSelected}
                                keyExtractor={(item, index) => String(item?.image?.uri || index)}
                                horizontal={true}
                            />
                        </View>

                        <View style={{ flex: 0.3, width: 315, height: 315, marginTop: 20 }}>
                            <FlatList
                                data={Photo}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => String(item?.image?.uri || index)}
                                horizontal={true}
                            />
                        </View>

                    </View>

                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', borderWidth: 3 }}>

                        <TouchableOpacity onPress={cameraPiced} style={{ backgroundColor: 'skyblue', width: 200, height: 30, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Text>Pick image from camera</Text>
                        </TouchableOpacity>


                        <View style={{ flex: 1, width: 315, height: 315, marginTop: 20 }}>
                            <FlatList
                                data={camera}
                                renderItem={cameraSelected}
                                keyExtractor={(item, index) => String(item?.localIdentifier)}
                                horizontal={true}
                            />
                        </View>

                    </View>
                </View>

                :

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >

                    {selected.length >= 1 ? <TouchableOpacity onPress={() => {
                        setSelected([])
                        setPiced(false)
                    }} style={{ backgroundColor: 'skyblue', width: 100, height: 30, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text>Pick again</Text>
                    </TouchableOpacity> : null}

                    <View style={{ flex: 1, borderColor: 'skyblue', borderWidth: 5, width: 315, height: 315, marginTop: 20 }}>
                        <FlatList
                            data={selected}
                            renderItem={renderSelectedView}
                            keyExtractor={(item, index) => String(item?.image?.uri || index)}
                        />
                    </View>

                </View>
            }

        </SafeAreaView>
    );
}


export default ImagePickers;
