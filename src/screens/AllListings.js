import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { properties } from '../data/properties';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import SearchInput from '../components/SearchInput';

const AllListings = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter properties based on search query
    const filteredProperties = useMemo(() => {
        if (!searchQuery.trim()) {
            return properties;
        }

        const query = searchQuery.toLowerCase();
        return properties.filter(property =>
            property.title.toLowerCase().includes(query) ||
            property.location.toLowerCase().includes(query)
        );
    }, [searchQuery]);

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
                title="All Properties"
                showBack
                onBackPress={() => navigation.goBack()}
                rightIcon="log-out-outline"
                onRightPress={() => navigation.replace('Welcome')}
            />

            <View style={styles.searchContainer}>
                <SearchInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search properties..."
                />
            </View>

            <FlatList
                data={filteredProperties}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={5}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                            No properties found matching "{searchQuery}"
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    searchContainer: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.sm,
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
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default AllListings;
