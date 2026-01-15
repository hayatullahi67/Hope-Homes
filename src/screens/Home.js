import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import SearchInput from '../components/SearchInput';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const Home = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, isDarkMode } = useTheme();

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

    const renderItem = useCallback(({ item }) => (
        <PropertyCard
            item={item}
            onPress={(property) => navigation.navigate('PropertyDetails', { property })}
        />
    ), [navigation]);

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent backgroundColor="transparent" />
            <Header
                title="Find your home"
                showBack
                onBackPress={() => navigation.replace('Welcome')}
                rightIcon="person-outline"
                onRightPress={() => navigation.navigate('Profile')}
            />

            <View style={styles.content}>
                <View style={styles.welcomeTextContainer}>
                    <Text style={[styles.greeting, { color: theme.textSecondary }]}>Hey, Explorer 👋</Text>
                    <Text style={[styles.subGreeting, { color: theme.text }]}>Where would you like to live?</Text>
                </View>

                <SearchInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                <View style={styles.listHeader}>
                    <Text style={[styles.listTitle, { color: theme.text }]}>Featured Properties</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AllListings')}>
                        <Text style={[styles.seeAll, { color: theme.primary }]}>See All</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={filteredProperties}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                                No properties found matching "{searchQuery}"
                            </Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.md,
    },
    welcomeTextContainer: {
        marginTop: spacing.sm,
    },
    greeting: {
        fontSize: 14,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    subGreeting: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.text,
        marginTop: 4,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
        marginTop: spacing.sm,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
    },
    seeAll: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
    },
    listContent: {
        paddingBottom: spacing.xxl,
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

export default Home;
