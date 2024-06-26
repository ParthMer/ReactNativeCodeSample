import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigation from './src/screen/Navigation';
import { useEffect } from 'react';
import { getItem, setItem } from './src/common/helper';
import { Provider } from 'react-redux';
import { store } from './src/store';

export default function App() {
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const data = await getItem('isRegisterUser')
    const loginData = await getItem('isLoginUser')
    if(data === null){
      await setItem('isRegisterUser', false)
    }
    console.log("loginData", loginData)
    if(loginData === null){
      await setItem('isLoginUser', false)
    }
}
  return (
     <Provider store={store}>
    <SafeAreaView style={styles.container}>
      <Navigation />
      <StatusBar style="auto"/>
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
