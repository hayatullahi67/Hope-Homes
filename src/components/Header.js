import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const Header = ({ title, showBack = false, onBackPress, rightIcon, onRightPress }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { paddingTop: insets.top + spacing.sm, backgroundColor: theme.surface }]}>
            <View style={styles.content}>
                {showBack ? (
                    <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
                        <Ionicons name="chevron-back" size={24} color={theme.text} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.placeholder} />
                )}

                <Text style={[styles.title, { color: theme.text }]}>{title}</Text>

                {rightIcon ? (
                    <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                        <Ionicons name={rightIcon} size={24} color={theme.text} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.placeholder} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholder: {
        width: 40,
    },
});

export default Header;
