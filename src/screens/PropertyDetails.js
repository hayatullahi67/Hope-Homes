import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import Button from '../components/Button';
import BookingDepositSection from '../components/BookingDepositSection';

const PropertyDetails = ({ route, navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme, isDarkMode } = useTheme();
    const property = route.params?.property;

    if (!property) {
        return (
            <View style={[styles.container, { paddingTop: insets.top, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.background }]}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                <Text style={{ color: theme.text }}>Property not found</Text>
                <Button title="Go Back" onPress={() => navigation.goBack()} style={{ marginTop: spacing.md }} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: property.image }} style={styles.image} />
                    <View style={[styles.headerOverlay, { paddingTop: insets.top }]}>
                        <View style={styles.headerButtons}>
                            <TouchableOpacity
                                style={styles.circleButton}
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons name="chevron-back" size={24} color={colors.text} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={[styles.circleButton, { marginRight: spacing.sm }]}
                                    onPress={() => navigation.replace('Welcome')}
                                >
                                    <Ionicons name="log-out-outline" size={24} color={colors.primary} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.circleButton}>
                                    <Ionicons name="heart-outline" size={24} color={colors.text} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.content, { backgroundColor: theme.surface }]}>
                    <View style={styles.titleRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.title, { color: theme.text }]}>{property.title}</Text>
                            <View style={styles.locationContainer}>
                                <Ionicons name="location-outline" size={16} color={theme.textSecondary} />
                                <Text style={[styles.location, { color: theme.textSecondary }]}>{property.location}</Text>
                            </View>
                        </View>
                        <View style={styles.ratingBox}>
                            <Ionicons name="star" size={16} color="#FBBF24" />
                            <Text style={styles.ratingText}>4.8</Text>
                        </View>
                    </View>

                    <View style={styles.features}>
                        <View style={styles.featureItem}>
                            <View style={styles.featureIcon}>
                                <Ionicons name="bed-outline" size={20} color={colors.primary} />
                            </View>
                            <Text style={[styles.featureText, { color: theme.textSecondary }]}>{property.beds} Beds</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.featureIcon}>
                                <Ionicons name="water-outline" size={20} color={colors.primary} />
                            </View>
                            <Text style={[styles.featureText, { color: theme.textSecondary }]}>{property.baths} Baths</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.featureIcon}>
                                <Ionicons name="move-outline" size={20} color={colors.primary} />
                            </View>
                            <Text style={[styles.featureText, { color: theme.textSecondary }]}>{property.sqft} sqft</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Description</Text>
                        <Text style={[styles.description, { color: theme.textSecondary }]}>{property.description}</Text>
                    </View>

                    <BookingDepositSection />

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Agent Info</Text>
                        <View style={[styles.agentCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100' }}
                                style={styles.agentAvatar}
                            />
                            <View style={styles.agentInfo}>
                                <Text style={[styles.agentName, { color: theme.text }]}>David Adeleke</Text>
                                <Text style={[styles.agentRole, { color: theme.textSecondary }]}>Senior Real Estate Agent</Text>
                            </View>
                            <View style={styles.agentActions}>
                                <TouchableOpacity
                                    style={styles.agentActionButton}
                                    onPress={() => navigation.navigate('Chat', { property })}
                                >
                                    <Ionicons name="chatbubble-outline" size={20} color={colors.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={[styles.footer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                <View>
                    <Text style={[styles.footerLabel, { color: theme.textSecondary }]}>Total Price</Text>
                    <Text style={[styles.footerPrice, { color: colors.primary }]}>{property.price}</Text>
                </View>
                <Button
                    title="Contact Agent"
                    onPress={() => navigation.navigate('Chat', { property })}
                    style={styles.footerButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    imageContainer: {
        height: 350,
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    headerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        marginTop: spacing.sm,
    },
    circleButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: spacing.lg,
        marginTop: -spacing.xl,
        backgroundColor: colors.white,
        borderTopLeftRadius: borderRadius.xl,
        borderTopRightRadius: borderRadius.xl,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.text,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    location: {
        fontSize: 14,
        color: colors.textSecondary,
        marginLeft: 4,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFBEB',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#92400E',
        marginLeft: 4,
    },
    features: {
        flexDirection: 'row',
        marginTop: spacing.xl,
        justifyContent: 'space-between',
    },
    featureItem: {
        alignItems: 'center',
        flex: 1,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.md,
        backgroundColor: `${colors.primary}10`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    featureText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    section: {
        marginTop: spacing.xl,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.sm,
    },
    description: {
        fontSize: 15,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    agentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
    },
    agentAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    agentInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },
    agentName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
    },
    agentRole: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
    agentActionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.white,
    },
    footerLabel: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    footerPrice: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.primary,
    },
    footerButton: {
        flex: 1,
        marginLeft: spacing.lg,
        height: 54,
    },
});

export default PropertyDetails;
