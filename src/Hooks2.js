import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,Button
} from 'react-native';

function Hooks2() {


    const useRefValue = useRef(0);
    const useRefColorValue = useRef(null);

    const [useStateValue, setUseStateValue] = useState(0);

    const clickUseRef = () => {
        useRefValue.current = useRefValue.current + 1;

        useRefColorValue.current.setNativeProps({style: { backgroundColor: 'skyblue' } });
        // Change the color but it not reload the page 
    };

    const clickUseState = () => {
        setUseStateValue(useStateValue + 1)
    };


    return (

    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        {console.log('reload')}
  
        <Text ref={useRefColorValue}  style={{backgroundColor:'yellow'}}>useref Value will change whene screen rerender and useref not going to reRender screen so whene screen reRender last value will applyed useref Value = {useRefValue.current}</Text>
        <Text></Text>
        <Button title="useRef Change value" onPress={clickUseRef} />

        <Text>whene state will change than screen rerender and logwill print useState Value: {useStateValue}</Text>
        <Text></Text>
        <Button title="useState Change Value" onPress={clickUseState} />
 
    </SafeAreaView>
    );
}

export default Hooks2;
