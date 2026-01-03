import { SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, useFonts } from '@expo-google-fonts/space-grotesk';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { responsiveHeight as hp, responsiveFontSize as rf, responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

// Settings items data
const accountSettings = [
    { id: 1, icon: 'person-outline', title: 'Edit Profile', hasChevron: true },
    { id: 2, icon: 'lock-closed-outline', title: 'Change Password', hasChevron: true },
    { id: 3, icon: 'link-outline', title: 'Linked Accounts', subtitle: 'GitHub, Google', hasChevron: true },
    { id: 4, icon: 'trash-outline', title: 'Delete Account', isDestructive: true },
];

const learningPreferences = [
    { id: 1, icon: 'code-slash-outline', title: 'Default Language', value: 'Python', hasChevron: true },
    { id: 2, icon: 'cellular-outline', title: 'Difficulty', value: 'Intermediate', hasChevron: true },
    { id: 3, icon: 'timer-outline', title: 'Daily Goal', value: '15 mins', isPrimary: true, hasChevron: true },
];

const appPreferences = [
    { id: 1, icon: 'moon-outline', title: 'Theme', value: 'System Default', hasChevron: true },
    { id: 2, icon: 'options-outline', title: 'Code Editor', hasChevron: true },
    { id: 3, icon: 'accessibility-outline', title: 'Accessibility', hasChevron: true },
];

const supportLegal = [
    { id: 1, icon: 'help-circle-outline', title: 'Help Center', hasChevron: true },
    { id: 2, icon: 'bug-outline', title: 'Report a Bug', hasChevron: true },
    { id: 3, icon: 'document-text-outline', title: 'Privacy Policy', hasChevron: true },
];

export default function Setting() {
    const [reminders, setReminders] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(false);

    let [fontsLoaded] = useFonts({
        SpaceGrotesk_400Regular,
        SpaceGrotesk_500Medium,
        SpaceGrotesk_600SemiBold,
        SpaceGrotesk_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const renderSettingItem = (
        item: { id: number; icon: string; title: string; subtitle?: string; value?: string; hasChevron?: boolean; isDestructive?: boolean; isPrimary?: boolean },
        isLast: boolean = false
    ) => (
        <TouchableOpacity
            key={item.id}
            style={[
                styles.settingItem,
                !isLast && styles.settingItemBorder,
            ]}
            activeOpacity={0.7}
        >
            <View style={[styles.settingIcon, item.isDestructive && styles.destructiveIcon]}>
                <Ionicons
                    name={item.icon as any}
                    size={rf(2.8)}
                    color={item.isDestructive ? '#ef4444' : '#2bee79'}
                />
            </View>
            <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, item.isDestructive && styles.destructiveTitle]}>
                    {item.title}
                </Text>
                {item.subtitle && <Text style={styles.settingSubtitle}>{item.subtitle}</Text>}
            </View>
            {item.value && (
                <Text style={[styles.settingValue, item.isPrimary && styles.settingValuePrimary]}>
                    {item.value}
                </Text>
            )}
            {item.hasChevron && (
                <Ionicons name="chevron-forward" size={rf(2.5)} color="#6b7280" />
            )}
        </TouchableOpacity>
    );

    const renderToggleItem = (
        title: string,
        subtitle: string | null,
        value: boolean,
        onValueChange: (val: boolean) => void,
        icon?: string,
        isLast: boolean = false
    ) => (
        <View style={[styles.settingItem, !isLast && styles.settingItemBorder]}>
            {icon && (
                <Ionicons name={icon as any} size={rf(2.8)} color="#6b7280" style={styles.toggleIcon} />
            )}
            <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{title}</Text>
                {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#374151', true: '#2bee79' }}
                thumbColor="#fff"
                ios_backgroundColor="#374151"
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#102217" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="chevron-back" size={rf(3)} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Account Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Settings</Text>
                    <View style={styles.sectionCard}>
                        {accountSettings.map((item, index) =>
                            renderSettingItem(item, index === accountSettings.length - 1)
                        )}
                    </View>
                </View>

                {/* Learning Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Learning Preferences</Text>
                    <View style={styles.sectionCard}>
                        {learningPreferences.map((item, index) =>
                            renderSettingItem(item, index === learningPreferences.length - 1)
                        )}
                        {renderToggleItem('Reminders', null, reminders, setReminders, 'notifications-outline', true)}
                    </View>
                </View>

                {/* Notifications Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications</Text>
                    <View style={styles.sectionCard}>
                        {renderToggleItem('Push Notifications', 'Streaks, Challenges, Friends', pushNotifications, setPushNotifications)}
                        {renderToggleItem('Email Updates', 'Newsletters, Product Updates', emailUpdates, setEmailUpdates, undefined, true)}
                    </View>
                </View>

                {/* App Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App Preferences</Text>
                    <View style={styles.sectionCard}>
                        {appPreferences.map((item, index) =>
                            renderSettingItem(item, index === appPreferences.length - 1)
                        )}
                    </View>
                </View>

                {/* Support & Legal Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support & Legal</Text>
                    <View style={styles.sectionCard}>
                        {supportLegal.map((item, index) =>
                            renderSettingItem(item, index === supportLegal.length - 1)
                        )}
                    </View>
                </View>

                {/* Logout Button */}
                <View style={styles.logoutSection}>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.logoutButtonText}>Log Out</Text>
                    </TouchableOpacity>
                    <Text style={styles.versionText}>Version 2.4.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#102217',
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    backButton: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: rf(2.3),
        fontWeight: '700',
        color: '#fff',
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    headerSpacer: {
        width: wp(10),
    },

    // ScrollView
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: wp(4),
        paddingTop: hp(2),
        paddingBottom: hp(5),
    },

    // Section
    section: {
        marginBottom: hp(3),
    },
    sectionTitle: {
        fontSize: rf(1.4),
        fontWeight: '700',
        color: '#92c9a8',
        fontFamily: 'SpaceGrotesk_700Bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: hp(1.5),
        marginLeft: wp(2),
    },
    sectionCard: {
        backgroundColor: '#182e22',
        borderRadius: wp(4),
        overflow: 'hidden',
    },

    // Setting Item
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(4),
        gap: wp(4),
    },
    settingItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    settingIcon: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: 'rgba(43, 238, 121, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    destructiveIcon: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: rf(2),
        fontWeight: '500',
        color: '#fff',
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    destructiveTitle: {
        color: '#ef4444',
    },
    settingSubtitle: {
        fontSize: rf(1.4),
        color: '#6b7280',
        fontFamily: 'SpaceGrotesk_400Regular',
        marginTop: hp(0.3),
    },
    settingValue: {
        fontSize: rf(1.7),
        color: '#9ca3af',
        fontFamily: 'SpaceGrotesk_400Regular',
    },
    settingValuePrimary: {
        color: '#2bee79',
        fontWeight: '700',
        fontFamily: 'SpaceGrotesk_700Bold',
    },

    // Toggle Item
    toggleIcon: {
        marginRight: wp(-1),
    },

    // Logout Section
    logoutSection: {
        alignItems: 'center',
        paddingTop: hp(2),
        gap: hp(2),
    },
    logoutButton: {
        width: '100%',
        height: hp(7),
        backgroundColor: '#2bee79',
        borderRadius: wp(7),
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButtonText: {
        fontSize: rf(2.2),
        fontWeight: '700',
        color: '#102217',
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    versionText: {
        fontSize: rf(1.4),
        color: '#6b7280',
        fontFamily: 'SpaceGrotesk_400Regular',
    },
});