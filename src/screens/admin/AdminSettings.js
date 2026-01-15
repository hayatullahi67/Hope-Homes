import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';

const AdminSettings = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    const settingsOptions = [
        {
            section: 'Platform',
            items: [
                { icon: 'business-outline', label: 'Platform Information', color: colors.primary },
                { icon: 'notifications-outline', label: 'Notification Settings', color: '#10B981' },
                { icon: 'shield-checkmark-outline', label: 'Security Settings', color: '#F59E0B' },
            ]
        },
        {
            section: 'Content',
            items: [
                { icon: 'pricetag-outline', label: 'Property Categories', color: '#8B5CF6' },
                { icon: 'location-outline', label: 'Manage Locations', color: '#EF4444' },
                { icon: 'images-outline', label: 'Media Library', color: '#06B6D4' },
            ]
        },
        {
            section: 'System',
            items: [
                { icon: 'server-outline', label: 'Database Backup', color: '#6B7280' },
                { icon: 'download-outline', label: 'Export Data', color: '#10B981' },
                { icon: 'trash-outline', label: 'Clear Cache', color: '#EF4444' },
            ]
        },
    ];

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="Settings"
                showBack
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {settingsOptions.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
                            {section.section}
                        </Text>
                        <View style={[styles.sectionCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                            {section.items.map((item, itemIndex) => (
                                <TouchableOpacity
                                    key={itemIndex}
                                    style={[
                                        styles.settingItem,
                                        itemIndex !== section.items.length - 1 && [styles.settingItemBorder, { borderBottomColor: theme.border }]
                                    ]}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.settingIcon, { backgroundColor: `${item.color}15` }]}>
                                        <Ionicons name={item.icon} size={22} color={item.color} />
                                    </View>
                                    <Text style={[styles.settingLabel, { color: theme.text }]}>{item.label}</Text>
                                    <Ionicons name="chevron-forward" size={20} color={theme.border} />
                                </TouchableOpacity>
                            ))}
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
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: spacing.sm,
    },
    sectionCard: {
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        overflow: 'hidden',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
    },
    settingItemBorder: {
        borderBottomWidth: 1,
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    settingLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
    },
});

export default AdminSettings;
