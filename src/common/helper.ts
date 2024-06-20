import { Dimensions } from "react-native"

const WINDOW_WIDTH = Dimensions.get('window').width
export const scalSize = (size:number) => (WINDOW_WIDTH/375) * size

export const HEIGHT = Dimensions.get('window').height

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

export const setItem = async (key:string, value:{}) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

export const getItem = async (key:string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value!= null? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};
export const showToast = (type: string, message:string) => {
    Toast.show({
      type: type,
      text1:message,
    });
  };