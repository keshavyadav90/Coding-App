import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
 
  StatusBar,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, SpaceGrotesk_300Light, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
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
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDESdV3tZKvG10mSHm0LhhnOr6jFZNOH7oti_psPRJp-7NMc48NzkV7_aa_fOFj5hSfP8Cny4A7-R6dFiUnZNHEfOtAkWlMYztXgmLqn5NBeU1udHyTF8TlrL_s2SuL71v-dwHA4L7r8hn8GjvPfP0Hn2RB0LMIqX0aNxKvM1heieWY7RHAtQQgzMnk-Nd9oZoFd2fzFwPNLxa7jPvcOe9jcIJj5zxMmxlg5E_ZxYkc2XaHomZBN9E7rZKjaNpc6A7kJAOOXkRPJeM' }}
                  style={styles.avatar}
                />
                <View style={styles.onlineIndicator} />
              </View>
              <View>
                <Text style={styles.welcomeText}>Welcome Back,</Text>
                <Text style={styles.userName}>Alex!</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          {/* Stats Bar */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.statsScroll}
            contentContainerStyle={styles.statsContainer}
          >
            <View style={styles.statBadge}>
              <Ionicons name="flame" size={20} color="#f97316" />
              <Text style={styles.statText}>5 Day Streak</Text>
            </View>
            <View style={styles.statBadge}>
              <Ionicons name="star" size={20} color="#fbbf24" />
              <Text style={styles.statText}>1,250 XP</Text>
            </View>
          </ScrollView>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Continue Learning Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Continue Learning</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllButton}>View All</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.9}>
              <LinearGradient
                colors={['#193324', '#152a1f']}
                style={styles.progressCard}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <LinearGradient
                      colors={['#2563eb', '#1e3a8a']}
                      style={styles.courseIcon}
                    >
                      <MaterialCommunityIcons name="console" size={32} color="#fff" />
                    </LinearGradient>
                    <View>
                      <Text style={styles.courseTitle}>Python Basics</Text>
                      <Text style={styles.courseSubtitle}>Chapter 3: Loops & Logic</Text>
                    </View>
                  </View>
                </View>

                {/* Progress Section */}
                <View style={styles.progressSection}>
                  <View style={styles.progressInfo}>
                    <Text style={styles.progressText}>60% Complete</Text>
                    <Text style={styles.progressTime}>15 min left</Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: '60%' }]} />
                  </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity style={styles.resumeButton}>
                  <Ionicons name="play" size={20} color="#102217" />
                  <Text style={styles.resumeButtonText}>Resume Learning</Text>
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Daily Challenge Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Challenge</Text>
            
            <LinearGradient
              colors={['#211d33', '#1a1626']}
              style={styles.challengeCard}
            >
              <View style={styles.timerBadge}>
                <Ionicons name="timer-outline" size={16} color="#f87171" />
                <Text style={styles.timerText}>04:12:00</Text>
              </View>

              <View style={styles.challengeContent}>
                <View style={styles.challengeHeader}>
                  <View style={styles.challengeTypeContainer}>
                    <MaterialCommunityIcons name="bug" size={18} color="#a5b4fc" />
                    <Text style={styles.challengeType}>Debug Challenge</Text>
                  </View>
                  <Text style={styles.challengeTitle}>Fix the Infinite Loop</Text>
                </View>

                <View style={styles.challengeFooter}>
                  <View style={styles.participantsContainer}>
                    <Image
                      source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA60IUSl_xeaa6HASNhJGM-D0y4EvmKtrJbFNjNA2oWPGwC52_kKmDSd9TxWkAUT8Wxs7n5cr2loPq1DAoIki_MNZ9Xx_Ie1giQSxALX1z93Zv3sK2jbGBrkt0URmUW1YCnhekghezlRD14XZ8d4BkUoka2OrlakhXUMn67u44FeFXBDUWIHlyK2F2OZNwweJc8qYEjrqaFQ-CKMC2ZPMnyg_ET2oe9Sx84VsIxb3KctM68Hau3lZISG2ByxpAzsn5b_Slvu8byOs4' }}
                      style={[styles.participantAvatar, { zIndex: 3 }]}
                    />
                    <Image
                      source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADQoT4aYwGZJ6VqwxgQTp0ACcQMsG-lC-w0jBYpP86oFHLrRwmZC9b7wLaaffe3WWUod4SUM5VSUF9OLrPJsBnx5Sfmj_zvbxa59xroQ2h_q8GvC0vdu2bM2zFzEPMoh4g1pRtXurx8yl84RHzkSoGPyRT5A1OC2kPiU2BcCZIgKPChnlLx3T_b_6BRpfHAmLcQCGq6x9fpJ1t4kEU1It8_fRxNy3GVrX_U9zPGcJ3HXVbFozk50RYDlAlYzMvJyir3BUDfe0WcgA' }}
                      style={[styles.participantAvatar, { zIndex: 2, marginLeft: -8 }]}
                    />
                    <View style={[styles.participantMore, { marginLeft: -8 }]}>
                      <Text style={styles.participantMoreText}>+124</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startButtonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Actions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickActionsContainer}
            >
              <QuickActionCard 
                icon="code-tags" 
                label="Code Editor" 
                bgColor="#a855f7"
              />
              <QuickActionCard 
                icon="book-multiple" 
                label="Browse Courses" 
                bgColor="#3b82f6"
              />
              <QuickActionCard 
                icon="chart-line" 
                label="Leaderboard" 
                bgColor="#eab308"
              />
              <QuickActionCard 
                icon="trophy" 
                label="Awards" 
                bgColor="#22c55e"
              />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickActionCard({ icon, label, bgColor }) {
  return (
    <TouchableOpacity style={styles.quickActionCard}>
      <View style={[styles.quickActionIcon, { backgroundColor: `${bgColor}33` }]}>
        <MaterialCommunityIcons name={icon} size={24} color={bgColor} />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102217',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: '#102217',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#2bee7933',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2bee79',
    borderWidth: 2,
    borderColor: '#102217',
  },
  welcomeText: {
    fontSize: 15,
    color: '#92c9a8',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  userName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#193324',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 1,
    borderColor: '#193324',
  },
  statsScroll: {
    marginTop: 4,
  },
  statsContainer: {
    gap: 12,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#193324',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#32674733',
  },
  statText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  mainContent: {
    paddingHorizontal: 20,
    gap: 32,
    marginTop: 8,
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  viewAllButton: {
    fontSize: 14,
    color: '#2bee79',
    fontWeight: '500',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  progressCard: {
    borderRadius: 32,
    padding: 20,
    gap: 20,
    borderWidth: 1,
    borderColor: '#ffffff0d',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  courseIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  courseSubtitle: {
    fontSize: 14,
    color: '#92c9a8',
    marginTop: 2,
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  progressSection: {
    gap: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  progressTime: {
    fontSize: 14,
    color: '#92c9a8',
    fontFamily: 'SpaceGrotesk_400Regular',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#00000066',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2bee79',
    borderRadius: 4,
  },
  resumeButton: {
    height: 48,
    backgroundColor: '#2bee79',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  resumeButtonText: {
    fontSize: 16,
    color: '#102217',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  challengeCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#6366f14d',
    position: 'relative',
  },
  timerBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ef444433',
    borderWidth: 1,
    borderColor: '#ef44444d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timerText: {
    fontSize: 12,
    color: '#f87171',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  challengeContent: {
    gap: 16,
  },
  challengeHeader: {
    gap: 4,
  },
  challengeTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  challengeType: {
    fontSize: 14,
    color: '#a5b4fc',
    fontWeight: '500',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  challengeTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
    maxWidth: '80%',
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1a1626',
  },
  participantMore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    borderWidth: 2,
    borderColor: '#1a1626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  participantMoreText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  startButton: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: '#6366f1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk_700Bold',
  },
  quickActionsContainer: {
    gap: 16,
    paddingRight: 20,
  },
  quickActionCard: {
    width: 112,
    padding: 16,
    backgroundColor: '#193324',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffffff0d',
    gap: 12,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#102217e6',
    borderTopWidth: 1,
    borderTopColor: '#ffffff1a',
    paddingTop: 8,
    paddingBottom: 24,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  navItemCenter: {
    position: 'relative',
    top: -20,
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2bee79',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#102217',
    shadowColor: '#2bee79',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  navLabel: {
    fontSize: 10,
    color: '#92c9a8',
    fontWeight: '500',
    fontFamily: 'SpaceGrotesk_500Medium',
  },
});