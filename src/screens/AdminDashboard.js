import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const AdminDashboard = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    const statsData = [
        { label: 'Total Properties', value: '156', icon: 'home', color: colors.primary, change: '+12%' },
        { label: 'Active Listings', value: '89', icon: 'list', color: '#10B981', change: '+8%' },
        { label: 'Total Sales', value: '67', icon: 'checkmark-circle', color: '#F59E0B', change: '+15%' },
        { label: 'Revenue', value: '₦2.4B', icon: 'trending-up', color: '#8B5CF6', change: '+23%' },
    ];

    const featureCards = [
        {
            id: 1,
            title: 'Property Management',
            description: 'Add, edit, and manage property listings',
            icon: 'business',
            color: colors.primary,
            gradient: ['#2B57EF', '#1E40AF'],
            screen: 'ManageProperties',
        },
        {
            id: 2,
            title: 'Sales Analytics',
            description: 'View sales reports and performance metrics',
            icon: 'stats-chart',
            color: '#10B981',
            gradient: ['#10B981', '#059669'],
            screen: 'SalesAnalytics',
        },
        {
            id: 3,
            title: 'User Management',
            description: 'Manage buyers and agent accounts',
            icon: 'people',
            color: '#F59E0B',
            gradient: ['#F59E0B', '#D97706'],
            screen: 'UserManagement',
        },
        {
            id: 4,
            title: 'Financial Reports',
            description: 'Track transactions and revenue',
            icon: 'wallet',
            color: '#8B5CF6',
            gradient: ['#8B5CF6', '#7C3AED'],
            screen: 'FinancialReports',
        },
        {
            id: 5,
            title: 'Inquiries & Leads',
            description: 'Manage customer inquiries and leads',
            icon: 'mail',
            color: '#EF4444',
            gradient: ['#EF4444', '#DC2626'],
            screen: 'InquiriesLeads',
        },
        // {
        //     id: 6,
        //     title: 'Settings',
        //     description: 'Configure platform settings',
        //     icon: 'settings',
        //     color: '#6B7280',
        //     gradient: ['#6B7280', '#4B5563'],
        //     screen: 'AdminSettings',
        // },
    ];

    const handleLogout = () => {
        navigation.replace('Welcome');
    };

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="Admin Dashboard"
                rightIcon="log-out-outline"
                onRightPress={handleLogout}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Welcome Section */}
                <View style={[styles.welcomeSection, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <View style={styles.welcomeContent}>
                        <View style={[styles.adminBadge, { backgroundColor: `${colors.primary}15` }]}>
                            <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
                        </View>
                        <View style={styles.welcomeText}>
                            <Text style={[styles.welcomeTitle, { color: theme.text }]}>Welcome Back, Admin</Text>
                            <Text style={[styles.welcomeSubtitle, { color: theme.textSecondary }]}>
                                Here's what's happening with your platform today
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Stats Overview */}
                <View style={styles.statsGrid}>
                    {statsData.map((stat, index) => (
                        <View
                            key={index}
                            style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
                        >
                            <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                                <Ionicons name={stat.icon} size={24} color={stat.color} />
                            </View>
                            <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
                            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
                            <View style={styles.statChange}>
                                <Ionicons name="trending-up" size={12} color="#10B981" />
                                <Text style={styles.statChangeText}>{stat.change}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Feature Cards */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Actions</Text>
                <View style={styles.featuresGrid}>
                    {featureCards.map((card) => (
                        <TouchableOpacity
                            key={card.id}
                            style={[styles.featureCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
                            onPress={() => navigation.navigate(card.screen)}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={card.gradient}
                                style={styles.featureIconContainer}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Ionicons name={card.icon} size={28} color="#FFFFFF" />
                            </LinearGradient>
                            <Text style={[styles.featureTitle, { color: theme.text }]}>{card.title}</Text>
                            <Text style={[styles.featureDescription, { color: theme.textSecondary }]}>
                                {card.description}
                            </Text>
                            <View style={styles.featureArrow}>
                                <Ionicons name="arrow-forward" size={18} color={card.color} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
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
    welcomeSection: {
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        padding: spacing.lg,
        marginBottom: spacing.xl,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    welcomeContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    adminBadge: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    welcomeText: {
        flex: 1,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 4,
    },
    welcomeSubtitle: {
        fontSize: 14,
        lineHeight: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -spacing.xs,
        marginBottom: spacing.xl,
    },
    statCard: {
        width: '47%',
        margin: spacing.xs,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    statIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        marginBottom: spacing.xs,
    },
    statChange: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statChangeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#10B981',
        marginLeft: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: spacing.md,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -spacing.xs,
    },
    featureCard: {
        width: '47%',
        margin: spacing.xs,
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    featureIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    featureTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: spacing.xs,
    },
    featureDescription: {
        fontSize: 12,
        lineHeight: 18,
        marginBottom: spacing.md,
    },
    featureArrow: {
        alignSelf: 'flex-start',
    },
});

export default AdminDashboard;
