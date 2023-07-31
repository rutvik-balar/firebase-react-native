import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function Twitter(){
  return (
    <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity style={{backgroundColor:'skyblue'}}>
      <Text>Twitter login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});
