import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


function HomeScreen({ navigation }) {
    return (

        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <TouchableOpacity onPress={() => navigation.navigate('Google')}
                style={styles.container}><Text>Google login </Text></TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Twitter')}
                style={styles.container}><Text>Twitter login </Text></TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('PushNotification')}
                style={styles.container}><Text>PushNotification </Text></TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Hooks')}
                style={styles.container}><Text>useState/useRef</Text></TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Hooks2')}
                style={styles.container}><Text>useMemo/useCallback</Text></TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'skyblue',
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10

    }

});

export default HomeScreen;
