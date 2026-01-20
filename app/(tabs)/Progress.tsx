import { SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, useFonts } from '@expo-google-fonts/space-grotesk';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Calendar from 'expo-calendar';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { responsiveFontSize as rf, responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions';

// Mock data - replace with backend later
const MOCK_PROGRESS_DATA = {
  currentStreak: 7,
  longestStreak: 15,
  totalProblems: 142,
  totalTime: '48h 32m',
  weeklyGoal: 5,
  weeklyCompleted: 4,
  activityData: {
    '2025-01-14': 3,
    '2025-01-15': 5,
    '2025-01-16': 2,
    '2025-01-17': 4,
    '2025-01-18': 6,
    '2025-01-19': 3,
    '2025-01-20': 2,
  },
  skillsProgress: [
    { name: 'Arrays', completed: 45, total: 60, percentage: 75 },
    { name: 'Strings', completed: 30, total: 40, percentage: 75 },
    { name: 'Dynamic Programming', completed: 12, total: 50, percentage: 24 },
    { name: 'Trees', completed: 25, total: 45, percentage: 56 },
  ],
};

const Progress = () => {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarPermission, setCalendarPermission] = useState(false);

  useEffect(() => {
    requestCalendarPermission();
  }, []);

  const requestCalendarPermission = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    setCalendarPermission(status === 'granted');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getActivityLevel = (count: number) => {
    if (count === 0) return '#2A2A3C';
    if (count <= 2) return '#4A5FFF33';
    if (count <= 4) return '#4A5FFF66';
    return '#4A5FFF';
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
    const weeks = [];
    let days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );
      const dateStr = formatDate(date);
      const activityCount = MOCK_PROGRESS_DATA.activityData[dateStr] || 0;
      const isToday = dateStr === formatDate(new Date());

      days.push(
        <View key={day} style={styles.dayCell}>
          <View
            style={[
              styles.dayBox,
              { backgroundColor: getActivityLevel(activityCount) },
              isToday && styles.todayBorder,
            ]}
          >
            <Text style={styles.dayText}>{day}</Text>
          </View>
          {activityCount > 0 && (
            <Text style={styles.activityCount}>{activityCount}</Text>
          )}
        </View>
      );

      if (days.length === 7) {
        weeks.push(
          <View key={`week-${weeks.length}`} style={styles.weekRow}>
            {days}
          </View>
        );
        days = [];
      }
    }

    // Add remaining days
    if (days.length > 0) {
      while (days.length < 7) {
        days.push(<View key={`empty-end-${days.length}`} style={styles.dayCell} />);
      }
      weeks.push(
        <View key={`week-${weeks.length}`} style={styles.weekRow}>
          {days}
        </View>
      );
    }

    return weeks;
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Progress</Text>
          <Text style={styles.headerSubtitle}>Keep up the great work!</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{MOCK_PROGRESS_DATA.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
            <Ionicons name="flame" size={rf(3)} color="#FF6B35" style={styles.streakIcon} />
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{MOCK_PROGRESS_DATA.totalProblems}</Text>
            <Text style={styles.statLabel}>Problems Solved</Text>
            <Ionicons name="checkmark-circle" size={rf(3)} color="#4CAF50" style={styles.streakIcon} />
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{MOCK_PROGRESS_DATA.longestStreak}</Text>
            <Text style={styles.statLabel}>Longest Streak</Text>
            <Ionicons name="trophy" size={rf(3)} color="#FFD700" style={styles.streakIcon} />
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{MOCK_PROGRESS_DATA.totalTime}</Text>
            <Text style={styles.statLabel}>Total Time</Text>
            <MaterialCommunityIcons name="clock-outline" size={rf(3)} color="#4A5FFF" style={styles.streakIcon} />
          </View>
        </View>

        {/* Weekly Goal */}
        <View style={styles.goalSection}>
          <View style={styles.goalHeader}>
            <Text style={styles.sectionTitle}>Weekly Goal</Text>
            <Text style={styles.goalProgress}>
              {MOCK_PROGRESS_DATA.weeklyCompleted}/{MOCK_PROGRESS_DATA.weeklyGoal} days
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${(MOCK_PROGRESS_DATA.weeklyCompleted / MOCK_PROGRESS_DATA.weeklyGoal) * 100}%`,
                },
              ]}
            />
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>Activity Calendar</Text>
          <View style={styles.calendarHeader}>
            <TouchableOpacity
              onPress={() => {
                const newDate = new Date(selectedDate);
                newDate.setMonth(newDate.getMonth() - 1);
                setSelectedDate(newDate);
              }}
              style={styles.navButtonContainer}
            >
              <Ionicons name="chevron-back" size={rf(2.5)} color="#4A5FFF" />
            </TouchableOpacity>
            <Text style={styles.monthYear}>
              {selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </Text>
            <TouchableOpacity
              onPress={() => {
                const newDate = new Date(selectedDate);
                newDate.setMonth(newDate.getMonth() + 1);
                setSelectedDate(newDate);
              }}
              style={styles.navButtonContainer}
            >
              <Ionicons name="chevron-forward" size={rf(2.5)} color="#4A5FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysHeader}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Text key={index} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendar}>{renderCalendar()}</View>

          <View style={styles.legendContainer}>
            <Text style={styles.legendText}>Less</Text>
            <View style={[styles.legendBox, { backgroundColor: '#2A2A3C' }]} />
            <View style={[styles.legendBox, { backgroundColor: '#4A5FFF33' }]} />
            <View style={[styles.legendBox, { backgroundColor: '#4A5FFF66' }]} />
            <View style={[styles.legendBox, { backgroundColor: '#4A5FFF' }]} />
            <Text style={styles.legendText}>More</Text>
          </View>
        </View>

        {/* Skills Progress */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills Progress</Text>
          {MOCK_PROGRESS_DATA.skillsProgress.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillStats}>
                  {skill.completed}/{skill.total}
                </Text>
              </View>
              <View style={styles.skillProgressBar}>
                <View
                  style={[
                    styles.skillProgressFill,
                    { width: `${skill.percentage}%` },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  scrollContent: {
    paddingHorizontal: rw(5),
    paddingTop: rh(6),
    paddingBottom: rh(3),
  },
  header: {
    marginBottom: rh(3),
  },
  headerTitle: {
    fontSize: rf(3.5),
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#FFFFFF',
    marginBottom: rh(0.5),
  },
  headerSubtitle: {
    fontSize: rf(2),
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rh(2),
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2A2A3C',
    borderRadius: 16,
    padding: rh(2),
    marginHorizontal: rw(1),
    position: 'relative',
  },
  statValue: {
    fontSize: rf(3.2),
    fontFamily: 'SpaceGrotesk_700Bold',
    color: '#4A5FFF',
    marginBottom: rh(0.5),
  },
  statLabel: {
    fontSize: rf(1.6),
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#9CA3AF',
  },
  streakIcon: {
    position: 'absolute',
    top: rh(2),
    right: rw(3),
  },
  goalSection: {
    backgroundColor: '#2A2A3C',
    borderRadius: 16,
    padding: rh(2.5),
    marginBottom: rh(2),
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rh(1.5),
  },
  sectionTitle: {
    fontSize: rf(2.2),
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: '#FFFFFF',
  },
  goalProgress: {
    fontSize: rf(1.8),
    fontFamily: 'SpaceGrotesk_500Medium',
    color: '#4A5FFF',
  },
  progressBarContainer: {
    height: rh(1.2),
    backgroundColor: '#1A1A2E',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4A5FFF',
    borderRadius: 10,
  },
  calendarSection: {
    backgroundColor: '#2A2A3C',
    borderRadius: 16,
    padding: rh(2.5),
    marginBottom: rh(2),
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: rh(2),
  },
  navButtonContainer: {
    padding: rw(2),
  },
  monthYear: {
    fontSize: rf(2),
    fontFamily: 'SpaceGrotesk_600SemiBold',
    color: '#FFFFFF',
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: rh(1),
  },
  weekDayText: {
    fontSize: rf(1.6),
    fontFamily: 'SpaceGrotesk_500Medium',
    color: '#9CA3AF',
    width: rw(10),
    textAlign: 'center',
  },
  calendar: {
    marginBottom: rh(2),
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: rh(0.8),
  },
  dayCell: {
    width: rw(10),
    alignItems: 'center',
  },
  dayBox: {
    width: rw(9),
    height: rw(9),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayBorder: {
    borderWidth: 2,
    borderColor: '#4A5FFF',
  },
  dayText: {
    fontSize: rf(1.4),
    fontFamily: 'SpaceGrotesk_500Medium',
    color: '#FFFFFF',
  },
  activityCount: {
    fontSize: rf(1),
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#4A5FFF',
    marginTop: 2,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rh(1),
  },
  legendBox: {
    width: rw(4),
    height: rw(4),
    borderRadius: 4,
    marginHorizontal: rw(0.5),
  },
  legendText: {
    fontSize: rf(1.4),
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#9CA3AF',
    marginHorizontal: rw(1),
  },
  skillsSection: {
    backgroundColor: '#2A2A3C',
    borderRadius: 16,
    padding: rh(2.5),
    marginBottom: rh(2),
  },
  skillItem: {
    marginTop: rh(2),
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: rh(1),
  },
  skillName: {
    fontSize: rf(1.8),
    fontFamily: 'SpaceGrotesk_500Medium',
    color: '#FFFFFF',
  },
  skillStats: {
    fontSize: rf(1.6),
    fontFamily: 'SpaceGrotesk_400Regular',
    color: '#9CA3AF',
  },
  skillProgressBar: {
    height: rh(0.8),
    backgroundColor: '#1A1A2E',
    borderRadius: 10,
    overflow: 'hidden',
  },
  skillProgressFill: {
    height: '100%',
    backgroundColor: '#4A5FFF',
    borderRadius: 10,
  },
});

export default Progress;