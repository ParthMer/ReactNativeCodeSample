import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../common/image';
import { Colors } from '../../common/color';

interface PaginationProps {
    navigation: any;
}

const Pagination: React.FC<PaginationProps> = ({ navigation }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchItems = async () => {
        setLoading(true);
        const url = `https://reqres.in/api/users?page=${page}`;
        try {
            const response = await fetch(url);
            const responseData = await response.json();
            setData(prevData => [...prevData, ...responseData.data]);
            setTotalPages(responseData.total_pages);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            <Text>ID: {item.id}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Name: {`${item.first_name} ${item.last_name}`}</Text>
        </View>
    );

    const handleLoadMore = () => {
        if (page < totalPages && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image source={Images.back} style={styles.backImage} />
            </TouchableOpacity>
            {data.length > 0 ? (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.05}
                    ListFooterComponent={() => loading ? <ActivityIndicator size="large" /> : null}
                />
            ) : (
                <Text style={styles.noDataText}>No data found.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    backButton: {
        marginVertical: 10,
    },
    backImage: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.transparrent,
        paddingVertical: 10,
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: Colors.black,
    },
});

export default Pagination;
