import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';

const PropertyCard = React.memo(({ item, onPress }) => {
    const { theme } = useTheme();
    if (!item) return null;

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={() => onPress(item)}
        >
            <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
            />

            <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons name="heart-outline" size={20} color={colors.white} />
            </TouchableOpacity>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.price}>{item.price}</Text>
                    <View style={styles.rating}>
                        <Ionicons name="star" size={14} color="#FBBF24" />
                        <Text style={[styles.ratingText, { color: theme.isDarkMode ? '#FDE68A' : '#92400E' }]}>4.8</Text>
                    </View>
                </View>

                <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{item.title}</Text>

                <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={14} color={theme.textSecondary} />
                    <Text style={[styles.location, { color: theme.textSecondary }]} numberOfLines={1}>{item.location}</Text>
                </View>

                <View style={styles.details}>
                    <View style={styles.detailItem}>
                        <Ionicons name="bed-outline" size={16} color={colors.textSecondary} />
                        <Text style={styles.detailText}>{item.beds} Beds</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Ionicons name="water-outline" size={16} color={colors.textSecondary} />
                        <Text style={styles.detailText}>{item.baths} Baths</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Ionicons name="move-outline" size={16} color={theme.textSecondary} />
                        <Text style={[styles.detailText, { color: theme.textSecondary }]}>{item.sqft} sqft</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.border,
        elevation: 3,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 200,
    },
    favoriteButton: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.primary,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFBEB',
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: spacing.xs,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#92400E',
        marginLeft: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginTop: spacing.xs,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.xs,
    },
    location: {
        fontSize: 14,
        color: colors.textSecondary,
        marginLeft: 4,
    },
    details: {
        flexDirection: 'row',
        marginTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: spacing.sm,
        justifyContent: 'space-between',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginLeft: 4,
    },
});

export default PropertyCard;
