import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
    Alert
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';


function PushNotification({ navigation }) {

    useEffect(() => {
        // for taking permition fro android 13+ and fcm tocken 
        const checkApplicationPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        }

        const fcntoken = async () => {
            let fcm = await messaging().getToken();
            if (fcm) console.log(fcm);
        }

        fcntoken();

        //check your FCM token every time is it it same of not in Postmen and console 
        checkApplicationPermission();


    }, []);

    useEffect(() => {
        //Foreground state messages
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            onDisplayNotification();
        });

        // Register background handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });

        // Assume a message-notification contains a "type" property in the data payload of the screen to open
        

        //this call whene app is in background mode and click notification
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.data.screen,
            );
            navigation.navigate(remoteMessage.data.screen)
            // navigation.navigate(remoteMessage.data.type);
        });

        // Check whether an initial notification is available
        //this call whene app is in kill mode and click notification

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.data.screen,
                    );
                    navigation.navigate(remoteMessage.data.screen)
                }
            });

        return unsubscribe;

    }, []);

    //for display locale notification using notifee ... 
    async function onDisplayNotification() {
        // Request permissions (required for iOS)
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android: {
                channelId,
                //   smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        });
    }





    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: 'skyblue' }}>
                <Text>Pushnotification</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});

export default PushNotification;
