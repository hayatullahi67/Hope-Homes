import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';

const FinancialReports = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    const summaryCards = [
        { label: 'Total Revenue', value: '₦2.4B', icon: 'cash', color: colors.primary },
        { label: 'Commission Earned', value: '₦360M', icon: 'wallet', color: '#10B981' },
        { label: 'Pending Payments', value: '₦45M', icon: 'time', color: '#F59E0B' },
        { label: 'Transactions', value: '156', icon: 'swap-horizontal', color: '#8B5CF6' },
    ];

    const transactions = [
        { id: 1, property: 'Luxury Villa Estate', buyer: 'Hassan Ibrahim', amount: '₦45M', date: '2024-01-10', status: 'Completed' },
        { id: 2, property: 'Modern Apartment', buyer: 'Amina Yusuf', amount: '₦32M', date: '2024-01-08', status: 'Completed' },
        { id: 3, property: 'Green View Residence', buyer: 'Chidi Okafor', amount: '₦38M', date: '2024-01-05', status: 'Pending' },
        { id: 4, property: 'Skyline Tower', buyer: 'Fatima Bello', amount: '₦52M', date: '2024-01-03', status: 'Completed' },
    ];

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="Financial Reports"
                showBack
                onBackPress={() => navigation.goBack()}
                rightIcon="download-outline"
                onRightPress={() => {/* Export report */ }}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Summary Cards */}
                <View style={styles.summaryGrid}>
                    {summaryCards.map((card, index) => (
                        <View
                            key={index}
                            style={[styles.summaryCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
                        >
                            <View style={[styles.cardIcon, { backgroundColor: `${card.color}15` }]}>
                                <Ionicons name={card.icon} size={24} color={card.color} />
                            </View>
                            <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>{card.label}</Text>
                            <Text style={[styles.cardValue, { color: theme.text }]}>{card.value}</Text>
                        </View>
                    ))}
                </View>

                {/* Recent Transactions */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Transactions</Text>
                {transactions.map((transaction) => (
                    <View
                        key={transaction.id}
                        style={[styles.transactionCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
                    >
                        <View style={styles.transactionHeader}>
                            <View style={styles.transactionInfo}>
                                <Text style={[styles.propertyName, { color: theme.text }]}>
                                    {transaction.property}
                                </Text>
                                <Text style={[styles.buyerName, { color: theme.textSecondary }]}>
                                    {transaction.buyer}
                                </Text>
                            </View>
                            <View style={[
                                styles.statusBadge,
                                { backgroundColor: transaction.status === 'Completed' ? `${colors.secondary}15` : `${colors.warning}15` }
                            ]}>
                                <Text style={[
                                    styles.statusText,
                                    { color: transaction.status === 'Completed' ? colors.secondary : colors.warning }
                                ]}>
                                    {transaction.status}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.transactionDetails}>
                            <View style={styles.detailItem}>
                                <Ionicons name="cash-outline" size={16} color={colors.primary} />
                                <Text style={[styles.amount, { color: colors.primary }]}>{transaction.amount}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Ionicons name="calendar-outline" size={16} color={theme.textSecondary} />
                                <Text style={[styles.date, { color: theme.textSecondary }]}>{transaction.date}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
    },
    summaryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -spacing.xs,
        marginBottom: spacing.xl,
    },
    summaryCard: {
        width: '47%',
        margin: spacing.xs,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
    },
    cardIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    cardLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    cardValue: {
        fontSize: 20,
        fontWeight: '800',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: spacing.md,
    },
    transactionCard: {
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        marginBottom: spacing.md,
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.sm,
    },
    transactionInfo: {
        flex: 1,
        marginRight: spacing.sm,
    },
    propertyName: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },
    buyerName: {
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
    transactionDetails: {
        flexDirection: 'row',
        gap: spacing.lg,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    amount: {
        fontSize: 16,
        fontWeight: '800',
    },
    date: {
        fontSize: 13,
    },
});

export default FinancialReports;
