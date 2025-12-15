import { SpaceGrotesk_300Light, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, useFonts } from '@expo-google-fonts/space-grotesk';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { responsiveHeight as hp, responsiveFontSize as rf, responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

// Card width calculated responsively (screen width - padding) / 2
const cardWidth = (wp(100) - wp(12)) / 2;

// Language data
const languages = [
    {
        id: 1,
        name: 'Python',
        level: 'Intermediate',
        progress: 45,
        isStarted: true,
        isFavorite: true,
        icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC53xLTDK5B2SBTSA26nDfoOWL0EcNO1r-Kv3132PG5wLkTkw4ydqPhM52wfBX1EmRJecM43V6N_u-91tQoGf8_gXRNpNsQI9oizKfJfimng8AHuK5RimvjWgTDz14Em9zvn2hc5kwyRf73BxliifTSSkoB30AHXflTM9osx0mUtQsi08K1A2gdgMIwxMGOQQN8_3d8xDKmnglh1KSfDWVxOfgd7paeah_YB142EBoh65zZbv_hBJJ7ERkV-VshlEvVMX5_tmNRWY',
    },
    {
        id: 2,
        name: 'JavaScript',
        level: 'Beginner Friendly',
        progress: 0,
        isStarted: false,
        isFavorite: false,
        description: 'Essential for modern web development.',
        badge: { icon: 'flash', color: '#eab308' },
        icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGTwiNcc33G-eQsGymvrNqgKB45ruMOvwOS2lmGv3XoCL_0JlwPIW3KJ_8AFB2FIvXWF8L7vMQURbLcXmU7BoCHh1I9Vve6fSE6PnWHwUVgjDOvX0SAp0K4OqmSghnfRU5TaZi--Og6ILEUqrWwBQgWDJdSs-YqLj008L8DwsRVJJ773LzDuEhr1NPHgVuprFQBOz630sdjPESOYdNWIAVrHAqREN45lIAjjzK3WuaqctcqfpaXJ05Ta7jUXBkdMggQl8Sltc0vPE',
    },
    {
        id: 3,
        name: 'Rust',
        level: 'Hard',
        progress: 0,
        isStarted: false,
        isFavorite: false,
        description: 'Performance and safety for systems.',
        badge: { icon: 'barbell', color: '#f97316' },
        icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOa24-I0tFjWL3MtJ2mZ1_rJzndEpZY2sE59M7SITBNQDzY64dIjz85LEkTnFvAjj3-UzgusRXFg8KVd_5ofxX0jpLXM3Ew68gbbv_jlrxwPI8DLsQCSj2XRT7QmSqgGc6Ex-OlyJ9KPt7v4oCcVVkZ5P8r9iIkKruMj84D_okJTcjwR9tOyMt6uQEEGrk0abKYL-F1xY1P289bYmP8YQXBrzULOxr6inEJ-XgluApZcJc_1ZS1wxA51xzbhPhEJWJFIhzS9cYc9c',
        invertIcon: true,
    },
    {
        id: 4,
        name: 'Swift',
        level: 'Mobile',
        progress: 0,
        isStarted: false,
        isFavorite: false,
        description: 'Build powerful apps for iOS.',
        badge: { icon: 'phone-portrait', color: '#60a5fa' },
        icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW-4GgWqp9nWi2LqNGbIxqqBy7zKflFL9okoKDZqcIehsh7vpiaoZdmgiV3bQnqoLw0OuiDoa49yTHVP1CnbXndSeN5NxChUQDYsDS9x5oMrkyuNq2wSv2bANTdgDbuHEbvhtvEuMMXV6FiHf6q0ury16F1uZaTR1euhVZylfUgA768Zz1qvOzGjCfhcsMQ15jtfvC8IHEgyTpw_pdGX1nsmRBfYptLfMTrhRIfTfw8EfRaUxgECwRk3GB6KOqTTQsZZS68gF53LA',
    },
    {
        id: 5,
        name: 'Go',
        level: 'Backend',
        progress: 0,
        isStarted: false,
        isFavorite: false,
        description: 'Scalable systems and cloud tools.',
        badge: { icon: 'server', color: '#22d3ee' },
        icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn36zAr3nVxs6O8BWBmjKd8dAtb4i-e3-0zT73d6TaVEq67AkrhVYyjM6rCEdu4QSFClOYh_AteHOjYU8RaYcmgtLC7FALypWFAjjaYwW8V6XM99S8Qz0uA6ljaGOGBjBOFHIG2V6TwYpHFQr65yIp7JDpT9Jk_a_GfQXa9JOQj0Ioht7TARWIt7IvmDnJ1ZwZbowKVD6Ol5IISlg9XUT0PWmGi7hYSE-JP7nvM_5bvt-fLAhI_0gL9zzMzDAfMJl0JbiLxXecx8E',
    },
    {
        id: 6,
        name: 'C++',
        level: 'Advanced',
        progress: 12,
        isStarted: true,
        isFavorite: true,
        icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ1ZtxLoVq_36KwztRzrbpYckwMq4x1Lv6MbgimUsaD30Fs1EQZFCtsnV2qr0vC5chrUHLCgynyBeWtlX3NELqjaybFFkvU9JbK75iYrRdCBlNY3DEqUCYB0Twp0c50EAv2dv4C_sBh8hyMVm5A7wqQYxAGRr3C5ZYlXDKHBbZitaSLC9FSAUGFMvX670hnEJ_X3q08mJ4Gzgi0lXdPQpDZXopIxmmzBvGTn2IN5cAzLOpgW5ZoYD-ngO_mw2cjcSCP4LzrUk49DY',
    },
];

const categories = ['All', 'Popular', 'Web Dev', 'Mobile', 'Data Science', 'Systems'];

export default function Practice() {
    const [searchQuery, setSearchQuery] = useState('');
    const [myLanguagesOnly, setMyLanguagesOnly] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    let [fontsLoaded] = useFonts({
        SpaceGrotesk_300Light,
        SpaceGrotesk_400Regular,
        SpaceGrotesk_500Medium,
        SpaceGrotesk_600SemiBold,
        SpaceGrotesk_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#102217" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back" size={rf(3.5)} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Languages</Text>
                    <View style={styles.spacer} />
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={rf(3)} color="#92c9a8" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Python, JS..."
                            placeholderTextColor="#92c9a8"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Toggle & Sort Section */}
                <View style={styles.toggleSortSection}>
                    <View style={styles.toggleContainer}>
                        <Text style={styles.toggleLabel}>My Languages</Text>
                        <Switch
                            value={myLanguagesOnly}
                            onValueChange={setMyLanguagesOnly}
                            trackColor={{ false: '#1b3325', true: '#2bee79' }}
                            thumbColor="#fff"
                            ios_backgroundColor="#1b3325"
                        />
                    </View>

                    <TouchableOpacity style={styles.sortButton}>
                        <Text style={styles.sortButtonText}>Recommended</Text>
                        <Ionicons name="swap-vertical" size={rf(2.5)} color="#2bee79" />
                    </TouchableOpacity>
                </View>

                {/* Categories Chips */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesScroll}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.categoryChip,
                                selectedCategory === category && styles.categoryChipActive,
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === category && styles.categoryTextActive,
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Language Cards Grid */}
                <View style={styles.cardsGrid}>
                    {languages.map((language) => (
                        <LanguageCard key={language.id} language={language} />
                    ))}
                </View>

                {/* Pagination Hint */}
                <View style={styles.paginationHint}>
                    <Text style={styles.paginationText}>Showing 6 of 42 languages</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function LanguageCard({ language }: { language: typeof languages[0] }) {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.95}>
            {/* Favorite Star */}
            <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons
                    name={language.isFavorite ? 'star' : 'star-outline'}
                    size={rf(2.8)}
                    color={language.isFavorite ? '#2bee79' : '#4a6555'}
                />
            </TouchableOpacity>

            {/* Icon Container */}
            <View style={styles.iconContainer}>
                <Image
                    source={{ uri: language.icon }}
                    style={[styles.languageIcon, language.invertIcon && styles.invertedIcon]}
                />
            </View>

            {/* Language Name */}
            <Text style={styles.languageName}>{language.name}</Text>

            {/* Level Badge */}
            <View style={styles.levelContainer}>
                {language.badge && (
                    <Ionicons name={language.badge.icon as any} size={rf(1.8)} color={language.badge.color} />
                )}
                <Text style={styles.levelText}>{language.level}</Text>
            </View>

            {/* Progress Bar or Description */}
            {language.isStarted ? (
                <>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${language.progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{language.progress}% Complete</Text>
                </>
            ) : (
                language.description && (
                    <Text style={styles.descriptionText} numberOfLines={2}>
                        {language.description}
                    </Text>
                )
            )}

            {/* Action Button */}
            <TouchableOpacity
                style={[
                    styles.actionButton,
                    language.isStarted && styles.actionButtonPrimary,
                ]}
            >
                <Text
                    style={[
                        styles.actionButtonText,
                        language.isStarted && styles.actionButtonTextPrimary,
                    ]}
                >
                    {language.isStarted ? 'Continue' : 'Start Learning'}
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#102217',
    },
    header: {
        backgroundColor: '#102217',
        paddingBottom: hp(1),
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
    },
    backButton: {
        padding: wp(2),
        marginLeft: wp(-2),
        borderRadius: 999,
    },
    headerTitle: {
        fontSize: rf(2.5),
        fontWeight: '700',
        color: '#fff',
        fontFamily: 'SpaceGrotesk_700Bold',
        textAlign: 'center',
        flex: 1,
    },
    spacer: {
        width: wp(11),
    },
    searchContainer: {
        paddingHorizontal: wp(4),
        paddingBottom: hp(1),
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1b3325',
        borderRadius: 999,
        height: hp(6),
        paddingHorizontal: wp(4),
    },
    searchIcon: {
        marginRight: wp(2),
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: rf(2),
        fontFamily: 'SpaceGrotesk_500Medium',
        height: '100%',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: hp(5),
    },
    toggleSortSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(3),
    },
    toggleLabel: {
        fontSize: rf(1.8),
        fontWeight: '500',
        color: '#fff',
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(1),
    },
    sortButtonText: {
        fontSize: rf(1.8),
        fontWeight: '500',
        color: '#2bee79',
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    categoriesScroll: {
        marginBottom: hp(2),
    },
    categoriesContainer: {
        paddingHorizontal: wp(4),
        gap: wp(2),
    },
    categoryChip: {
        height: hp(4.5),
        paddingHorizontal: wp(5),
        borderRadius: 999,
        backgroundColor: '#1b3325',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(2),
    },
    categoryChipActive: {
        backgroundColor: '#2bee79',
        shadowColor: '#2bee79',
        shadowOffset: { width: 0, height: hp(0.5) },
        shadowOpacity: 0.3,
        shadowRadius: wp(2),
        elevation: 4,
    },
    categoryText: {
        fontSize: rf(1.8),
        fontWeight: '500',
        color: '#fff',
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    categoryTextActive: {
        color: '#102217',
        fontWeight: '700',
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    cardsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: wp(4),
        gap: wp(4),
    },
    card: {
        width: cardWidth,
        backgroundColor: '#1b3325',
        borderRadius: wp(4),
        padding: wp(4),
        position: 'relative',
    },
    favoriteButton: {
        position: 'absolute',
        top: hp(1.5),
        right: wp(3),
        zIndex: 1,
    },
    iconContainer: {
        width: wp(14),
        height: wp(14),
        borderRadius: wp(4),
        backgroundColor: '#112218',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    languageIcon: {
        width: wp(8),
        height: wp(8),
    },
    invertedIcon: {
        tintColor: '#fff',
    },
    languageName: {
        fontSize: rf(2.2),
        fontWeight: '700',
        color: '#fff',
        fontFamily: 'SpaceGrotesk_700Bold',
        marginBottom: hp(0.5),
    },
    levelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(1),
        marginBottom: hp(1.5),
    },
    levelText: {
        fontSize: rf(1.5),
        fontWeight: '500',
        color: '#92c9a8',
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    progressBarContainer: {
        width: '100%',
        height: hp(0.75),
        backgroundColor: '#112218',
        borderRadius: wp(1),
        marginBottom: hp(1),
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#2bee79',
        borderRadius: wp(1),
    },
    progressText: {
        fontSize: rf(1.3),
        color: '#6b8a78',
        fontFamily: 'SpaceGrotesk_400Regular',
        marginBottom: hp(2),
    },
    descriptionText: {
        fontSize: rf(1.5),
        color: '#6b8a78',
        fontFamily: 'SpaceGrotesk_400Regular',
        lineHeight: hp(2.2),
        marginBottom: hp(2),
    },
    actionButton: {
        width: '100%',
        height: hp(5),
        borderRadius: 999,
        backgroundColor: '#112218',
        borderWidth: 1,
        borderColor: '#2a4a38',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
    },
    actionButtonPrimary: {
        backgroundColor: '#2bee79',
        borderColor: '#2bee79',
    },
    actionButtonText: {
        fontSize: rf(1.8),
        fontWeight: '700',
        color: '#fff',
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    actionButtonTextPrimary: {
        color: '#102217',
    },
    paginationHint: {
        alignItems: 'center',
        paddingVertical: hp(4),
    },
    paginationText: {
        fontSize: rf(1.8),
        color: '#4a6555',
        fontFamily: 'SpaceGrotesk_400Regular',
    },
});
