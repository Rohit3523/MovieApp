import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, FlatList } from 'react-native';
import { theme } from '../theme';
import { useQuery } from 'react-query';
import { listMovies } from '../instance';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';

function MovieScreen() {
    const navigation = useNavigation();

    const { isLoading, isError, data, refetch } = useQuery('movies', listMovies);

    const renderItem = React.useCallback(({ item }: any) => (
        <Pressable style={styles.item} onPress={() => {
            //@ts-ignore
            navigation.navigate('Detail', { data: item })
        }}>
            <FastImage
                resizeMode='stretch'
                source={{ uri: item.image.medium }}
                style={styles.image}
            />
            <Text style={styles.movieTitle}>{item.name}</Text>
        </Pressable>
    ), []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={theme.colors.accent} />
            </View>
        )
    }

    if (isError) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Something went wrong</Text>
                <Pressable style={styles.button} onPress={() => refetch()}>
                    <Text style={styles.buttonText}>Retry</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Movies</Text>
                <Pressable style={styles.searchButton} onPress={() => {
                    //@ts-ignore
                    navigation.navigate('Search')
                }}>
                    <Icon name="search" size={24} color={theme.colors.primaryText} />
                </Pressable>
            </View>
            <FlatList
                data={data?.data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={{ gap: 5 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButton: {
        position: 'absolute',
        right: 20,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: theme.colors.primaryText,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#666',
    },
    button: {
        backgroundColor: theme.colors.accent,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: theme.colors.primaryText,
        fontWeight: 'bold',
    },

    item: {
        width: '49%',
        marginBottom: '1%',
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 5,
    },
    image: {
        width: '100%',
        height: 250,
        marginBottom: 5,
        borderRadius: 5,
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.primaryText,
    },
});

export default MovieScreen;