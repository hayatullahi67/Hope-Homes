import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';

const { width } = Dimensions.get('window');

const SalesAnalytics = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    const revenueData = [
        { label: 'Total Revenue', value: '₦2.4B', change: '+23%', icon: 'trending-up', color: colors.primary },
        { label: 'This Month', value: '₦340M', change: '+18%', icon: 'calendar', color: '#10B981' },
        { label: 'Avg Sale Price', value: '₦35.8M', change: '+12%', icon: 'pricetag', color: '#F59E0B' },
        { label: 'Conversion Rate', value: '24.5%', change: '+5%', icon: 'analytics', color: '#8B5CF6' },
    ];

    const topProperties = [
        { name: 'Luxury Villa Estate', sales: 12, revenue: '₦420M' },
        { name: 'Modern Apartment Complex', sales: 8, revenue: '₦280M' },
        { name: 'Green View Residence', sales: 6, revenue: '₦210M' },
    ];

    const monthlyData = [
        { month: 'Jan', value: 180 },
        { month: 'Feb', value: 220 },
        { month: 'Mar', value: 190 },
        { month: 'Apr', value: 280 },
        { month: 'May', value: 310 },
        { month: 'Jun', value: 340 },
    ];

    const maxValue = Math.max(...monthlyData.map(d => d.value));

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="Sales Analytics"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Revenue Overview */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Revenue Overview</Text>
                <View style={styles.statsGrid}>
                    {revenueData.map((stat, index) => (
                        <View
                            key={index}
                            style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
                        >
                            <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                                <Ionicons name={stat.icon} size={20} color={stat.color} />
                            </View>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
                            <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
                            <View style={styles.changeRow}>
                                <Ionicons name="trending-up" size={12} color="#10B981" />
                                <Text style={styles.changeText}>{stat.change}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Sales Chart */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Monthly Sales (₦M)</Text>
                <View style={[styles.chartContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <View style={styles.chart}>
                        {monthlyData.map((data, index) => (
                            <View key={index} style={styles.barContainer}>
                                <View style={styles.barWrapper}>
                                    <View
                                        style={[
                                            styles.bar,
                                            {
                                                height: `${(data.value / maxValue) * 100}%`,
                                                backgroundColor: colors.primary,
                                            }
                                        ]}
                                    />
                                </View>
                                <Text style={[styles.barLabel, { color: theme.textSecondary }]}>
                                    {data.month}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Top Performing Properties */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Top Performing Properties</Text>
                {topProperties.map((property, index) => (
                    <View
                        key={index}
                        style={[styles.propertyCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
                    >
                        <View style={styles.propertyRank}>
                            <Text style={[styles.rankNumber, { color: colors.primary }]}>#{index + 1}</Text>
                        </View>
                        <View style={styles.propertyInfo}>
                            <Text style={[styles.propertyName, { color: theme.text }]}>{property.name}</Text>
                            <View style={styles.propertyStats}>
                                <View style={styles.statItem}>
                                    <Ionicons name="home" size={14} color={theme.textSecondary} />
                                    <Text style={[styles.statItemText, { color: theme.textSecondary }]}>
                                        {property.sales} sales
                                    </Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Ionicons name="cash" size={14} color={theme.textSecondary} />
                                    <Text style={[styles.statItemText, { color: theme.textSecondary }]}>
                                        {property.revenue}
                                    </Text>
                                </View>
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: spacing.md,
        marginTop: spacing.md,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -spacing.xs,
        marginBottom: spacing.lg,
    },
    statCard: {
        width: '47%',
        margin: spacing.xs,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    statLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 4,
    },
    changeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    changeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#10B981',
        marginLeft: 4,
    },
    chartContainer: {
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        marginBottom: spacing.lg,
    },
    chart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 180,
    },
    barContainer: {
        flex: 1,
        alignItems: 'center',
    },
    barWrapper: {
        flex: 1,
        width: '70%',
        justifyContent: 'flex-end',
    },
    bar: {
        width: '100%',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        minHeight: 20,
    },
    barLabel: {
        fontSize: 11,
        marginTop: spacing.xs,
        fontWeight: '600',
    },
    propertyCard: {
        flexDirection: 'row',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        marginBottom: spacing.sm,
    },
    propertyRank: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: `${colors.primary}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    rankNumber: {
        fontSize: 16,
        fontWeight: '800',
    },
    propertyInfo: {
        flex: 1,
    },
    propertyName: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: spacing.xs,
    },
    propertyStats: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statItemText: {
        fontSize: 12,
    },
});

export default SalesAnalytics;
