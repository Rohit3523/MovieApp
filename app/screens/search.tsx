import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import { searchMovies } from '../instance';

function SearchScreen() {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    async function fetchSearchResults(query: string) {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const response = await searchMovies(query);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = useCallback(debounce((text: string) => {
        fetchSearchResults(text);
    }, 500), []);

    const handleInputChange = (text: string) => {
        setSearchText(text);
        debouncedSearch(text);
    };

    const renderItem = ({ item }: any) => {
        const { show } = item;
        return (
            <TouchableOpacity
                style={styles.item}
                // @ts-ignore
                onPress={() => navigation.navigate('Movie', { data: show })}
            >
                {
                    (show?.image?.medium) ? (
                        <Image
                            source={{ uri: show.image.medium }}
                            style={styles.thumbnail}
                        />
                    ) : null
                }
                <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{show.name}</Text>
                    <Text style={styles.itemSubtitle}>
                        {show.genres.join(', ') || 'No genres available'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for a show..."
                    placeholderTextColor={theme.colors.secondaryText}
                    value={searchText}
                    onChangeText={handleInputChange}
                />
            </View>

            {
                loading ? (
                    <ActivityIndicator size="large" color={theme.colors.accent} style={styles.loader} />
                ) : (
                    <FlatList
                        data={searchResults}
                        renderItem={renderItem}
                        // @ts-ignore
                        keyExtractor={(item) => item.show.id.toString()}
                        contentContainerStyle={styles.list}
                        ListEmptyComponent={
                            <Text style={styles.noResults}>
                                {searchText ? 'No results found' : 'Start searching for shows'}
                            </Text>
                        }
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    searchContainer: {
        padding: theme.spacing.medium,
        backgroundColor: theme.colors.background,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: theme.colors.secondaryText,
        borderRadius: theme.borderRadius.medium,
        paddingHorizontal: theme.spacing.small,
        color: theme.colors.primaryText,
    },
    loader: {
        marginTop: theme.spacing.large,
    },
    list: {
        padding: theme.spacing.medium,
    },
    item: {
        flexDirection: 'row',
        backgroundColor: theme.colors.cardBackground,
        borderRadius: theme.borderRadius.medium,
        padding: theme.spacing.small,
        marginBottom: theme.spacing.small,
    },
    thumbnail: {
        width: 60,
        height: 90,
        borderRadius: theme.borderRadius.small,
    },
    itemContent: {
        marginLeft: theme.spacing.small,
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: theme.fontSizes.medium,
        fontWeight: 'bold',
        color: theme.colors.primaryText,
    },
    itemSubtitle: {
        fontSize: theme.fontSizes.small,
        color: theme.colors.secondaryText,
    },
    noResults: {
        textAlign: 'center',
        color: theme.colors.secondaryText,
        fontSize: theme.fontSizes.medium,
        marginTop: theme.spacing.large,
    },
});

export default SearchScreen;
