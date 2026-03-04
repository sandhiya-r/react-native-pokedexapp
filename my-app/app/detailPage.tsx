import { useEffect, useState} from "react";
import { Text, View, ScrollView, Image, StyleSheet, FlatList} from "react-native";
import { useFonts } from 'expo-font';
import { useLocalSearchParams } from 'expo-router';


export default function Details() {
    const {} = useLocalSearchParams
 

   return(
    <ScrollView>
      
    </ScrollView>
     
   );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10
  },
  card: {
    flex:1,
    margin: 10,
    borderRadius: 5
  },
  row:{
    flexDirection: 'row',
    flex: 1
  },
  title:{
    fontFamily: 'tiny5',
    fontSize: 50,
    margin: 20,
  },
  name: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'tiny5-regular',
    fontSize: 20

  },
  type: {
    fontFamily: 'tiny5-regular',
    color: 'black',
  },
  bubble: {
    backgroundColor: 'white',
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderRadius: 5
  }

})