import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {getDataWatcher} from '../store/action';
import {useDispatch, useSelector} from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const {getData} = useSelector((state: any) => ({
    getData: state.getDataReducer.getData,
  }));
  
  useEffect(() => {
    console.log(getData);
  }, [getData]);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          dispatch(getDataWatcher());
        }}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
