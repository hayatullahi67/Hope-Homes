import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';

const Button = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    style
}) => {
    const { theme } = useTheme();
    const isSecondary = variant === 'secondary';
    const isOutline = variant === 'outline';

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                styles[size],
                isSecondary && styles.secondary,
                isOutline && [styles.outline, { borderColor: theme.primary }],
                disabled && [styles.disabled, { backgroundColor: theme.border, borderColor: theme.border }],
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={isOutline ? colors.primary : colors.white} />
            ) : (
                <Text style={[
                    styles.text,
                    styles[`text_${size}`],
                    isOutline && [styles.textOutline, { color: theme.primary }],
                    disabled && [styles.textDisabled, { color: theme.textSecondary }],
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    secondary: {
        backgroundColor: colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    disabled: {
        backgroundColor: colors.border,
        borderColor: colors.border,
    },
    md: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
    },
    sm: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    lg: {
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xxl,
    },
    text: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 16,
    },
    textOutline: {
        color: colors.primary,
    },
    textDisabled: {
        color: colors.textSecondary,
    },
    text_sm: {
        fontSize: 14,
    },
    text_lg: {
        fontSize: 18,
    },
});

export default Button;
