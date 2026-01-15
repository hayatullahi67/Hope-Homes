import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';

const PriceBreakdown = ({ baseDeposit, discount, total, isInfluencer }) => {
    const { theme } = useTheme();

    if (!baseDeposit) {
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.title, { color: theme.text }]}>Price Breakdown</Text>

            <View style={styles.row}>
                <Text style={[styles.label, { color: theme.textSecondary }]}>Booking Deposit</Text>
                <Text style={[
                    styles.value,
                    { color: theme.text },
                    isInfluencer && styles.strikethrough
                ]}>
                    ₦{baseDeposit.toLocaleString()}
                </Text>
            </View>

            {isInfluencer && (
                <View style={styles.row}>
                    <Text style={[styles.label, { color: colors.secondary }]}>
                        Influencer Discount (10%)
                    </Text>
                    <Text style={[styles.value, { color: colors.secondary }]}>
                        -₦{discount.toLocaleString()}
                    </Text>
                </View>
            )}

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <View style={styles.row}>
                <Text style={[styles.totalLabel, { color: theme.text }]}>Total Booking Deposit</Text>
                <Text style={[styles.totalValue, { color: colors.primary }]}>
                    ₦{total.toLocaleString()}
                </Text>
            </View>

            {isInfluencer && (
                <View style={[styles.savingsBadge, { backgroundColor: `${colors.secondary}15` }]}>
                    <Text style={[styles.savingsText, { color: colors.secondary }]}>
                        You save ₦{discount.toLocaleString()}!
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: spacing.md,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    label: {
        fontSize: 14,
    },
    value: {
        fontSize: 15,
        fontWeight: '600',
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        opacity: 0.6,
    },
    divider: {
        height: 1,
        marginVertical: spacing.sm,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '800',
    },
    savingsBadge: {
        marginTop: spacing.sm,
        padding: spacing.sm,
        borderRadius: borderRadius.md,
        alignItems: 'center',
    },
    savingsText: {
        fontSize: 13,
        fontWeight: '700',
    },
});

export default PriceBreakdown;
