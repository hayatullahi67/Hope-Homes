import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';

import { useTheme } from '../context/ThemeContext';

const Settings = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { isDarkMode, toggleDarkMode, theme } = useTheme();
    const darkMode = isDarkMode;
    const setDarkMode = toggleDarkMode;

    const SettingRow = ({ icon, label, type = 'chevron', value, onValueChange }) => (
        <TouchableOpacity
            style={[styles.settingRow, { borderBottomColor: theme.border }]}
            activeOpacity={0.7}
            disabled={type === 'switch'}
        >
            <View style={styles.leftContent}>
                <View style={[styles.iconContainer, { backgroundColor: darkMode ? `${colors.primary}30` : `${colors.primary}10` }]}>
                    <Ionicons name={icon} size={22} color={colors.primary} />
                </View>
                <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
            </View>
            {type === 'chevron' && (
                <Ionicons name="chevron-forward" size={20} color={theme.border} />
            )}
            {type === 'switch' && (
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: theme.border, true: colors.primary }}
                    thumbColor={colors.white}
                />
            )}
        </TouchableOpacity>
    );

    const Section = ({ title, children }) => (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{title}</Text>
            <View style={[styles.sectionContent, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                {children}
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="Account Settings"
                showBack
                onBackPress={() => navigation.goBack()}
                rightIcon="log-out-outline"
                onRightPress={() => navigation.replace('Welcome')}
                darkMode={darkMode}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Section title="Profile Information">
                    <SettingRow icon="person-outline" label="Edit Profile" />
                    <SettingRow icon="mail-outline" label="Change Email" />
                    <SettingRow icon="lock-closed-outline" label="Change Password" />
                </Section>

                {/* Notifications section hidden for now */}
                {/* 
                <Section title="Notifications">
                    <SettingRow 
                        icon="notifications-outline" 
                        label="Push Notifications" 
                        type="switch" 
                        value={pushEnabled}
                        onValueChange={setPushEnabled}
                    />
                    <SettingRow 
                        icon="at-outline" 
                        label="Email Notifications" 
                        type="switch" 
                        value={emailEnabled}
                        onValueChange={setEmailEnabled}
                    />
                </Section>
                */}

                <Section title="Preferences">
                    <SettingRow
                        icon="moon-outline"
                        label="Dark Mode"
                        type="switch"
                        value={darkMode}
                        onValueChange={setDarkMode}
                    />
                    <SettingRow icon="earth-outline" label="Language" />
                </Section>

                {/* Security & Privacy section hidden for now */}
                {/* 
                <Section title="Security & Privacy">
                    <SettingRow icon="shield-checkmark-outline" label="Two-Factor Authentication" />
                    <SettingRow icon="eye-off-outline" label="Privacy Settings" />
                </Section>
                */}

                <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Delete Account</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        padding: spacing.md,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.textSecondary,
        textTransform: 'uppercase',
        marginBottom: spacing.sm,
        marginLeft: spacing.xs,
    },
    sectionContent: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: `${colors.primary}10`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    deleteButton: {
        marginTop: spacing.md,
        padding: spacing.md,
        alignItems: 'center',
    },
    deleteText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.error,
    },
});

export default Settings;
