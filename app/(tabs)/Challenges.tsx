import { SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, useFonts } from '@expo-google-fonts/space-grotesk';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { responsiveHeight as hp, responsiveFontSize as rf, responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

// Challenge data
const challengeSections = [
  {
    id: 'easy',
    title: 'Easy',
    completed: 15,
    total: 15,
    color: '#2bee79',
    bgColor: 'rgba(43, 238, 121, 0.2)',
    icon: 'checkmark',
    isOpen: true,
    challenges: [
      { id: 1, title: '#001 Hello World', type: 'Code Output', time: '5m', xp: 10, stars: 3, status: 'completed' },
      { id: 2, title: '#002 Variables', type: 'Multiple Choice', time: '3m', xp: 10, stars: 2, status: 'completed' },
    ],
  },
  {
    id: 'medium',
    title: 'Medium',
    completed: 5,
    total: 15,
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.2)',
    icon: 'trending-up',
    isOpen: true,
    challenges: [
      { id: 16, title: '#016 Loops', type: 'Fill Blank', time: '10m', xp: 50, stars: 0, status: 'active' },
      { id: 17, title: '#017 Arrays', type: 'Code Output', time: '15m', xp: 50, stars: 0, status: 'locked' },
      { id: 18, title: '#018 Functions', type: 'Debug', time: '20m', xp: 75, stars: 0, status: 'locked' },
    ],
  },
  {
    id: 'hard',
    title: 'Hard',
    completed: 0,
    total: 10,
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.2)',
    icon: 'flame',
    isOpen: false,
    challenges: [
      { id: 30, title: '#030 Recursion', type: 'Algorithm', time: '30m', xp: 100, stars: 0, status: 'locked' },
    ],
  },
];

export default function Challenges() {
  const [sections, setSections] = useState(challengeSections);

  let [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section
    ));
  };

  const renderStars = (count: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3].map((star) => (
          <Ionicons
            key={star}
            name="star"
            size={rf(2)}
            color={star <= count ? '#facc15' : '#4b5563'}
          />
        ))}
      </View>
    );
  };

  const renderChallengeCard = (challenge: typeof challengeSections[0]['challenges'][0]) => {
    if (challenge.status === 'completed') {
      return (
        <View key={challenge.id} style={styles.challengeCard}>
          <Ionicons name="checkmark-circle" size={rf(3.5)} color="#2bee79" />
          <View style={styles.challengeContent}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <View style={styles.challengeMeta}>
              <View style={styles.typeTag}>
                <Text style={styles.typeTagText}>{challenge.type}</Text>
              </View>
              <Text style={styles.metaDot}>•</Text>
              <Ionicons name="time-outline" size={rf(1.3)} color="#9ca3af" />
              <Text style={styles.metaText}>{challenge.time}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.xpText}>+{challenge.xp}XP</Text>
            </View>
          </View>
          {renderStars(challenge.stars)}
        </View>
      );
    }

    if (challenge.status === 'active') {
      return (
        <View key={challenge.id} style={styles.activeCard}>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={rf(3)} color="#000" />
          </TouchableOpacity>
          <View style={styles.challengeContent}>
            <Text style={styles.activeChallengeTitle}>{challenge.title}</Text>
            <View style={styles.challengeMeta}>
              <View style={styles.activeTypeTag}>
                <Text style={styles.activeTypeTagText}>{challenge.type.toUpperCase()}</Text>
              </View>
              <Text style={styles.metaDot}>•</Text>
              <Ionicons name="time-outline" size={rf(1.5)} color="#d1d5db" />
              <Text style={styles.activeMetaText}>{challenge.time}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.activeXpText}>+{challenge.xp}XP</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={rf(3)} color="#2bee79" />
        </View>
      );
    }

    // Locked
    return (
      <View key={challenge.id} style={styles.lockedCard}>
        <View style={styles.lockIconContainer}>
          <Ionicons name="lock-closed" size={rf(2.5)} color="#6b7280" />
        </View>
        <View style={styles.challengeContent}>
          <Text style={styles.lockedTitle}>{challenge.title}</Text>
          <View style={styles.challengeMeta}>
            <View style={styles.lockedTypeTag}>
              <Text style={styles.lockedTypeTagText}>{challenge.type}</Text>
            </View>
            <Text style={styles.lockedMetaDot}>•</Text>
            <Text style={styles.lockedMetaText}>{challenge.time}</Text>
            <Text style={styles.lockedMetaDot}>•</Text>
            <Text style={styles.lockedMetaText}>+{challenge.xp}XP</Text>
          </View>
        </View>
        <Ionicons name="lock-closed" size={rf(2.2)} color="#4b5563" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#102217" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Coding Challenges</Text>
            <Text style={styles.headerSubtitle}>Master Python Basics</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={rf(2.8)} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>45/100 Completed</Text>
            <Text style={styles.progressPercent}>45%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '45%' }]} />
          </View>
        </View>
      </View>

      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sections.map((section) => (
          <View key={section.id} style={styles.sectionContainer}>
            {/* Section Header */}
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => toggleSection(section.id)}
              activeOpacity={0.7}
            >
              <View style={styles.sectionHeaderLeft}>
                <View style={[styles.sectionIcon, { backgroundColor: section.bgColor }]}>
                  <Ionicons name={section.icon as any} size={rf(2.5)} color={section.color} />
                </View>
                <View>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Text style={[styles.sectionProgress, { color: section.color }]}>
                    {section.completed}/{section.total} Completed
                  </Text>
                </View>
              </View>
              <Ionicons
                name={section.isOpen ? 'chevron-up' : 'chevron-down'}
                size={rf(3)}
                color="#9ca3af"
              />
            </TouchableOpacity>

            {/* Section Content */}
            {section.isOpen && (
              <View style={styles.sectionContent}>
                {section.challenges.map(renderChallengeCard)}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
{/* 
    
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={rf(3)} color="#9ca3af" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="code-braces" size={rf(3)} color="#2bee79" />
          <Text style={styles.navTextActive}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="podium-outline" size={rf(3)} color="#9ca3af" />
          <Text style={styles.navText}>Rank</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={rf(3)} color="#9ca3af" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102217',
  },

  // Header Styles
  header: {
    paddingHorizontal: wp(4),
    paddingTop: hp(1.5),
    paddingBottom: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(2),
  },
  headerTitle: {
    fontSize: rf(3.5),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  headerSubtitle: {
    fontSize: rf(1.8),
    color: '#9ca3af',
    marginTop: hp(0.5),
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  filterButton: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#1A2C22',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Progress Bar Styles
  progressContainer: {
    gap: hp(0.8),
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: rf(1.7),
    fontWeight: '500',
    color: '#d1d5db',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  progressPercent: {
    fontSize: rf(1.5),
    fontWeight: '700',
    color: '#2bee79',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  progressBar: {
    height: hp(1),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: hp(0.5),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2bee79',
    borderRadius: hp(0.5),
  },

  // ScrollView
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: wp(4),
    paddingBottom: hp(12),
    gap: hp(2),
  },

  // Section Styles
  sectionContainer: {
    backgroundColor: '#1A2C22',
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  sectionIcon: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: rf(2.2),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  sectionProgress: {
    fontSize: rf(1.5),
    fontWeight: '500',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  sectionContent: {
    paddingHorizontal: wp(3),
    paddingBottom: hp(1.5),
    gap: hp(1),
  },

  // Challenge Card - Completed
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    padding: wp(3),
    backgroundColor: '#102217',
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  challengeContent: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: rf(1.8),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  challengeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    marginTop: hp(0.5),
  },
  typeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.3),
    borderRadius: wp(1),
  },
  typeTagText: {
    fontSize: rf(1.2),
    color: '#d1d5db',
    fontWeight: '500',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  metaDot: {
    color: '#9ca3af',
    fontSize: rf(1.2),
  },
  metaText: {
    fontSize: rf(1.2),
    color: '#9ca3af',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  xpText: {
    fontSize: rf(1.2),
    color: '#2bee79',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: wp(0.5),
  },

  // Challenge Card - Active
  activeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    padding: wp(3),
    backgroundColor: 'rgba(43, 238, 121, 0.1)',
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: 'rgba(43, 238, 121, 0.3)',
  },
  playButton: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#2bee79',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChallengeTitle: {
    fontSize: rf(2),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  activeTypeTag: {
    backgroundColor: 'rgba(43, 238, 121, 0.2)',
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.3),
    borderRadius: wp(1),
  },
  activeTypeTagText: {
    fontSize: rf(1.1),
    color: '#2bee79',
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  activeMetaText: {
    fontSize: rf(1.3),
    color: '#d1d5db',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  activeXpText: {
    fontSize: rf(1.3),
    color: '#2bee79',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },

  // Challenge Card - Locked
  lockedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    padding: wp(3),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 0.7,
  },
  lockIconContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(2),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedTitle: {
    fontSize: rf(1.8),
    fontWeight: '700',
    color: '#9ca3af',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  lockedTypeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.3),
    borderRadius: wp(1),
  },
  lockedTypeTagText: {
    fontSize: rf(1.2),
    color: '#6b7280',
    fontWeight: '500',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  lockedMetaDot: {
    color: '#6b7280',
    fontSize: rf(1.2),
  },
  lockedMetaText: {
    fontSize: rf(1.2),
    color: '#6b7280',
    fontFamily: 'SpaceGrotesk_400Regular',
  },

  // Bottom Navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: hp(1.5),
    paddingBottom: hp(3),
    backgroundColor: 'rgba(16, 34, 23, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  navItem: {
    alignItems: 'center',
    gap: hp(0.5),
  },
  navText: {
    fontSize: rf(1.2),
    fontWeight: '700',
    color: '#9ca3af',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  navTextActive: {
    fontSize: rf(1.2),
    fontWeight: '700',
    color: '#2bee79',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
});