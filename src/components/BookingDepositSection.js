import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';
import RoomTypeSelector, { ROOM_OPTIONS } from './RoomTypeSelector';
import InfluencerToggle from './InfluencerToggle';
import PriceBreakdown from './PriceBreakdown';
import Button from './Button';

const BookingDepositSection = () => {
    const { theme } = useTheme();
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isInfluencer, setIsInfluencer] = useState(false);

    // Memoized price calculations - only recalculate when dependencies change
    const priceData = useMemo(() => {
        if (!selectedRoom) {
            return { baseDeposit: 0, discount: 0, total: 0 };
        }

        const room = ROOM_OPTIONS.find(r => r.id === selectedRoom);
        const baseDeposit = room?.price || 0;
        const discount = isInfluencer ? Math.round(baseDeposit * 0.1) : 0;
        const total = baseDeposit - discount;

        return { baseDeposit, discount, total };
    }, [selectedRoom, isInfluencer]);

    // Stable callback references
    const handleRoomSelect = useCallback((roomId) => {
        setSelectedRoom(roomId);
        // Reset influencer toggle when changing rooms
        if (roomId !== selectedRoom) {
            setIsInfluencer(false);
        }
    }, [selectedRoom]);

    const handleInfluencerToggle = useCallback(() => {
        setIsInfluencer(prev => !prev);
    }, []);

    const handleProceedToBook = useCallback(() => {
        // UI-only - no payment logic
        console.log('Proceed to book:', {
            room: selectedRoom,
            isInfluencer,
            total: priceData.total
        });
    }, [selectedRoom, isInfluencer, priceData.total]);

    return (
        <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.text }]}>Booking Deposit</Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                    One-time upfront payment to reserve this property.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionLabel, { color: theme.text }]}>Select Room Type</Text>
                <RoomTypeSelector
                    selectedRoom={selectedRoom}
                    onSelectRoom={handleRoomSelect}
                />
            </View>

            <View style={styles.section}>
                <InfluencerToggle
                    isInfluencer={isInfluencer}
                    disabled={!selectedRoom}
                    onToggle={handleInfluencerToggle}
                />
            </View>

            {selectedRoom && (
                <View style={styles.section}>
                    <PriceBreakdown
                        baseDeposit={priceData.baseDeposit}
                        discount={priceData.discount}
                        total={priceData.total}
                        isInfluencer={isInfluencer}
                    />
                </View>
            )}

            <Button
                title="Proceed to Book"
                onPress={handleProceedToBook}
                disabled={!selectedRoom}
                style={styles.bookButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        borderWidth: 1,
        marginTop: spacing.lg,
    },
    header: {
        marginBottom: spacing.lg,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: 13,
        lineHeight: 18,
    },
    section: {
        marginBottom: spacing.md,
    },
    sectionLabel: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: spacing.sm,
    },
    bookButton: {
        marginTop: spacing.sm,
    },
});

export default BookingDepositSection;
