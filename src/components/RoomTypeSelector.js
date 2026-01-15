import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';

const ROOM_OPTIONS = [
    { id: 'gold', name: 'Gold Room', rooms: '1 Room', price: 30000 },
    { id: 'platinum', name: 'Platinum Room', rooms: '2 Rooms', price: 40000 },
    { id: 'royal', name: 'Royal Room', rooms: '3 Rooms', price: 50000 },
];

const RoomTypeSelector = ({ selectedRoom, onSelectRoom }) => {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            {ROOM_OPTIONS.map((room) => {
                const isSelected = selectedRoom === room.id;
                return (
                    <TouchableOpacity
                        key={room.id}
                        style={[
                            styles.roomCard,
                            {
                                backgroundColor: theme.surface,
                                borderColor: isSelected ? colors.primary : theme.border
                            },
                            isSelected && styles.selectedCard,
                        ]}
                        onPress={() => onSelectRoom(room.id)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.radioContainer}>
                            <View style={[
                                styles.radioOuter,
                                { borderColor: isSelected ? colors.primary : theme.border }
                            ]}>
                                {isSelected && <View style={styles.radioInner} />}
                            </View>
                        </View>
                        <View style={styles.roomInfo}>
                            <Text style={[styles.roomName, { color: theme.text }]}>{room.name}</Text>
                            <Text style={[styles.roomDetails, { color: theme.textSecondary }]}>{room.rooms}</Text>
                        </View>
                        <Text style={[styles.roomPrice, { color: isSelected ? colors.primary : theme.text }]}>
                            ₦{room.price.toLocaleString()}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.sm,
    },
    roomCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        borderWidth: 2,
    },
    selectedCard: {
        borderWidth: 2,
        elevation: 2,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    radioContainer: {
        marginRight: spacing.md,
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
    },
    roomInfo: {
        flex: 1,
    },
    roomName: {
        fontSize: 16,
        fontWeight: '700',
    },
    roomDetails: {
        fontSize: 13,
        marginTop: 2,
    },
    roomPrice: {
        fontSize: 16,
        fontWeight: '800',
    },
});

export default RoomTypeSelector;
export { ROOM_OPTIONS };
