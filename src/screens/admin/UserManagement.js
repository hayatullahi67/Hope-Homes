import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';

const UserManagement = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const users = [
        { id: 1, name: 'Hassan Ibrahim', email: 'hassan@example.com', role: 'Buyer', status: 'Active', properties: 3 },
        { id: 2, name: 'Amina Yusuf', email: 'amina@example.com', role: 'Agent', status: 'Active', properties: 12 },
        { id: 3, name: 'Chidi Okafor', email: 'chidi@example.com', role: 'Buyer', status: 'Active', properties: 1 },
        { id: 4, name: 'Fatima Bello', email: 'fatima@example.com', role: 'Agent', status: 'Active', properties: 8 },
        { id: 5, name: 'Tunde Adeyemi', email: 'tunde@example.com', role: 'Buyer', status: 'Inactive', properties: 0 },
    ];

    const filterOptions = [
        { label: 'All', value: 'all' },
        { label: 'Buyers', value: 'buyer' },
        { label: 'Agents', value: 'agent' },
    ];

    const renderUser = ({ item }) => (
        <TouchableOpacity
            style={[styles.userCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
            activeOpacity={0.7}
        >
            <View style={styles.userHeader}>
                <View style={[styles.avatar, { backgroundColor: `${colors.primary}15` }]}>
                    <Text style={[styles.avatarText, { color: colors.primary }]}>
                        {item.name.charAt(0)}
                    </Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={[styles.userName, { color: theme.text }]}>{item.name}</Text>
                    <Text style={[styles.userEmail, { color: theme.textSecondary }]}>{item.email}</Text>
                </View>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === 'Active' ? `${colors.secondary}15` : `${colors.textSecondary}15` }
                ]}>
                    <Text style={[
                        styles.statusText,
                        { color: item.status === 'Active' ? colors.secondary : theme.textSecondary }
                    ]}>
                        {item.status}
                    </Text>
                </View>
            </View>

            <View style={styles.userMeta}>
                <View style={styles.metaItem}>
                    <Ionicons name="briefcase-outline" size={16} color={theme.textSecondary} />
                    <Text style={[styles.metaText, { color: theme.textSecondary }]}>{item.role}</Text>
                </View>
                <View style={styles.metaItem}>
                    <Ionicons name="home-outline" size={16} color={theme.textSecondary} />
                    <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                        {item.properties} {item.role === 'Agent' ? 'listings' : 'inquiries'}
                    </Text>
                </View>
            </View>

            <View style={styles.userActions}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: `${colors.primary}15` }]}>
                    <Ionicons name="eye-outline" size={16} color={colors.primary} />
                    <Text style={[styles.actionBtnText, { color: colors.primary }]}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: `${colors.error}15` }]}>
                    <Ionicons name="ban-outline" size={16} color={colors.error} />
                    <Text style={[styles.actionBtnText, { color: colors.error }]}>Suspend</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="User Management"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <View style={styles.content}>
                <SearchInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search users..."
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
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <FlatList
                    data={users}
                    renderItem={renderUser}
                    keyExtractor={(item) => item.id.toString()}
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
    userCard: {
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        marginBottom: spacing.md,
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    avatarText: {
        fontSize: 18,
        fontWeight: '800',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 2,
    },
    userEmail: {
        fontSize: 13,
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
    userMeta: {
        flexDirection: 'row',
        gap: spacing.lg,
        marginBottom: spacing.md,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 13,
    },
    userActions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
        gap: 6,
    },
    actionBtnText: {
        fontSize: 13,
        fontWeight: '600',
    },
});

export default UserManagement;
