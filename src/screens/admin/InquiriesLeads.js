import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';

const InquiriesLeads = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const [filter, setFilter] = useState('all');

    const inquiries = [
        { id: 1, name: 'Aisha Mohammed', property: 'Luxury Villa Estate', message: 'Interested in scheduling a viewing', date: '2 hours ago', status: 'New', priority: 'High' },
        { id: 2, name: 'David Chen', property: 'Modern Apartment', message: 'Would like more information about financing options', date: '5 hours ago', status: 'Responded', priority: 'Medium' },
        { id: 3, name: 'Sarah Johnson', property: 'Green View Residence', message: 'Can we negotiate the price?', date: '1 day ago', status: 'New', priority: 'High' },
        { id: 4, name: 'Ahmed Bello', property: 'Skyline Tower', message: 'What are the nearby amenities?', date: '2 days ago', status: 'Responded', priority: 'Low' },
    ];

    const filterOptions = [
        { label: 'All', value: 'all' },
        { label: 'New', value: 'new' },
        { label: 'Responded', value: 'responded' },
    ];

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return colors.error;
            case 'Medium': return colors.warning;
            case 'Low': return colors.textSecondary;
            default: return colors.textSecondary;
        }
    };

    const renderInquiry = ({ item }) => (
        <TouchableOpacity
            style={[styles.inquiryCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
            activeOpacity={0.7}
        >
            <View style={styles.inquiryHeader}>
                <View style={styles.inquiryInfo}>
                    <Text style={[styles.inquiryName, { color: theme.text }]}>{item.name}</Text>
                    <Text style={[styles.inquiryProperty, { color: theme.textSecondary }]}>
                        {item.property}
                    </Text>
                </View>
                <View style={styles.badges}>
                    <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(item.priority)}15` }]}>
                        <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                            {item.priority}
                        </Text>
                    </View>
                </View>
            </View>

            <Text style={[styles.inquiryMessage, { color: theme.textSecondary }]} numberOfLines={2}>
                {item.message}
            </Text>

            <View style={styles.inquiryFooter}>
                <View style={styles.timeRow}>
                    <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
                    <Text style={[styles.timeText, { color: theme.textSecondary }]}>{item.date}</Text>
                </View>
                <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === 'New' ? `${colors.secondary}15` : `${colors.primary}15` }
                ]}>
                    <Text style={[
                        styles.statusText,
                        { color: item.status === 'New' ? colors.secondary : colors.primary }
                    ]}>
                        {item.status}
                    </Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: `${colors.primary}15` }]}>
                    <Ionicons name="chatbubble-outline" size={16} color={colors.primary} />
                    <Text style={[styles.actionText, { color: colors.primary }]}>Respond</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: `${colors.secondary}15` }]}>
                    <Ionicons name="checkmark-circle-outline" size={16} color={colors.secondary} />
                    <Text style={[styles.actionText, { color: colors.secondary }]}>Mark Done</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="Inquiries & Leads"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <View style={styles.content}>
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
                    data={inquiries}
                    renderItem={renderInquiry}
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
    inquiryCard: {
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        marginBottom: spacing.md,
    },
    inquiryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.sm,
    },
    inquiryInfo: {
        flex: 1,
        marginRight: spacing.sm,
    },
    inquiryName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    inquiryProperty: {
        fontSize: 13,
    },
    badges: {
        flexDirection: 'row',
    },
    priorityBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    priorityText: {
        fontSize: 11,
        fontWeight: '700',
    },
    inquiryMessage: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: spacing.md,
    },
    inquiryFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeText: {
        fontSize: 12,
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
    actions: {
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
        gap: 6,
    },
    actionText: {
        fontSize: 13,
        fontWeight: '600',
    },
});

export default InquiriesLeads;
