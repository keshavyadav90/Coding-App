import { SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, useFonts } from '@expo-google-fonts/space-grotesk';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { responsiveHeight as hp, responsiveFontSize as rf, responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const experienceLevels = ['Novice', 'Intermediate', 'Pro'];

export default function EditProfile() {
    const [username, setUsername] = useState('coder_one');
    const [displayName, setDisplayName] = useState('Jane Doe');
    const [bio, setBio] = useState('Learning React and building cool things with Tailwind CSS. 🚀');
    const [location, setLocation] = useState('San Francisco, CA');
    const [website, setWebsite] = useState('https://janedoe.dev');
    const [github, setGithub] = useState('github.com/jane');
    const [primaryLanguage, setPrimaryLanguage] = useState('JavaScript');
    const [experienceLevel, setExperienceLevel] = useState('Intermediate');
    const route = useRouter()

    let [fontsLoaded] = useFonts({
        SpaceGrotesk_400Regular,
        SpaceGrotesk_500Medium,
        SpaceGrotesk_600SemiBold,
        SpaceGrotesk_700Bold,
    });


    if (!fontsLoaded) {
        return null;
    }

    const maxBioLength = 160;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#102217" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={()=> route.back()}>
                    <Ionicons name="chevron-back" size={rf(3)} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
               
                <View style={styles.photoSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtPciL2GzGqiYWupV9JkQceqxyNS7enxKXmFSlETwh8EBUjReu4jkfCS1FvehBjAq2RkPO-gIML_dgWDUKEqoz6ZlhcIhuoF6Y21jG2j4L0Sr2SlFDCKKVURdjZNTaLU_CAwwv1UbqZZ2aml9ptepOuE2azQD3x_lcmJKFTEhLVpkrGMcHEa7O7ZicYtjn57UvZpBZoD4kdZJj9JZ7lClZdD6QVLtbX5lRwpQFKciySEbQvF4jmZ4ZD-A_MBuwH244RSTxo1oKo6c' }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.cameraButton}>
                            <Ionicons name="camera" size={rf(2.5)} color="#102217" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.changePhotoText}>Change Photo</Text>
                </View>

           
                <View style={styles.formContainer}>
               
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Username</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                style={styles.inputWithIconField}
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Enter username"
                                placeholderTextColor="#92c9a8"
                            />
                            <View style={styles.inputIconRight}>
                                <Ionicons name="checkmark-circle" size={rf(3)} color="#2bee79" />
                            </View>
                        </View>
                        <View style={styles.validationMessage}>
                            <Ionicons name="shield-checkmark" size={rf(1.8)} color="#2bee79" />
                            <Text style={styles.validationText}>Username available</Text>
                        </View>
                    </View>

                  
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Display Name</Text>
                        <TextInput
                            style={styles.input}
                            value={displayName}
                            onChangeText={setDisplayName}
                            placeholder="Enter display name"
                            placeholderTextColor="#92c9a8"
                        />
                    </View>

          
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Bio</Text>
                        <View style={styles.textAreaContainer}>
                            <TextInput
                                style={styles.textArea}
                                value={bio}
                                onChangeText={(text) => setBio(text.slice(0, maxBioLength))}
                                placeholder="Write something about yourself..."
                                placeholderTextColor="#92c9a8"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                            <Text style={styles.charCounter}>{bio.length}/{maxBioLength}</Text>
                        </View>
                    </View>

            
                    <View style={styles.divider} />

                  
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Location</Text>
                        <View style={styles.inputWithLeftIcon}>
                            <Ionicons name="location" size={rf(2.5)} color="#92c9a8" style={styles.leftIcon} />
                            <TextInput
                                style={styles.inputWithLeftIconField}
                                value={location}
                                onChangeText={setLocation}
                                placeholder="Enter location"
                                placeholderTextColor="#92c9a8"
                            />
                        </View>
                    </View>

                   
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Website</Text>
                        <View style={styles.inputWithLeftIcon}>
                            <Ionicons name="globe" size={rf(2.5)} color="#92c9a8" style={styles.leftIcon} />
                            <TextInput
                                style={styles.inputWithLeftIconField}
                                value={website}
                                onChangeText={setWebsite}
                                placeholder="https://yourwebsite.com"
                                placeholderTextColor="#92c9a8"
                                keyboardType="url"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* GitHub Field */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>GitHub</Text>
                        <View style={styles.inputWithLeftIcon}>
                            <Ionicons name="code-slash" size={rf(2.5)} color="#92c9a8" style={styles.leftIcon} />
                            <TextInput
                                style={styles.inputWithLeftIconField}
                                value={github}
                                onChangeText={setGithub}
                                placeholder="github.com/username"
                                placeholderTextColor="#92c9a8"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Primary Language */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Primary Language</Text>
                        <TouchableOpacity style={styles.selectField}>
                            <Text style={styles.selectText}>{primaryLanguage}</Text>
                            <Ionicons name="chevron-down" size={rf(2.5)} color="#92c9a8" />
                        </TouchableOpacity>
                    </View>

                    {/* Experience Level */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Experience Level</Text>
                        <View style={styles.experienceToggle}>
                            {experienceLevels.map((level) => (
                                <TouchableOpacity
                                    key={level}
                                    style={[
                                        styles.experienceOption,
                                        experienceLevel === level && styles.experienceOptionActive,
                                    ]}
                                    onPress={() => setExperienceLevel(level)}
                                >
                                    <Text
                                        style={[
                                            styles.experienceOptionText,
                                            experienceLevel === level && styles.experienceOptionTextActive,
                                        ]}
                                    >
                                        {level}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
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
        paddingBottom: hp(20),
    },

    // Photo Section
    photoSection: {
        alignItems: 'center',
        paddingVertical: hp(3),
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: wp(32),
        height: wp(32),
        borderRadius: wp(16),
        borderWidth: 4,
        borderColor: '#193324',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: '#2bee79',
        borderWidth: 4,
        borderColor: '#102217',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePhotoText: {
        fontSize: rf(2.2),
        fontWeight: '700',
        color: '#2bee79',
        fontFamily: 'SpaceGrotesk_700Bold',
        marginTop: hp(1.5),
    },

    // Form
    formContainer: {
        paddingHorizontal: wp(4),
    },
    fieldContainer: {
        marginBottom: hp(2.5),
    },
    fieldLabel: {
        fontSize: rf(2),
        fontWeight: '500',
        color: '#fff',
        fontFamily: 'SpaceGrotesk_500Medium',
        marginBottom: hp(1),
        marginLeft: wp(1),
    },
    input: {
        height: hp(7),
        backgroundColor: '#193324',
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: '#326747',
        paddingHorizontal: wp(4),
        fontSize: rf(2),
        color: '#fff',
        fontFamily: 'SpaceGrotesk_400Regular',
    },

    // Input with right icon
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#193324',
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: '#326747',
        overflow: 'hidden',
    },
    inputWithIconField: {
        flex: 1,
        height: hp(7),
        paddingHorizontal: wp(4),
        fontSize: rf(2),
        color: '#fff',
        fontFamily: 'SpaceGrotesk_400Regular',
    },
    inputIconRight: {
        paddingRight: wp(4),
    },
    validationMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(1),
        marginTop: hp(0.8),
        marginLeft: wp(1),
    },
    validationText: {
        fontSize: rf(1.7),
        color: '#2bee79',
        fontFamily: 'SpaceGrotesk_400Regular',
    },

    // Input with left icon
    inputWithLeftIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#193324',
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: '#326747',
    },
    leftIcon: {
        marginLeft: wp(4),
    },
    inputWithLeftIconField: {
        flex: 1,
        height: hp(7),
        paddingHorizontal: wp(3),
        fontSize: rf(2),
        color: '#fff',
        fontFamily: 'SpaceGrotesk_400Regular',
    },

    // Text Area
    textAreaContainer: {
        position: 'relative',
    },
    textArea: {
        height: hp(15),
        backgroundColor: '#193324',
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: '#326747',
        paddingHorizontal: wp(4),
        paddingTop: hp(1.5),
        paddingBottom: hp(4),
        fontSize: rf(2),
        color: '#fff',
        fontFamily: 'SpaceGrotesk_400Regular',
    },
    charCounter: {
        position: 'absolute',
        bottom: hp(1.5),
        right: wp(4),
        fontSize: rf(1.5),
        color: '#92c9a8',
        fontFamily: 'SpaceGrotesk_400Regular',
        backgroundColor: 'rgba(25, 51, 36, 0.8)',
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.3),
        borderRadius: wp(1),
    },

    // Divider
    divider: {
        height: 1,
        backgroundColor: 'rgba(50, 103, 71, 0.5)',
        marginVertical: hp(1),
    },

    // Select Field
    selectField: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: hp(7),
        backgroundColor: '#193324',
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: '#326747',
        paddingHorizontal: wp(4),
    },
    selectText: {
        fontSize: rf(2),
        color: '#fff',
        fontFamily: 'SpaceGrotesk_400Regular',
    },

    // Experience Toggle
    experienceToggle: {
        flexDirection: 'row',
        backgroundColor: '#193324',
        borderRadius: wp(7),
        borderWidth: 1,
        borderColor: 'rgba(50, 103, 71, 0.5)',
        padding: wp(1.5),
    },
    experienceOption: {
        flex: 1,
        paddingVertical: hp(1.2),
        borderRadius: wp(6),
        alignItems: 'center',
    },
    experienceOptionActive: {
        backgroundColor: '#2bee79',
    },
    experienceOptionText: {
        fontSize: rf(1.7),
        fontWeight: '500',
        color: '#92c9a8',
        fontFamily: 'SpaceGrotesk_500Medium',
    },
    experienceOptionTextActive: {
        color: '#102217',
        fontWeight: '700',
        fontFamily: 'SpaceGrotesk_700Bold',
    },

    // Bottom Actions
    bottomActions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(16, 34, 23, 0.95)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: wp(4),
        paddingTop: hp(2),
        paddingBottom: hp(4),
    },
    saveButton: {
        height: hp(7),
        backgroundColor: '#2bee79',
        borderRadius: wp(7),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    saveButtonText: {
        fontSize: rf(2.2),
        fontWeight: '700',
        color: '#102217',
        fontFamily: 'SpaceGrotesk_700Bold',
    },
    cancelButton: {
        paddingVertical: hp(1.5),
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: rf(2),
        fontWeight: '500',
        color: '#92c9a8',
        fontFamily: 'SpaceGrotesk_500Medium',
    },
});