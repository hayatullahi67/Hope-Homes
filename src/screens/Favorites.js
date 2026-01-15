import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { properties } from '../data/properties';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';

const Favorites = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    // Mocking favorite properties for the prototype
    const favoriteListings = properties.filter(p => ['1', '3', '5', '8'].includes(p.id));

    const renderItem = ({ item }) => (
        <View style={styles.cardWrapper}>
            <PropertyCard
                item={item}
                onPress={() => navigation.navigate('PropertyDetails', { property: item })}
            />
        </View>
    );

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="My Favorites"
                showBack
                onBackPress={() => navigation.goBack()}
                rightIcon="log-out-outline"
                onRightPress={() => navigation.replace('Welcome')}
            />

            {favoriteListings.length > 0 ? (
                <FlatList
                    data={favoriteListings}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>You haven't added any favorites yet.</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    listContainer: {
        padding: spacing.md,
    },
    cardWrapper: {
        marginBottom: spacing.md,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
    },
    emptyText: {
        fontSize: 16,
        color: colors.textSecondary,
        textAlign: 'center',
    },
});

export default Favorites;
