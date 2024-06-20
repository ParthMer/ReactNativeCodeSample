import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../common/color';
import { HEIGHT, getItem, scalSize, setItem, showToast } from '../../common/helper';
import { RegisterSchema } from '../../validation';
import { useIsFocused } from '@react-navigation/native';
import { Images } from '../../common/image';

interface RegisterScreenProps {
    navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
    const [hideShowPass, setHideShowPass] = useState(false);
    const [hideShowMatchPass, setHideShowMatchPass] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setRegisterData({
                email: '',
                password: '',
                confirmPassword: ''
            });
            getData();
        }
    }, [isFocused]);

    const getData = async () => {
        const registerUser = await getItem('isRegisterUser');
        const loginUser = await getItem('isLoginUser');
        if (registerUser == true && loginUser == true) {
            navigation.navigate('Home');
        }
    };

    const onChangeData = (fieldName: string, value: string) => {
        setRegisterData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const validation = () => {
        try {
            RegisterSchema.parse(registerData);
            if (registerData.password !== registerData.confirmPassword) {
                throw new Error('Passwords do not match');
            }
            setErrors({});
        } catch (err: any) {
            const validationErrors = err?.errors?.reduce((acc: any, curr: any) => ({
                ...acc,
                [curr.path[0]]: curr.message
            }), {});
            setErrors(validationErrors);
        }
    };

    const onPressRegister = async () => {
        try {
            await setItem('registerUser', JSON.stringify(registerData));
            await setItem('isRegisterUser', true);
            navigation.navigate("Login");
        } catch (error) {
            console.error('Error while registering:', error);
            showToast('error', 'Error while registering');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.subContainer}>
                        <Text style={styles.title}>Register</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            placeholder="Enter Your Email"
                            label="Email"
                            onChangeText={(text: string) => onChangeData('email', text)}
                            onBlur={() => validation()}
                            value={registerData.email}
                            error={errors.email}
                        />
                        <CustomTextInput
                            placeholder="Enter Your Password"
                            label="Password"
                            onChangeText={(text: string) => onChangeData('password', text)}
                            onBlur={() => validation()}
                            value={registerData.password}
                            onPress={() => setHideShowPass(!hideShowPass)}
                            icon={registerData.password?.length > 0 ? (hideShowPass ? Images.show : Images.hide) : ''}
                            secureTextEntry={!hideShowPass}
                            error={errors.password}
                        />
                        <CustomTextInput
                            placeholder="Confirm Your Password"
                            label="Confirm Password"
                            onChangeText={(text: string) => onChangeData('confirmPassword', text)}
                            onBlur={() => validation()}
                            value={registerData.confirmPassword}
                            onPress={() => setHideShowMatchPass(!hideShowMatchPass)}
                            icon={registerData.confirmPassword?.length > 0 ? (hideShowMatchPass ? Images.show : Images.hide) : ''}
                            secureTextEntry={!hideShowMatchPass}
                            error={errors.confirmPassword}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.stringContainer}>
                            <Text style={[styles.accountText, { color: Colors.black, fontWeight: '500' }]}>
                                Already have an account?
                            </Text>
                            <Pressable onPress={() => navigation.navigate('Login')}>
                                <Text style={[styles.accountText, { color: Colors.chilled_chilly, fontWeight: '700' }]}>
                                    Login
                                </Text>
                            </Pressable>
                        </View>
                        <CustomButton
                            title="Register"
                            onPress={onPressRegister}
                            disabled={!!errors.email || !!errors.password || !!errors.confirmPassword}
                        />
                    </View>
                </ScrollView>
                <View style={{ height: 20 }}></View>
            </>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    subContainer: {
        marginHorizontal: scalSize(20),
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        color: Colors.black,
    },
    inputContainer: {
        height: HEIGHT * 0.1,
        marginHorizontal: scalSize(20),
    },
    buttonContainer: {
        height: HEIGHT * 0.8,
        marginHorizontal: scalSize(20),
        justifyContent: 'flex-end',
    },
    accountText: {
        fontSize: 14,
        marginBottom: scalSize(10),
    },
    stringContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
});

export default RegisterScreen;
