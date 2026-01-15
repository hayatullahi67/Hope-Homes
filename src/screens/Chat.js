import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const Chat = ({ route, navigation }) => {
    const insets = useSafeAreaInsets();
    const { theme, isDarkMode } = useTheme();
    const { property } = route.params;
    const agentName = "Agent Hassan";

    const [messages, setMessages] = useState([
        {
            id: '1',
            text: `Hi! I'm interested in the ${property?.title || 'property'}. Is it still available?`,
            sender: 'user',
            time: '10:00 AM',
        },
        {
            id: '2',
            text: `Yes, it is! Would you like to schedule a viewing?`,
            sender: 'agent',
            time: '10:05 AM',
        },
    ]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim() === '') return;

        const newMessage = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText('');
    };

    const renderMessage = ({ item }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[
                styles.messageBubble,
                isUser ? styles.userBubble : [styles.agentBubble, { backgroundColor: theme.isDarkMode ? '#2A2A2A' : '#F3F4F6', borderColor: theme.border }]
            ]}>
                <Text style={[
                    styles.messageText,
                    isUser ? styles.userText : { color: theme.text }
                ]}>
                    {item.text}
                </Text>
                <Text style={[
                    styles.messageTime,
                    isUser ? styles.userTime : { color: theme.textSecondary }
                ]}>
                    {item.time}
                </Text>
            </View>
        );
    };

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom, backgroundColor: theme.background }]}>
            <Header
                title={agentName}
                showBack
                onBackPress={() => navigation.goBack()}
                rightIcon="call-outline"
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messagesList}
                    showsVerticalScrollIndicator={false}
                />

                <View style={[styles.inputContainer, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
                    <TouchableOpacity style={[styles.attachButton, { backgroundColor: theme.isDarkMode ? `${colors.primary}20` : `${colors.primary}10` }]}>
                        <Ionicons name="add" size={24} color={colors.primary} />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.isDarkMode ? '#2A2A2A' : '#F3F4F6', color: theme.text }]}
                        placeholder="Type a message..."
                        placeholderTextColor={theme.textSecondary}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, !inputText.trim() && { opacity: 0.5 }]}
                        onPress={sendMessage}
                    >
                        <Ionicons name="send" size={20} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    messageList: {
        padding: spacing.md,
    },
    messageWrapper: {
        flexDirection: 'row',
        marginBottom: spacing.md,
        maxWidth: '80%',
    },
    userMessageWrapper: {
        alignSelf: 'flex-end',
    },
    agentMessageWrapper: {
        alignSelf: 'flex-start',
    },
    agentAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: spacing.sm,
        marginTop: 4,
    },
    messageBubble: {
        padding: spacing.md,
        borderRadius: borderRadius.lg,
    },
    userBubble: {
        backgroundColor: colors.primary,
        borderBottomRightRadius: 4,
    },
    agentBubble: {
        backgroundColor: colors.surface,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },
    userText: {
        color: colors.white,
    },
    agentText: {
        color: colors.text,
    },
    timeText: {
        fontSize: 10,
        marginTop: 4,
    },
    userTime: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'right',
    },
    agentTime: {
        color: colors.textSecondary,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    attachButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: 20,
        paddingHorizontal: spacing.md,
        paddingVertical: 10,
        maxHeight: 100,
        fontSize: 15,
        color: colors.text,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: spacing.sm,
    },
    sendButtonDisabled: {
        backgroundColor: colors.border,
    },
});

export default Chat;
