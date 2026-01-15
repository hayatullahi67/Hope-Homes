import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const Profile = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    const menuItems = [
        { icon: 'heart-outline', label: 'My Favorites', count: 12, screen: 'Favorites' },
        { icon: 'notifications-outline', label: 'Notifications', screen: 'Notifications' },
        { icon: 'settings-outline', label: 'Account Settings', screen: 'Settings' },
        { icon: 'help-circle-outline', label: 'Help & Support', screen: 'Support' },
        { icon: 'log-out-outline', label: 'Log Out', color: colors.error },
    ];

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="Profile"
                rightIcon="log-out-outline"
                onRightPress={() => navigation.replace('Welcome')}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={[styles.profileHeader, { backgroundColor: theme.surface }]}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150' }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editButton}>
                            <Ionicons name="camera" size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.userName, { color: theme.text }]}>Hassan Ibrahim</Text>
                    <Text style={[styles.userEmail, { color: theme.textSecondary }]}>hassan.ibrahim@example.com</Text>
                </View>

                <View style={[styles.statsContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <View style={styles.statItem}>
                        <Text style={[styles.statValue, { color: theme.text }]}>24</Text>
                        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Viewed</Text>
                    </View>
                    <View style={[styles.statItem, styles.statBorder, { borderColor: theme.border }]}>
                        <Text style={[styles.statValue, { color: theme.text }]}>12</Text>
                        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Favorites</Text>
                    </View>
                </View>

                <View style={[styles.menuContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.menuItem,
                                index !== menuItems.length - 1 && [styles.menuItemBorder, { borderBottomColor: theme.border }],
                            ]}
                            onPress={() => item.screen ? navigation.navigate(item.screen) : navigation.replace('Welcome')}
                        >
                            <View style={styles.menuItemLeft}>
                                <View style={[styles.menuIcon, { backgroundColor: item.color ? `${item.color}15` : `${colors.primary}15` }]}>
                                    <Ionicons name={item.icon} size={22} color={item.color || colors.primary} />
                                </View>
                                <Text style={[styles.menuLabel, { color: item.color || theme.text }]}>{item.label}</Text>
                            </View>
                            {item.count && (
                                <View style={styles.countBadge}>
                                    <Text style={styles.countText}>{item.count}</Text>
                                </View>
                            )}
                            <Ionicons name="chevron-forward" size={20} color={theme.border} />
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
        backgroundColor: colors.background,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
        backgroundColor: colors.surface,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: spacing.md,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.white,
    },
    userName: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.text,
    },
    userEmail: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        paddingVertical: spacing.lg,
        marginTop: spacing.sm,
        marginHorizontal: spacing.md,
        borderRadius: borderRadius.lg,
        elevation: 2,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statBorder: {
        borderLeftWidth: 1,
        borderColor: colors.border,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.text,
    },
    statLabel: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
    menuContainer: {
        backgroundColor: colors.surface,
        marginTop: spacing.md,
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.xxl,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    menuLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    countBadge: {
        backgroundColor: colors.background,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginRight: spacing.sm,
    },
    countText: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.textSecondary,
    },
});

export default Profile;
