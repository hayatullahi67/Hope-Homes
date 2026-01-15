import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';

const InfluencerToggle = ({ isInfluencer, disabled, onToggle }) => {
    const { theme } = useTheme();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: theme.surface,
                borderColor: theme.border,
                opacity: disabled ? 0.5 : 1
            }
        ]}>
            <View style={styles.leftContent}>
                <View style={[styles.iconContainer, { backgroundColor: `${colors.secondary}15` }]}>
                    <Ionicons name="star" size={20} color={colors.secondary} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.label, { color: theme.text }]}>
                        I am an influencer
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        Get 10% off booking deposit
                    </Text>
                </View>
            </View>
            <Switch
                value={isInfluencer}
                onValueChange={onToggle}
                disabled={disabled}
                trackColor={{ false: theme.border, true: `${colors.secondary}80` }}
                thumbColor={isInfluencer ? colors.secondary : theme.surface}
                ios_backgroundColor={theme.border}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.md,
        borderWidth: 1,
        borderRadius: 12,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 12,
        marginTop: 2,
    },
});

export default InfluencerToggle;
