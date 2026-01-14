import { SpaceGrotesk_300Light, SpaceGrotesk_400Regular, SpaceGrotesk_500Medium, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold, useFonts } from '@expo-google-fonts/space-grotesk';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { responsiveHeight as hp, responsiveFontSize as rf, responsiveWidth as wp } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';


const cardWidth = (wp(100) - wp(12)) / 2;


const Question = [

    {
        id: 1,
        question: "Two Sum",
        hint1: "A brute force approach would be to check every possible pair of numbers, but that is O(n²).",
        hint2: "Try using a Hash Map to store the value and its index as you iterate through the array.",
        example1_input: "nums = [2,7,11,15], target = 9",
        example1_output: "[0,1]",
        example2_input: "nums = [3,2,4], target = 6",
        example2_output: "[1,2]",
        level: "easy",
        discription: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice."
    },
    {
        id: 2,
        question: "Valid Parentheses",
        hint1: "Use a stack data structure to keep track of opening brackets.",
        hint2: "When you encounter a closing bracket, check if it matches the bracket at the top of the stack.",
        example1_input: "s = \"()\"",
        example1_output: "true",
        example2_input: "s = \"(]\"",
        example2_output: "false",
        level: "easy",
        discription: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if brackets are closed by the same type of brackets and closed in the correct order."
    },
    {
        id: 3,
        question: "Longest Substring Without Repeating Characters",
        hint1: "Use a sliding window with two pointers (left and right).",
        hint2: "Use a Set or Map to keep track of characters currently in your window to detect duplicates quickly.",
        example1_input: "s = \"abcabcbb\"",
        example1_output: "3",
        example2_input: "s = \"bbbbb\"",
        example2_output: "1",
        level: "medium",
        discription: "Given a string s, find the length of the longest substring without repeating characters."
    },
    {
        id: 4,
        question: "Container With Most Water",
        hint1: "The area is determined by the shorter of the two lines and the distance between them.",
        hint2: "Start with two pointers at the far ends of the array and move the pointer pointing to the shorter line inward.",
        example1_input: "height = [1,8,6,2,5,4,8,3,7]",
        example1_output: "49",
        example2_input: "height = [1,1]",
        example2_output: "1",
        level: "medium",
        discription: "You are given an integer array height of length n. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store."
    },
    {
        id: 5,
        question: "Trapping Rain Water",
        hint1: "For each bar, the water it can hold is determined by the minimum of the maximum heights to its left and right.",
        hint2: "You can pre-calculate the left-max and right-max for every index, or use a two-pointer approach to save space.",
        example1_input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        example1_output: "6",
        example2_input: "height = [4,2,0,3,2,5]",
        example2_output: "9",
        level: "hard",
        discription: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining."
    },

    {
        id: 6,
        question: "Best Time to Buy and Sell Stock",
        hint1: "You want to find the maximum difference between a later price and an earlier price.",
        hint2: "Iterate through the array once, keeping track of the minimum price seen so far and the maximum profit you could make today.",
        example1_input: "prices = [7,1,5,3,6,4]",
        example1_output: "5",
        example2_input: "prices = [7,6,4,3,1]",
        example2_output: "0",
        level: "easy",
        discription: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction."
    },
    {
        id: 7,
        question: "Search in Rotated Sorted Array",
        hint1: "Even though the array is rotated, one half of the array (split by the middle element) will always be sorted.",
        hint2: "Use binary search. Check which side is sorted and determine if the target lies within that range.",
        example1_input: "nums = [4,5,6,7,0,1,2], target = 0",
        example1_output: "4",
        example2_input: "nums = [4,5,6,7,0,1,2], target = 3",
        example2_output: "-1",
        level: "medium",
        discription: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums."
    },
    {
        id: 8,
        question: "Merge Intervals",
        hint1: "First, sort the intervals based on their start times.",
        hint2: "Iterate through the sorted intervals. If the current interval overlaps with the previous one, merge them by updating the end time.",
        example1_input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        example1_output: "[[1,6],[8,10],[15,18]]",
        example2_input: "intervals = [[1,4],[4,5]]",
        example2_output: "[[1, 5]]",
        level: "medium",
        discription: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input."
    },
    {
        id: 9,
        question: "Word Search",
        hint1: "This is a classic backtracking problem using Depth First Search (DFS).",
        hint2: "From each cell, explore all four directions and mark cells as visited (or change the character) to avoid using the same cell twice in one path.",
        example1_input: "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
        example1_output: "true",
        example2_input: "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCB\"",
        example2_output: "false",
        level: "medium",
        discription: "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring."
    },
    {
        id: 10,
        question: "Median of Two Sorted Arrays",
        hint1: "The brute force O(m+n) is easy; the challenge is achieving O(log(m+n)).",
        hint2: "Use binary search to partition the two arrays such that the left side contains the smaller half of the combined elements.",
        example1_input: "nums1 = [1,3], nums2 = [2]",
        example1_output: "2.0",
        example2_input: "nums1 = [1,2], nums2 = [3,4]",
        example2_output: "2.5",
        level: "hard",
        discription: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n))."
    }

]

interface data {
    id: number,
    question: string,
    hint1: string,
    hint2: string,
    example1_input: string,
    example1_output: string,
    example2_input: string,
    example2_output: string,
    level: string,
    discription: string,

}

const categories = ['All', 'Popular', 'Web Dev', 'Mobile', 'Data Science', 'Systems'];
interface Question {
    id: number;
    question: string;
    level: string;
    progress: string;
}
export default function Practice() {
    const [searchQuery, setSearchQuery] = useState('');
    const [myLanguagesOnly, setMyLanguagesOnly] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const router = useRouter();

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

            <View style={styles.header}>
                <View style={styles.topBar}>
                    
                    <View style={styles.spacer} />
                </View>

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

            <FlatList
                data={Question}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: hp(5) }}
                style={{ flex: 1 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push({ pathname: '/Discription', params: { item: JSON.stringify(item) } })}>
                        <View style={{ borderWidth: 1, borderColor: '#2C3E33', borderRadius: 10, padding: 16, marginHorizontal: 16, marginBottom: 12, backgroundColor: '#1C2E24' }}>
                            <Text style={{ fontSize: rf(2), fontFamily: 'SpaceGrotesk_500Medium', color: '#fff', marginBottom: 4 }}>{item.question}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                                <View >
                                    <Text style={{ fontSize: rf(1.8), fontFamily: 'SpaceGrotesk_500Medium', color: '#2bee79' }}>{item.level}</Text>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />


        </SafeAreaView>
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
