import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveHeight as hp, responsiveFontSize as rf, responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

// Expertise options data
const expertiseOptions = [
    {
        id: 1,
        title: 'Web Development',
        description: 'React, HTML, CSS',
        icon: 'web',
        iconType: 'MaterialCommunityIcons',
    },
    {
        id: 2,
        title: 'Mobile Development',
        description: 'Swift, React Native',
        icon: 'phone-portrait',
        iconType: 'Ionicons',
    },
    {
        id: 3,
        title: 'Data Science',
        description: 'Python, R, Pandas',
        icon: 'bar-graph',
        iconType: 'Entypo',
    },
    {
        id: 4,
        title: 'General Programming',
        description: 'C++, Java, Algorithms',
        icon: 'terminal',
        iconType: 'MaterialIcons',
    },
];

const Expertise = () => {
    const [selectedExpertise, setSelectedExpertise] = useState<number | null>(null);

    const renderIcon = (iconType: string, icon: string) => {
        const iconSize = rf(3.2);
        const iconColor = 'black';

        switch (iconType) {
            case 'MaterialCommunityIcons':
                return <MaterialCommunityIcons name={icon as any} size={iconSize} color={iconColor} />;
            case 'MaterialIcons':
                return <MaterialIcons name={icon as any} size={iconSize} color={iconColor} />;
            case 'Ionicons':
                return <Ionicons name={icon as any} size={iconSize} color={iconColor} />;
            case 'Entypo':
                return <Entypo name={icon as any} size={iconSize} color={iconColor} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>What do you want to</Text>
                    <Text style={styles.titleTextBold}>learn?</Text>
                </View>
                <Text style={styles.subtitleText}>We'll tailor your curriculum based on your</Text>
                <Text style={styles.subtitleText}>choice.</Text>
            </View>

            {/* Expertise Options */}
            <View style={styles.optionsContainer}>
                {expertiseOptions.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.optionCard,
                            selectedExpertise === option.id && styles.optionCardSelected,
                        ]}
                        onPress={() => setSelectedExpertise(option.id)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.iconContainer}>
                            {renderIcon(option.iconType, option.icon)}
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionTitle}>{option.title}</Text>
                            <Text style={styles.optionDescription}>{option.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Bottom Button */}
            <View style={styles.bottomButtonContainer}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Expertise;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111d15',
    },

    // Header Styles
    headerContainer: {
        alignItems: 'center',
        marginTop: hp(2),
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: hp(1),
    },
    titleText: {
        fontSize: rf(4),
        fontWeight: '700',
        color: '#ffffff',
    },
    titleTextBold: {
        fontSize: rf(4),
        fontWeight: '800',
        color: '#ffffff',
    },
    subtitleText: {
        fontSize: rf(2.2),
        fontWeight: '500',
        color: '#a0b4a6',
        marginTop: hp(0.5),
    },

    // Options Styles
    optionsContainer: {
        alignItems: 'center',
        marginTop: hp(3),
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp(90),
        padding: wp(2.5),
        marginBottom: hp(2),
        borderRadius: wp(10),
        borderWidth: 3,
        borderColor: '#193324',
        backgroundColor: '#193324',
    },
    optionCardSelected: {
        borderColor: '#2bee79',
    },
    iconContainer: {
        width: wp(13),
        height: wp(13),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(6.5),
        backgroundColor: '#2bee79',
        marginHorizontal: wp(2.5),
    },
    optionTextContainer: {
        marginLeft: wp(4),
        flex: 1,
    },
    optionTitle: {
        fontSize: rf(2.4),
        fontWeight: '600',
        color: '#ffffff',
    },
    optionDescription: {
        fontSize: rf(2),
        fontWeight: '500',
        color: '#a0b4a6',
        marginTop: hp(0.3),
    },

    // Bottom Button Styles
    bottomButtonContainer: {
        position: 'absolute',
        bottom: hp(5),
        left: 0,
        right: 0,
        paddingHorizontal: wp(5),
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButton: {
        flexDirection: 'row',
        flex: 1,
        height: hp(8),
        borderRadius: wp(10),
        backgroundColor: '#2bee79',
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonText: {
        fontSize: rf(3),
        fontWeight: '800',
        color: '#000000',
    },
});