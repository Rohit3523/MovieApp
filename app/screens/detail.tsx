import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import Image from 'react-native-fast-image';
import { theme } from '../theme';

const DetailScreen = ({ route }: any) => {
    const { data } = route.params;

    function openUrl(url: string) {
        Linking.openURL(url);
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Image source={{ uri: data.image.original, priority: 'high' }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.subtitle}>Type: {data.type}</Text>
                <Text style={styles.subtitle}>Language: {data.language}</Text>
                <Text style={styles.subtitle}>Status: {data.status}</Text>
                <Text style={styles.subtitle}>Rating: {data.rating.average || 'N/A'}</Text>
                <Text style={styles.subtitle}>Genres: {data.genres.join(', ')}</Text>
                <Text style={styles.subtitle}>
                    Runtime: {data.runtime} minutes (Avg: {data.averageRuntime} mins)
                </Text>
                <Text style={styles.subtitle}>Premiered: {data.premiered}</Text>
                {data.ended && <Text style={styles.subtitle}>Ended: {data.ended}</Text>}
                <Text style={styles.subtitle}>
                    Schedule: {data.schedule.days.join(', ')} at {data.schedule.time}
                </Text>
                <Text style={styles.subtitle}>
                    Network: {data.network?.name || 'N/A'} ({data.network?.country?.name || 'Unknown'})
                </Text>
                <Text style={styles.summary}>{data.summary.replace(/<[^>]*>/g, '')}</Text>
                <Pressable style={styles.button} onPress={() => openUrl(data.officialSite)}>
                    <Text style={styles.buttonText}>Visit Official Site</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
    },
    content: {
        padding: theme.spacing.medium,
    },
    title: {
        fontSize: theme.fontSizes.large,
        fontWeight: 'bold',
        color: theme.colors.primaryText,
        marginBottom: theme.spacing.small,
    },
    subtitle: {
        fontSize: theme.fontSizes.medium,
        color: theme.colors.secondaryText,
        marginBottom: theme.spacing.small,
    },
    summary: {
        fontSize: theme.fontSizes.medium,
        color: theme.colors.primaryText,
        marginVertical: theme.spacing.medium,
    },
    button: {
        backgroundColor: theme.colors.accent,
        paddingVertical: theme.spacing.medium,
        paddingHorizontal: theme.spacing.medium,
        borderRadius: theme.borderRadius.medium,
        alignItems: 'center',
    },
    buttonText: {
        color: theme.colors.primaryText,
        fontSize: theme.fontSizes.medium,
        fontWeight: 'bold',
    },
});

export default DetailScreen;
