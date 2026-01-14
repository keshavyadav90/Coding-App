



import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts
} from '@expo-google-fonts/space-grotesk';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveFontSize as rf,
  responsiveWidth as wp
} from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

// TypeScript interfaces
interface Challenge {
  id: number;
  type: string;
  title: string;
  part: number;
  date: string;
  prize: string;
  status: 'Active' | 'Upcoming' | 'Expired';
  participants?: number;
  daysLeft?: number;
}

type TabType = 'Active' | 'Upcoming' | 'Expired' | 'All';

// Challenge data
const challengesData: Challenge[] = [
  {
    id: 1,
    type: "QUIZ",
    title: "100 Day Of Coding Challenges",
    part: 1,
    date: "Dec 16, 2025 - Jan 14, 2026",
    prize: 'T-Shirt Giveaway',
    status: "Active",
    participants: 1250,
    daysLeft: 15,
  },
  {
    id: 2,
    type: "CODE",
    title: "Algorithm Mastery Challenge",
    part: 2,
    date: "Jan 20, 2026 - Feb 20, 2026",
    prize: 'Premium Course Access',
    status: "Upcoming",
    participants: 850,
  },
  {
    id: 3,
    type: "PROJECT",
    title: "Build a Full Stack App",
    part: 1,
    date: "Nov 1, 2025 - Dec 1, 2025",
    prize: 'Certificate + Swag',
    status: "Expired",
    participants: 2100,
  },
];

export default function Challenges() {
  const [selectedTab, setSelectedTab] = useState<TabType>('Active');
  const tabs: TabType[] = ['Active', 'Upcoming', 'Expired', 'All'];

  let [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Filter challenges based on selected tab
  const filteredChallenges = selectedTab === 'All'
    ? challengesData
    : challengesData.filter(challenge => challenge.status === selectedTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return '#2bee79';
      case 'Upcoming':
        return '#f97316';
      case 'Expired':
        return '#6b7280';
      default:
        return '#9ca3af';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'rgba(43, 238, 121, 0.15)';
      case 'Upcoming':
        return 'rgba(249, 115, 22, 0.15)';
      case 'Expired':
        return 'rgba(107, 114, 128, 0.15)';
      default:
        return 'rgba(156, 163, 175, 0.15)';
    }
  };

  const renderChallengeCard = ({ item }: { item: Challenge }) => {
    const statusColor = getStatusColor(item.status);
    const statusBgColor = getStatusBgColor(item.status);
    const isActive = item.status === 'Active';
    const isExpired = item.status === 'Expired';

    return (
      <TouchableOpacity
        style={[
          styles.challengeCard,
          { borderColor: statusColor }
        ]}
        activeOpacity={0.8}
      >
        {/* Header with Type and Status */}
        <View style={styles.cardHeader}>
          <View style={[styles.typeTag, { backgroundColor: statusBgColor }]}>
            <Ionicons
              name={
                item.type === 'QUIZ' ? 'help-circle' :
                  item.type === 'CODE' ? 'code-slash' :
                    'construct'
              }
              size={rf(1.5)}
              color={statusColor}
            />
            <Text style={[styles.typeText, { color: statusColor }]}>
              {item.type}
            </Text>
          </View>

          <View style={[styles.statusTag, { backgroundColor: statusBgColor }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* Challenge Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.challengeTitle}>{item.title}</Text>
          {item.part && (
            <Text style={styles.partText}>Part {item.part}</Text>
          )}
        </View>

        {/* Prize Section */}
        <View style={styles.prizeContainer}>
          <Ionicons name="trophy" size={rf(2)} color="#facc15" />
          <Text style={styles.prizeLabel}>PRIZE:</Text>
          <Text style={styles.prizeText}>{item.prize}</Text>
        </View>

        {/* Participants and Days Left */}
        {(item.participants || item.daysLeft) && (
          <View style={styles.statsContainer}>
            {item.participants && (
              <View style={styles.statItem}>
                <Ionicons name="people" size={rf(1.6)} color="#9ca3af" />
                <Text style={styles.statText}>{item.participants.toLocaleString()} joined</Text>
              </View>
            )}
            {item.daysLeft && isActive && (
              <View style={styles.statItem}>
                <Ionicons name="time" size={rf(1.6)} color="#2bee79" />
                <Text style={[styles.statText, { color: '#2bee79' }]}>
                  {item.daysLeft} days left
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Footer with Date and Action Button */}
        <View style={styles.cardFooter}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={rf(1.6)} color="#9ca3af" />
            <Text style={styles.dateText}>{item.date}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.viewButton,
              {
                backgroundColor: isExpired ? 'rgba(107, 114, 128, 0.2)' : statusBgColor,
                borderColor: statusColor
              }
            ]}
          >
            <Text style={[styles.viewButtonText, { color: statusColor }]}>
              {isExpired ? 'Results' : isActive ? 'Join Now' : 'View'}
            </Text>
            <Ionicons name="arrow-forward" size={rf(1.6)} color={statusColor} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#102217" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Challenges</Text>
            <Text style={styles.headerSubtitle}>Compete & Win Prizes</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={rf(2.5)} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tabs}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.tabsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === item && styles.tabButtonActive
              ]}
              onPress={() => setSelectedTab(item)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === item && styles.tabTextActive
                ]}
              >
                {item}
              </Text>
              {selectedTab === item && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Challenges List */}
      <FlatList
        data={filteredChallenges}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderChallengeCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="trophy-outline" size={rf(8)} color="#4b5563" />
            <Text style={styles.emptyText}>No {selectedTab.toLowerCase()} challenges</Text>
            <Text style={styles.emptySubtext}>Check back later for new challenges!</Text>
          </View>
        }
      />
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
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(2),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: rf(3.5),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: -0.5,
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
    borderRadius: wp(3),
    backgroundColor: '#1A2C22',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: wp(5),
  },

  // Tabs Styles
  tabsContainer: {
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  tabsList: {
    paddingHorizontal: wp(5),
    gap: wp(3),
  },
  tabButton: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.2),
    borderRadius: wp(3),
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  tabButtonActive: {
    borderColor: '#2bee79',
    backgroundColor: 'rgba(43, 238, 121, 0.1)',
  },
  tabText: {
    fontSize: rf(1.8),
    fontWeight: '700',
    color: '#9ca3af',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  tabTextActive: {
    color: '#2bee79',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#2bee79',
    borderRadius: 2,
  },

  // List Container
  listContainer: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(10),
    gap: hp(2),
  },

  // Challenge Card Styles
  challengeCard: {
    backgroundColor: '#1A2C22',
    borderRadius: wp(5),
    borderWidth: 2,
    padding: wp(5),
    gap: hp(1.5),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    borderRadius: wp(2),
  },
  typeText: {
    fontSize: rf(1.5),
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.8),
    borderRadius: wp(2),
  },
  statusDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
  },
  statusText: {
    fontSize: rf(1.5),
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },

  // Title Section
  titleContainer: {
    gap: hp(0.5),
  },
  challengeTitle: {
    fontSize: rf(2.5),
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_700Bold',
    lineHeight: rf(3),
  },
  partText: {
    fontSize: rf(1.5),
    color: '#9ca3af',
    fontFamily: 'SpaceGrotesk_500Medium',
  },

  // Prize Section
  prizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    backgroundColor: 'rgba(250, 204, 21, 0.1)',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: 'rgba(250, 204, 21, 0.2)',
  },
  prizeLabel: {
    fontSize: rf(1.5),
    fontWeight: '700',
    color: '#facc15',
    fontFamily: 'SpaceGrotesk_700Bold',
    letterSpacing: 0.5,
  },
  prizeText: {
    fontSize: rf(1.6),
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'SpaceGrotesk_600SemiBold',
    flex: 1,
  },

  // Stats Section
  statsContainer: {
    flexDirection: 'row',
    gap: wp(4),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
  },
  statText: {
    fontSize: rf(1.4),
    color: '#9ca3af',
    fontFamily: 'SpaceGrotesk_500Medium',
  },

  // Footer Section
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(0.5),
    paddingTop: hp(1.5),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    flex: 1,
  },
  dateText: {
    fontSize: rf(1.4),
    color: '#9ca3af',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1.5),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(2),
    borderWidth: 1.5,
  },
  viewButtonText: {
    fontSize: rf(1.6),
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(10),
    gap: hp(1.5),
  },
  emptyText: {
    fontSize: rf(2.2),
    fontWeight: '700',
    color: '#9ca3af',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  emptySubtext: {
    fontSize: rf(1.6),
    color: '#6b7280',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
});