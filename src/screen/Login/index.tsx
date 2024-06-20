import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../common/color';
import { HEIGHT, scalSize, getItem, setItem, showToast } from '../../common/helper';
import { LoginSchema } from '../../validation';
import Toast from 'react-native-toast-message';
import { Images } from '../../common/image';

interface LoginScreenProps {
    navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [validUser, setValidUser] = useState<{ email: string; password: string }>({ email: '', password: '' });
    const [loginData, setLoginData] = useState<{ email: string; password: string }>({ email: '', password: '' });
    const [hideShowPass, setHideShowPass] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = await getItem('registerUser');
        const parsedData = JSON.parse(data);
        setValidUser(parsedData);
    };

    useEffect(() => {
        if (loginData.email !== '' || loginData.password !== '') {
            validation();
        }
    }, [loginData]);

    const onChangeData = (fieldName: string, value: string) => {
        setLoginData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const validation = () => {
        try {
            LoginSchema.parse(loginData);
            setErrors({});
        } catch (err: any) {
            const validationErrors = err?.errors?.reduce((acc: any, curr: any) => ({
                ...acc,
                [curr.path[0]]: curr.message,
            }), {});
            setErrors(validationErrors);
        }
    };

    const validateLogin = async (local: { email: string; password: string }, login: { email: string; password: string }) => {
        if (local.email === login.email && local.password === login.password) {
            await setItem('isLoginUser', true);
            navigation.navigate('Home');
        } else {
            let errorMessage = '';
            if (local.email !== login.email) {
                errorMessage += 'Incorrect email. ';
            }
            if (local.password !== login.password) {
                errorMessage += 'Incorrect password.';
            }
            showToast('error', errorMessage);
        }
    };

    const onPressLogin = () => {
        validateLogin(validUser, loginData);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.subContainer}>
                        <Text style={styles.title}>Login</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            placeholder="Enter Your Email"
                            label="Email"
                            onChangeText={(text: string) => onChangeData('email', text)}
                            onBlur={() => validation()}
                            value={loginData.email}
                            error={errors.email}
                        />
                        <CustomTextInput
                            placeholder="Enter Your Password"
                            label="Password"
                            onChangeText={(text: string) => onChangeData('password', text)}
                            onBlur={() => validation()}
                            value={loginData.password}
                            onPress={() => setHideShowPass(!hideShowPass)}
                            icon={loginData.password?.length > 0 ? (hideShowPass ? Images.show : Images.hide) : ''}
                            secureTextEntry={!hideShowPass}
                            error={errors.password}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.stringContainer}>
                            <Text style={[styles.accountText, { color: Colors.black, fontWeight: '500' }]}>
                                Don't have an account?
                            </Text>
                            <Pressable onPress={() => navigation.navigate('Register')}>
                                <Text style={[styles.accountText, { color: Colors.chilled_chilly, fontWeight: '700' }]}>
                                    Register
                                </Text>
                            </Pressable>
                        </View>
                        <CustomButton
                            title="Login"
                            onPress={onPressLogin}
                            disabled={!!errors.email || !!errors.password}
                        />
                    </View>
                </ScrollView>
                <View style={{ height: 20 }}></View>
                <Toast />
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

export default LoginScreen;
