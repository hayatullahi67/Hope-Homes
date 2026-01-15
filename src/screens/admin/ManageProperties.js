import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import { properties } from '../../data/properties';

const ManageProperties = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all'); // all, active, sold, pending

    const filteredProperties = useMemo(() => {
        let filtered = properties;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.location.toLowerCase().includes(query)
            );
        }

        // Filter by status (mock data - all are "active" for now)
        return filtered;
    }, [searchQuery, filter]);

    const filterOptions = [
        { label: 'All', value: 'all', count: properties.length },
        { label: 'Active', value: 'active', count: 89 },
        { label: 'Sold', value: 'sold', count: 67 },
        { label: 'Pending', value: 'pending', count: 12 },
    ];

    const renderProperty = ({ item }) => (
        <TouchableOpacity
            style={[styles.propertyCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
            activeOpacity={0.7}
        >
            <View style={styles.propertyHeader}>
                <View style={styles.propertyInfo}>
                    <Text style={[styles.propertyTitle, { color: theme.text }]} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <View style={styles.locationRow}>
                        <Ionicons name="location-outline" size={14} color={theme.textSecondary} />
                        <Text style={[styles.propertyLocation, { color: theme.textSecondary }]}>
                            {item.location}
                        </Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${colors.secondary}15` }]}>
                    <Text style={[styles.statusText, { color: colors.secondary }]}>Active</Text>
                </View>
            </View>

            <View style={styles.propertyDetails}>
                <Text style={[styles.propertyPrice, { color: colors.primary }]}>{item.price}</Text>
                <View style={styles.propertyMeta}>
                    <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                        {item.beds} beds • {item.baths} baths • {item.sqft} sqft
                    </Text>
                </View>
            </View>

            <View style={styles.propertyActions}>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: `${colors.primary}15` }]}>
                    <Ionicons name="create-outline" size={18} color={colors.primary} />
                    <Text style={[styles.actionText, { color: colors.primary }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: `${colors.error}15` }]}>
                    <Ionicons name="trash-outline" size={18} color={colors.error} />
                    <Text style={[styles.actionText, { color: colors.error }]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="Manage Properties"
                showBack
                onBackPress={() => navigation.goBack()}
                rightIcon="add-circle-outline"
                onRightPress={() => {/* Add property */ }}
            />

            <View style={styles.content}>
                <SearchInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search properties..."
                />

                <View style={styles.filterContainer}>
                    {filterOptions.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={[
                                styles.filterChip,
                                {
                                    backgroundColor: filter === option.value ? colors.primary : theme.surface,
                                    borderColor: filter === option.value ? colors.primary : theme.border,
                                }
                            ]}
                            onPress={() => setFilter(option.value)}
                        >
                            <Text style={[
                                styles.filterText,
                                { color: filter === option.value ? '#FFFFFF' : theme.text }
                            ]}>
                                {option.label} ({option.count})
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <FlatList
                    data={filteredProperties}
                    renderItem={renderProperty}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
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
    filterContainer: {
        flexDirection: 'row',
        marginVertical: spacing.md,
        gap: spacing.sm,
    },
    filterChip: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
    },
    filterText: {
        fontSize: 13,
        fontWeight: '600',
    },
    listContent: {
        paddingBottom: spacing.xl,
    },
    propertyCard: {
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        marginBottom: spacing.md,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    propertyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.sm,
    },
    propertyInfo: {
        flex: 1,
        marginRight: spacing.sm,
    },
    propertyTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    propertyLocation: {
        fontSize: 13,
        marginLeft: 4,
    },
    statusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700',
    },
    propertyDetails: {
        marginBottom: spacing.md,
    },
    propertyPrice: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 4,
    },
    metaText: {
        fontSize: 13,
    },
    propertyActions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
        gap: spacing.xs,
    },
    actionText: {
        fontSize: 13,
        fontWeight: '600',
    },
});

export default ManageProperties;
