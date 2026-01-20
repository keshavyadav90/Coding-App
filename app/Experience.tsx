import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveHeight as hp, responsiveFontSize as rf, responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';


const experienceLevels = [
    {
        id: 1,
        title: 'Complete Beginner',
        description: "I've never written code before.",
        icon: 'emoji-emotions',
        iconType: 'MaterialIcons',
    },
    {
        id: 2,
        title: 'Some Experience',
        description: 'I know the basics of coding.',
        icon: 'code',
        iconType: 'Feather',
    },
    {
        id: 3,
        title: 'Intermediate',
        description: 'I can build simple apps or websites.',
        icon: 'terminal',
        iconType: 'MaterialIcons',
    },
    {
        id: 4,
        title: 'Advanced',
        description: "I'm a professional developer.",
        icon: 'rocket-sharp',
        iconType: 'Ionicons',
    },
];

const Experience = () => {
    const [selectedExperience, setSelectedExperience] = useState<number | null>(null);

    const renderIcon = (iconType: string, icon: string) => {
        const iconSize = rf(3);
        const iconColor = 'black';

        switch (iconType) {
            case 'MaterialIcons':
                return <MaterialIcons name={icon as any} size={iconSize} color={iconColor} />;
            case 'Feather':
                return <Feather name={icon as any} size={iconSize} color={iconColor} />;
            case 'Ionicons':
                return <Ionicons name={icon as any} size={iconSize} color={iconColor} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
         
            <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>What's your experience</Text>
                    <Text style={styles.titleTextBold}>level?</Text>
                </View>
                <Text style={styles.subtitleText}>We'll adapt the curriculum to fit your current</Text>
                <Text style={styles.subtitleText}>coding skills.</Text>
            </View>

            <View style={styles.optionsContainer}>
                {experienceLevels.map((level) => (
                    <TouchableOpacity
                        key={level.id}
                        style={[
                            styles.optionCard,
                            selectedExperience === level.id && styles.optionCardSelected,
                        ]}
                        onPress={() => setSelectedExperience(level.id)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.iconContainer}>
                            {renderIcon(level.iconType, level.icon)}
                        </View>
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionTitle}>{level.title}</Text>
                            <Text style={styles.optionDescription}>{level.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.bottomButtonContainer}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.backButton}>
                        <Feather name="arrow-left" size={rf(3.5)} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                        <Feather name="arrow-right" size={rf(3)} color="black" style={styles.arrowIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Experience;

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
    backButton: {
        width: wp(16),
        height: wp(16),
        borderRadius: wp(8),
        backgroundColor: '#1f3f2c',
        marginRight: wp(2.5),
        justifyContent: 'center',
        alignItems: 'center',
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
    arrowIcon: {
        marginLeft: wp(2.5),
    },
});