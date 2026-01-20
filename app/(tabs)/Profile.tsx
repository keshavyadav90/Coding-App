import { SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, useFonts } from '@expo-google-fonts/space-grotesk';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { responsiveHeight as hp, responsiveFontSize as rf, responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';


const stats = [
  { id: 1, icon: 'flash', value: '12,450', label: 'Total XP', color: '#2bee79' },
  { id: 2, icon: 'terminal', value: '45', label: 'Challenges', color: '#2bee79' },
  { id: 3, icon: 'flame', value: '12 Days', label: 'Streak', color: '#f97316', isStreak: true },
  { id: 4, icon: 'trophy', value: '8/20', label: 'Badges', color: '#2bee79' },
];


const tabs = ['About', 'Achievements', 'Activity', 'Settings'];


const achievements = [

  {
    id: 1,
    title: 'Loop Master',
    description: 'Completed 50 iterations in a row without error.',
    earnedAgo: '2d ago',
    icon: 'code-braces-box',
    gradientColors: ['#3b82f6', '#9333ea'],
    isEarned: true,
  },

  {
    id: 2,
    title: 'Hello World',
    description: 'Submitted your first working program.',
    earnedAgo: '12d ago',
    icon: 'rocket-launch',
    gradientColors: ['#2bee79', '#059669'],
    isEarned: true,
  },

  {
    id: 3,
    title: 'Bug Hunter',
    description: '15/20 Bugs Squashed',
    progress: 75,
    icon: 'bug',
    isEarned: false,
  },
];


export default function Profile() {

const [activeTab, setActiveTab] = useState('Achievements');
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

  const renderStatCard = (stat: typeof stats[0]) => (
    <View key={stat.id} style={[styles.statCard, stat.isStreak && styles.streakCard]}>
      <Ionicons name={stat.icon as any} size={rf(4)} color={stat.color} />
      <Text style={[styles.statValue, stat.isStreak && styles.streakValue]}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );



  const renderAchievement = (achievement: typeof achievements[0]) => (
    <View key={achievement.id} style={[styles.achievementCard, !achievement.isEarned && styles.lockedAchievement]}>
      {achievement.isEarned ? (
        <LinearGradient
          colors={achievement.gradientColors as [string, string]}
          style={styles.achievementIcon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialCommunityIcons name={achievement.icon as any} size={rf(3.5)} color="#fff" />
        </LinearGradient>
      ) : (
        <View style={styles.lockedAchievementIcon}>
          <MaterialCommunityIcons name={achievement.icon as any} size={rf(3.5)} color="#6b7280" />
        </View>
      )}
      <View style={styles.achievementContent}>
        <Text style={styles.achievementTitle}>{achievement.title}</Text>
        {achievement.isEarned ? (
          <>
            <Text style={styles.achievementDescription}>{achievement.description}</Text>
            <Text style={styles.achievementEarned}>EARNED {achievement.earnedAgo?.toUpperCase()}</Text>
          </>
        ) : (
          <>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${achievement.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{achievement.description}</Text>
          </>
        )}
      </View>
    </View>
  );


  return (

    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#102217" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={()=> route.navigate("/EditProfile") }>
          <MaterialIcons name="edit" size={rf(2.8)} color="#fff" />
        </TouchableOpacity>
      </View>


      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.profileHeader}>


          <View style={styles.avatarContainer}>
            <View style={styles.avatarGlow} />
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcvpljkD8p2IieJuQ68u6Re-cg_rfbZMhf-i4DzSrmvo74KHk97DHAjOuZ9aYByUJ2LrDXeiTuSIXyk4Z4gztitEEuH6BKh2MgrL1OPJUf6yPuIz-Bf6Txk-yJ7E9dvBpFbCCtRdz4WJuLXNh9W7sa023d6xWgRzT5jIq2h2TIRlL9u7Rt3eZJ062YGqn0O_YUH3R10zVdRHOTGle0ZtI-N1HvDnf9nmzKhxwZNZifrwGNVl3C6tPWdjsG11V55jWbuniV_uS9saY' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={rf(2.2)} color="#2bee79" />
            </TouchableOpacity>
          </View>


          <Text style={styles.userName}>Alex Coder</Text>
          <Text style={styles.userHandle}>@alexcodes</Text>


          <View style={styles.tagsContainer}>
            <View style={styles.levelTag}>
              <Text style={styles.levelTagText}>LEVEL 12: PYTHONISTA</Text>
            </View>
            <View style={styles.rankTag}>
              <Text style={styles.rankTagText}>#42 Global</Text>
            </View>
          </View>
        </View>


        <View style={styles.statsGrid}>
          {stats.map(renderStatCard)}
        </View>


        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>


        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Badges</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          {achievements.map(renderAchievement)}
        </View>


        <View style={styles.levelProgressSection}>
          <View style={styles.levelProgressHeader}>
            <Text style={styles.levelProgressTitle}>Level Progress</Text>
            <Text style={styles.levelProgressXP}>2,450 XP to Level 13</Text>
          </View>
          <View style={styles.levelProgressBar}>
            <View style={[styles.levelProgressFill, { width: '85%' }]} />
          </View>
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

  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerTitle: {
    fontSize: rf(2.6),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  editButton: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(5),
  },

 
  profileHeader: {
    alignItems: 'center',
    paddingTop: hp(3),
    paddingBottom: hp(2),
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: hp(2),
  },
  avatarGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: wp(17),
    backgroundColor: '#2bee79',
    opacity: 0.2,
    transform: [{ scale: 1.1 }],
  },
  avatar: {
    width: wp(34),
    height: wp(34),
    borderRadius: wp(17),
    borderWidth: 4,
    borderColor: '#102217',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#162e21',
    borderWidth: 1,
    borderColor: 'rgba(43, 238, 121, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: rf(3.5),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  userHandle: {
    fontSize: rf(2),
    color: '#9ca3af',
    fontFamily: 'SpaceGrotesk_400Regular',
    marginTop: hp(0.3),
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: wp(2),
    marginTop: hp(1.5),
  },
  levelTag: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    borderRadius: wp(5),
    backgroundColor: 'rgba(43, 238, 121, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(43, 238, 121, 0.3)',
  },
  levelTagText: {
    fontSize: rf(1.3),
    fontWeight: '700',
    color: '#2bee79',
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: 0.5,
  },
  rankTag: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    borderRadius: wp(5),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rankTagText: {
    fontSize: rf(1.3),
    fontWeight: '700',
    color: '#d1d5db',
    fontFamily: 'SpaceGrotesk_700Bold',
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: wp(4),
    gap: wp(3),
    marginTop: hp(1),
  },
  statCard: {
    width: (wp(100) - wp(8) - wp(3)) / 2,
    backgroundColor: '#162e21',
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    padding: wp(4),
    alignItems: 'center',
  },
  streakCard: {
    backgroundColor: 'rgba(249, 115, 22, 0.05)',
  },
  statValue: {
    fontSize: rf(3),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
    marginTop: hp(0.5),
  },
  streakValue: {
    color: '#f97316',
  },
  statLabel: {
    fontSize: rf(1.3),
    color: '#9ca3af',
    fontWeight: '500',
    fontFamily: 'SpaceGrotesk_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: hp(0.3),
  },

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    marginTop: hp(3),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: wp(4),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2bee79',
  },
  tabText: {
    fontSize: rf(1.6),
    fontWeight: '700',
    color: '#9ca3af',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  activeTabText: {
    color: '#fff',
  },

  // Achievements Section
  achievementsSection: {
    paddingHorizontal: wp(4),
    marginTop: hp(2),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: rf(2.4),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  viewAllText: {
    fontSize: rf(1.7),
    fontWeight: '700',
    color: '#2bee79',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#162e21',
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    padding: wp(4),
    marginBottom: hp(1.5),
    gap: wp(4),
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedAchievementIcon: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(3),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: rf(2),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  achievementDescription: {
    fontSize: rf(1.4),
    color: '#9ca3af',
    fontFamily: 'SpaceGrotesk_400Regular',
    marginTop: hp(0.3),
  },
  achievementEarned: {
    fontSize: rf(1.2),
    fontWeight: '700',
    color: '#2bee79',
    fontFamily: 'SpaceGrotesk_700Bold',
    marginTop: hp(1),
    letterSpacing: 0.5,
  },
  progressBarContainer: {
    height: hp(0.8),
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: hp(0.4),
    marginTop: hp(1),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2bee79',
    borderRadius: hp(0.4),
  },
  progressText: {
    fontSize: rf(1.2),
    color: '#9ca3af',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
    marginTop: hp(0.5),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Level Progress
  levelProgressSection: {
    paddingHorizontal: wp(4),
    marginTop: hp(4),
  },
  levelProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: hp(1),
  },
  levelProgressTitle: {
    fontSize: rf(2.2),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  levelProgressXP: {
    fontSize: rf(1.7),
    fontWeight: '500',
    color: '#2bee79',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  levelProgressBar: {
    height: hp(1.5),
    backgroundColor: '#162e21',
    borderRadius: hp(0.75),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: '#2bee79',
    borderRadius: hp(0.75),
  },
});