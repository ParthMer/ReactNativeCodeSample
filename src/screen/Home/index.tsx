import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../common/image';
import { Colors } from '../../common/color';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { setItem, showToast } from '../../common/helper';
import Toast from 'react-native-toast-message';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const Home = ({ navigation }: { navigation: any }) => {
    const [users, setUsers] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isEditData, setIsEditData] = useState({});
    const [addData, setAddData] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const json = await response.json();
                setUsers(json);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, []);

    const onChangeData = (fieldName: string, value: string) => {
        setAddData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const onPress = async (type: 'add' | 'edit', userId?: any) => {
        try {
            let arr = [...users];
            if (type === 'add') {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(addData),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const data = await response.json();
                arr.push(data);
                showToast('success', 'Add Item Successfully');
            } else {
                const updatedData = {
                    ...isEditData,
                    ...addData
                };
                const indexToUpdate = arr.findIndex(item => item.id === updatedData.id);
                if (indexToUpdate !== -1) {
                    arr[indexToUpdate] = updatedData;
                    showToast('success', 'Update Item Successfully');
                } else {
                    throw new Error('Object with id not found in array.');
                }
            }
            setUsers(arr);
            setIsOpenModal(false);
            setIsEdit(false);
        } catch (error) {
            console.error(`Failed to ${type === 'add' ? 'add' : 'update'} user:`, error.message);
        }
    };

    const handleDelete = (index: number) => {
        let arr = [...users];
        arr.splice(index, 1);
        setUsers(arr);
        showToast('success', 'Delete Item Successfully');
    };

    const handleEdit = (item: any) => {
        setAddData({
            email: item?.email,
            name: item?.name
        });
        setIsOpenModal(true);
        setIsEdit(true);
        setIsEditData(item);
    };

    const onPressLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            await setItem('isLoginUser', false);
                        } catch (error) {
                            console.error('Error storage:', error);
                        }
                        navigation.navigate('Login');
                    }
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={{ flex: 1, marginHorizontal: 20 }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Pagination')}>
                    <Text style={styles.text}>Go To Pagination</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressLogout}>
                    <Image source={Images.logout} style={styles.logout} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={users}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item, index }: { item: any; index: number }) => (
                    <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: '400' }}>Name:</Text>
                                <Text numberOfLines={1} style={{ maxWidth: 180 }}>{item.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, fontWeight: '400' }}>Email:</Text>
                                <Text>{item.email}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => handleEdit(item)}>
                                <Image source={Images.edit} style={styles.edit} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(index)}>
                                <Image source={Images.delete} style={styles.edit} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <TouchableOpacity
                onPress={() => {
                    setIsOpenModal(true);
                    if (addData.email !== '' || addData.name !== '') {
                        setAddData({
                            email: '',
                            name: ''
                        });
                    }
                }}
            >
                <Image source={Images.add} style={styles.add} />
            </TouchableOpacity>
            <Modal visible={isOpenModal} transparent={true}>
                <TouchableOpacity onPress={() => setIsOpenModal(false)} style={{ backgroundColor: Colors.transparrent, flex: 1, justifyContent: 'center' }}>
                    <View style={{ backgroundColor: Colors.white, marginHorizontal: 20, padding: 20, borderRadius: 10 }}>
                        <CustomTextInput
                            placeholder={'Enter Your Email'}
                            label={"Email"}
                            onChangeText={(text: string) => onChangeData('email', text)}
                            value={addData.email}
                        />
                        <CustomTextInput
                            placeholder={'Enter Your Name'}
                            label={"Name"}
                            onChangeText={(text: string) => onChangeData('name', text)}
                            value={addData.name}
                        />
                        <CustomButton
                            title={isEdit ? 'Update Item' : 'Add Item'}
                            onPress={() => onPress(isEdit ? 'edit' : 'add')}
                            style={{ marginTop: 20 }}
                            disabled={addData.email === '' || addData.name === ''}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
            <Toast />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    edit: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginHorizontal: 5
    },
    add: {
        height: 60,
        width: 60,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 20,
        right: 0
    },
    logout: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.chilled_chilly
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        alignItems: 'center'
    }
});