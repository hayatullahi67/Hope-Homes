import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import Header from '../components/Header';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';

const Support = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme, isDarkMode } = useTheme();
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqs = [
        {
            question: "How do I book a viewing?",
            answer: "To book a viewing, simply go to the property details page and click the 'Contact Agent' button at the bottom. You can then chat with the agent to schedule a convenient time."
        },
        {
            question: "Are the prices negotiable?",
            answer: "Most property prices are slightly negotiable. We recommend discussing this directly with the listing agent through our in-app chat feature."
        },
        {
            question: "Is there a service fee for buyers?",
            answer: "No, we do not charge buyers any service fees. Our platform is free for users looking to find and purchase properties."
        },
        {
            question: "How do I add a property to my favorites?",
            answer: "You can add any property to your favorites by tapping the heart icon on either the property card or the property details page."
        }
    ];

    const toggleExpand = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const ContactCard = ({ icon, title, subtitle, color }) => (
        <TouchableOpacity style={[styles.contactCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={[styles.contactIcon, { backgroundColor: `${color}10` }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: theme.text }]}>{title}</Text>
                <Text style={[styles.contactSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.border} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title="Help & Support"
                showBack
                onBackPress={() => navigation.goBack()}
                rightIcon="log-out-outline"
                onRightPress={() => navigation.replace('Welcome')}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.heroSection}>
                    <View style={[styles.heroIconContainer, { backgroundColor: isDarkMode ? `${colors.primary}30` : `${colors.primary}10` }]}>
                        <Ionicons name="help-buoy" size={48} color={colors.primary} />
                    </View>
                    <Text style={[styles.heroTitle, { color: theme.text }]}>How can we help you?</Text>
                    <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>Browse our FAQs or reach out to our team directly.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionHeader, { color: theme.text }]}>Common Questions</Text>
                    {faqs.map((faq, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.faqItem, { backgroundColor: theme.surface, borderColor: theme.border }]}
                            onPress={() => toggleExpand(index)}
                        >
                            <View style={styles.faqHeader}>
                                <Text style={[styles.question, { color: theme.text }]}>{faq.question}</Text>
                                <Ionicons
                                    name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                                    size={20}
                                    color={theme.textSecondary}
                                />
                            </View>
                            {expandedIndex === index && (
                                <Text style={[styles.answer, { color: theme.textSecondary }]}>{faq.answer}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionHeader, { color: theme.text }]}>Contact Us</Text>
                    <ContactCard
                        icon="chatbubbles-outline"
                        title="Live Chat"
                        subtitle="Talk to our support team right now"
                        color={colors.primary}
                    />
                    <ContactCard
                        icon="mail-outline"
                        title="Email Support"
                        subtitle="We typically reply within 24 hours"
                        color="#6366F1"
                    />
                    <ContactCard
                        icon="call-outline"
                        title="Phone Support"
                        subtitle="Available Mon-Fri, 9am - 6pm"
                        color="#10B981"
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: theme.textSecondary }]}>App Version 1.0.0</Text>
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
    scrollContent: {
        padding: spacing.md,
    },
    heroSection: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
        marginBottom: spacing.lg,
    },
    heroIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: `${colors.primary}10`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.text,
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: 4,
        paddingHorizontal: spacing.xl,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.md,
    },
    faqItem: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    question: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
        flex: 1,
        marginRight: spacing.md,
    },
    answer: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
        marginTop: spacing.md,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
    },
    contactIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    contactInfo: {
        flex: 1,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
    },
    contactSubtitle: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
    footer: {
        paddingVertical: spacing.xl,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: colors.textSecondary,
    },
});

export default Support;
