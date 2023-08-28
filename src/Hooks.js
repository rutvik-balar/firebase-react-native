import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,Button
} from 'react-native';

function Hooks() {


    const useRefValue = useRef(0);
    const useRefColorValue = useRef(null);

    const [count1, setcount1] = useState(0);
    const [count2, setcount2] = useState(0);



    const [useStateValue, setUseStateValue] = useState(0);

    const clickUseRef = () => {
        useRefValue.current = useRefValue.current + 1;

        useRefColorValue.current.setNativeProps({style: { backgroundColor: 'skyblue' } });
        // Change the color but it not reload the page 
    };

    const clickUseState = () => {
        setUseStateValue(useStateValue + 1)
    };

    const addTwo1 = () => {
        setcount1(count1 + 1)
        setcount1(count1 + 1)
    };

    const addTwo2 = () => {
        setcount2((current) => {return current + 1 })
        setcount2((current) => {return current + 1 })
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

        <Text></Text>
        <Text>count 1: {count1}</Text>
        <Button title="Change Count " onPress={addTwo1} />


        <Text></Text>
        <Text>count 2: {count2}</Text>
        <Button title="Change Count" onPress={addTwo2} />
        <Text>above both count add + 2 but only second work see in code</Text>




 
    </SafeAreaView>
    );
}

export default Hooks;
