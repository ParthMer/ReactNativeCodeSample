import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomTextInput from '../../components/CustomTextInput'
import { HEIGHT, getItem, scalSize, setItem } from '../../common/helper'
import { Colors } from '../../common/color'
import { RegisterSchema } from '../../validation'
import CustomButton from '../../components/CustomButton'
import { useIsFocused } from '@react-navigation/native'
import { Images } from '../../common/image'
interface RegisterScreenProp {
    navigation: any
}
const Register = ({ navigation }: RegisterScreenProp) => {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({});
    const [hideShowPass, setHideShowPass] = useState(false);
    const [hideShowMatchPass, setHideShowMatchPass] = useState(false);
    useEffect(() => {
        if (registerData.email !== "" || registerData.password !== "" || registerData.confirmPassword !== "") {
            validation()
        }
    }, [registerData])
    const useIsFocus = useIsFocused();
    useEffect(() => {
        if(useIsFocus){
            setRegisterData({
                email: '',
                password: '',
                confirmPassword: ''
            })
            getData()
        }
    }, [useIsFocus])
    const getData = async () => {
        const registerUser = await getItem('isRegisterUser')
        const loginUser = await getItem('isLoginUser')
        if(registerUser === true && loginUser === true){
            navigation.navigate('Home')
        }
    }
    const onChangeData = (fieldName: string, value: string) => {
        setRegisterData((prev) => ({
            ...prev,
            [fieldName]: value
        }))
    }
    const validation = () => {
        try {
            RegisterSchema.parse(registerData);
            setErrors({
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (err: any) {
            setErrors(err?.errors?.reduce((acc: any, curr: any) => ({ ...acc, [curr.path[0]]: curr.message }), {}));
        }
        if (registerData.confirmPassword) {
            if (registerData.password !== registerData.confirmPassword) {
                setErrors(prevErrors => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
            } else {
                setErrors({
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }
        }
    }
    const onPress = async() => {
       await setItem('registerUser', JSON.stringify(registerData))
       await setItem('isRegisterUser', true)
        navigation.navigate("Login")
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={[styles.subContainer]}>
                        <Text style={styles.title}>Register</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            placeholder={'Enetr Your Email'}
                            lable={"Email"}
                            onChangeText={
                                (text: any) => onChangeData("email", text)
                            }
                            onBlur={() => validation()}
                            value={registerData.email}
                            error={errors.email}
                        />
                        <CustomTextInput
                            placeholder={'Enetr Your Password'}
                            lable={"Password"}
                            onChangeText={
                                (text: any) => onChangeData("password", text)
                            }
                            onBlur={() => validation()}
                            value={registerData.password}
                            onPress={() => setHideShowPass(!hideShowPass)}
                            icon={registerData.password?.length > 0 ? hideShowPass ? Images.show : Images.hide : ''}
                            secureTextEntry={!hideShowPass}
                            error={errors.password}
                        /><CustomTextInput
                            placeholder={'Enetr Your Confirm Password'}
                            lable={"Confirm Password"}
                            onChangeText={
                                (text: any) => onChangeData("confirmPassword", text)
                            }
                            onPress={() => setHideShowMatchPass(!hideShowMatchPass)}
                            icon={registerData.confirmPassword?.length > 0 ? hideShowMatchPass ? Images.show : Images.hide : ''}
                            secureTextEntry={!hideShowMatchPass}
                            value={registerData.confirmPassword}
                            onBlur={() => validation()}
                            error={errors.confirmPassword}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                    <View style={styles.stringContainer}>
                            <Text style={[styles.accountText, {
                                color: Colors.black, 
                                fontWeight: '500',
                            }]}>Already have an account ?
                            </Text>
                            <Pressable onPress={() => navigation.navigate('Login')}>
                                <Text style={[styles.accountText, { color: Colors.chilled_chilly, 
        fontWeight: '700', }]}>Login</Text>
                            </Pressable>
                        </View>
                        <CustomButton
                            title="Register"
                            onPress={() => onPress()}
                            disabled={errors?.email !== '' || errors?.password !== '' || errors?.confirmPassword !== ''}
                        />
                    </View>
                </ScrollView>
                <View style={{ height: 20 }}></View>
            </>
        </TouchableWithoutFeedback>
    )
}

export default Register

const styles = StyleSheet.create({
    subContainer: {
        marginHorizontal: scalSize(20),
        alignItems: 'center'
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        color: Colors.black
    },
    inputContainer: {
        height: HEIGHT * 0.1,
        marginHorizontal: scalSize(20),
    },
    buttonContainer: {
        height: HEIGHT * 0.8,
        marginHorizontal: scalSize(20),
        justifyContent: 'flex-end'
    },
    accountText: {
        fontSize: 14,
        marginBottom: scalSize(10)
    },
    stringContainer: { alignSelf: 'center', flexDirection: 'row' }
})