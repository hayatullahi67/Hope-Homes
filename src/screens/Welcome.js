import { View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200' }}
                style={styles.backgroundImage}
            >
                <View style={styles.overlay} />

                <View style={[styles.content, {
                    paddingTop: insets.top + spacing.lg,
                    paddingBottom: insets.bottom + spacing.xl
                }]}>
                    <View style={styles.header}>
                        <Text style={styles.appName}>Hope Homes</Text>
                        <View style={styles.dot} />
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.tagline}>Find your dream home in the perfect location.</Text>
                        <Text style={styles.description}>
                            Explore thousands of luxury villas, modern apartments and cozy houses designed for your comfort.
                        </Text>

                        <Button
                            title="Get Started"
                            onPress={() => navigation.replace('Login')}
                            style={styles.button}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.xl,
        justifyContent: 'space-between',
        paddingVertical: spacing.xxl,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    appName: {
        fontSize: 40,
        fontWeight: '900',
        color: colors.white,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.secondary,
        marginLeft: 4,
    },
    footer: {
        marginBottom: spacing.xxl,
    },
    tagline: {
        fontSize: 32,
        fontWeight: '800',
        color: colors.white,
        lineHeight: 40,
    },
    description: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginTop: spacing.md,
        lineHeight: 24,
    },
    button: {
        marginTop: spacing.xl,
        height: 60,
    },
});

export default Welcome;
