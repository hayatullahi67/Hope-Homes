import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const Notifications = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    const notifications = [
        {
            id: '1',
            title: 'Price Drop Alert!',
            message: 'The Modern Luxury Villa in Abeokuta just dropped by ₦5,000,000.',
            time: '2 hours ago',
            icon: 'trending-down',
            color: '#10B981',
            unread: true,
        },
        {
            id: '2',
            title: 'New Message from Agent',
            message: 'Agent Hassan replied to your inquiry about Green View Estate.',
            time: '5 hours ago',
            icon: 'chatbubble-ellipses',
            color: colors.primary,
            unread: true,
        },
        {
            id: '3',
            title: 'New Property in Ogun',
            message: 'A new 4-bedroom bungalow was just listed in Ijebu-Ode.',
            time: 'Yesterday',
            icon: 'home',
            color: '#3B82F6',
            unread: false,
        },
        {
            id: '4',
            title: 'Account Verified',
            message: 'Your profile has been successfully verified. Happy hunting!',
            time: '2 days ago',
            icon: 'checkmark-circle',
            color: '#6366F1',
            unread: false,
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.notificationItem, { backgroundColor: theme.surface, borderColor: theme.border }, item.unread && { borderColor: theme.primary, backgroundColor: `${theme.primary}05` }]}>
            <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
                    {item.unread && <View style={styles.unreadDot} />}
                </View>
                <Text style={[styles.message, { color: theme.textSecondary }]} numberOfLines={2}>{item.message}</Text>
                <Text style={[styles.time, { color: theme.textSecondary }]}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="Notifications"
                showBack
                onBackPress={() => navigation.goBack()}
                rightIcon="log-out-outline"
                onRightPress={() => navigation.replace('Welcome')}
            />

            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No notifications yet.</Text>
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
    listContainer: {
        padding: spacing.md,
    },
    notificationItem: {
        flexDirection: 'row',
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
    },
    unreadItem: {
        borderColor: colors.primary,
        backgroundColor: `${colors.primary}05`,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },
    message: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    time: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 8,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: colors.textSecondary,
    },
});

export default Notifications;
