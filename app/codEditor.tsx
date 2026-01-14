
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


import { SafeAreaView } from 'react-native-safe-area-context';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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


const CodeEditor = () => {
  const navigation = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const windowWidth = Dimensions.get('window').width;

  const { parsedItem } = useLocalSearchParams<{ parsedItem: string }>();

  const Item: data | null = parsedItem  

  if (!Item) return null


  const [code, setCode] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'case1' | 'case2'>('case1');
  const [containerHeight, setContainerHeight] = useState(300);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 50);
  };


  useEffect(() => {
    const lines = code.split('\n').length;
    const newHeight = Math.max(300, lines * 24 + 40);
    setContainerHeight(newHeight);
  }, [code]);
   
  

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>JS JavaScript</Text>
        </View>
        <View style={styles.headerRightIcons}>
          <Ionicons name="copy-outline" size={20} color="#ccc" style={{ marginRight: 15 }} />
          <Ionicons name="refresh-outline" size={20} color="#ccc" />
        </View>
      </View>


      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={styles.keyboardContainer}
      >


        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >


          <View style={styles.editorContainer}>
            <View style={styles.highlightContainer}>
              <SyntaxHighlighter
                style={atomOneDark}
                language="javascript"
                wrapLines={true}
                fontSize={20}
                fontFamily={Platform.OS === 'ios' ? 'Menlo' : 'monospace'}
                PreTag={View}
                CodeTag={View}
                customStyle={{
                  padding: 16,
                  margin: 0,
                  backgroundColor: 'transparent',
                  minHeight: containerHeight,
                  lineHeight: 24,
                }}
                lineNumberStyle={{ color: '#608b74', paddingRight: 10 }}
                showLineNumbers={false}
              >
                {code || ' '}
              </SyntaxHighlighter>
            </View>


            <TextInput
              style={styles.textInput}
              cursorColor="#00ff0dff"
              selectionColor="rgba(0, 255, 64, 0.98)"
              multiline
              value={code}
              onChangeText={handleCodeChange}
              textAlignVertical="top"
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              placeholder="Write your code here..."
              placeholderTextColor="#6a996a"
              onFocus={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
              onContentSizeChange={(e) => {

                const maxHeight = Dimensions.get('window').height * 0.6;
                const newHeight = Math.min(maxHeight, e.nativeEvent.contentSize.height);
                setContainerHeight(Math.max(300, newHeight + 20));
              }}

            />

          </View>

          <View style={styles.testCasesContainer}>
            <View style={styles.tabsContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="flask-outline" size={20} color="#ff8c00" style={{ marginRight: 8 }} />
                <Text style={styles.sectionTitle}>Test Cases</Text>
              </View>
            </View>

            <View style={styles.tabHeader}>
              <TouchableOpacity
                style={[styles.tabItem, activeTab === 'case1' && styles.activeTabItem]}
                onPress={() => setActiveTab('case1')}
              >
                <Text style={[styles.tabText, activeTab === 'case1' && styles.activeTabText]}>Case 1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabItem, activeTab === 'case2' && styles.activeTabItem]}
                onPress={() => setActiveTab('case2')}
              >
                <Text style={[styles.tabText, activeTab === 'case2' && styles.activeTabText]}>Case 2</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.caseContent}>
              <Text style={styles.label}>Input</Text>
              <View style={styles.readOnlyInput}>

                <Text style={styles.readOnlyText}>
                  {activeTab === 'case1'
                    ? Item.example1_input
                    : Item.example2_input}
                </Text>
              </View>


              <Text style={styles.label}>Expected Output</Text>
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>
                  {activeTab === 'case1' ? Item.example1_output : Item.example2_output}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>


        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              Keyboard.dismiss();
              console.log('Submitting code:', code);
            }}
          >
            <Text style={styles.submitButtonText}>Submit Solution</Text>
            <Ionicons name="play" size={16} color="#000" style={{ marginLeft: 5 }} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};



export default CodeEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102217',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3E33',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#2C3E33',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 10,
  },
  badgeText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerRightIcons: {
    flexDirection: 'row',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#0d1a12',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  editorContainer: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#0d1a12',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#2C3E33',
  },
  highlightContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textInput: {
    color: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'transparent',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 20,
    lineHeight: 24,
    minHeight: 300,
    padding: 16,
    paddingTop: 16, 
    textAlignVertical: 'top',
    width: '100%',
    opacity: Platform.OS === 'android' ? 0.01 : 1,
    ...Platform.select({
      ios: {
      
        tintColor: 'transparent',
      },
      android: {
        textAlignVertical: 'top',
        includeFontPadding: false,
        
      },
    }),
  },
  testCasesContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2C3E33',
  },
  tabsContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  tabHeader: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tabItem: {
    marginRight: 20,
    paddingBottom: 8,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff8c00',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  caseContent: {
    gap: 12,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  readOnlyInput: {
    backgroundColor: '#1C2E24',
    padding: 12,
    borderRadius: 8,
  },
  readOnlyText: {
    color: '#ccc',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
  },
  footer: {
    padding: 16,
    backgroundColor: '#102217',
    borderTopWidth: 1,
    borderTopColor: '#2C3E33',
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  submitButton: {
    backgroundColor: '#00ff55ff',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  }
});










// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Dimensions,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import SyntaxHighlighter from 'react-native-syntax-highlighter';
// import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// const CodeEditor = () => {
//   const navigation = useRouter();
//   const scrollViewRef = useRef<ScrollView>(null);
//   const windowWidth = Dimensions.get('window').width;
//   const [code, setCode] = useState<string>(`class Solution {
//   /**
//    * Find the maximum dot product of two
//    * non-empty subsequences.
//    * @param {number[]} arrA - first integer array
//    * @param {number[]} arrB - second integer array
//    * @returns {number} maximum possible dot product
//    */
//   maxDotProduct(arrA, arrB) {
//     // Your implementation here
//     return 0;
//   }
// }`);
//   const [activeTab, setActiveTab] = useState<'case1' | 'case2'>('case1');
//   const [containerHeight, setContainerHeight] = useState(300);

//   const handleCodeChange = (newCode: string) => {
//     setCode(newCode);
//     setTimeout(() => {
//       scrollViewRef.current?.scrollToEnd({ animated: true });
//     }, 50);
//   };

//   useEffect(() => {
//     const lines = code.split('\n').length;
//     const newHeight = Math.max(300, lines * 24 + 40);
//     setContainerHeight(newHeight);
//   }, [code]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.back()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Max Dot Product of Two Subsequences</Text>
//         <View style={styles.badge}>
//           <Text style={styles.badgeText}>JS JavaScript</Text>
//         </View>
//         <View style={styles.headerRightIcons}>
//           <Ionicons name="copy-outline" size={20} color="#ccc" style={{ marginRight: 15 }} />
//           <Ionicons name="refresh-outline" size={20} color="#ccc" />
//         </View>
//       </View>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
//         style={styles.keyboardContainer}
//       >
//         <ScrollView
//           ref={scrollViewRef}
//           style={styles.scrollContainer}
//           contentContainerStyle={styles.scrollContent}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View style={styles.editorContainer}>
//             {/* Syntax Highlighter Layer - Shows colored code */}
//             <View style={styles.highlightContainer} pointerEvents="none">
//               <SyntaxHighlighter
//                 style={atomOneDark}
//                 language="javascript"
//                 wrapLines={true}
//                 fontSize={20}
//                 fontFamily={Platform.OS === 'ios' ? 'Menlo' : 'monospace'}
//                 PreTag={View}
//                 CodeTag={View}
//                 customStyle={{
//                   padding: 16,
//                   margin: 0,
//                   backgroundColor: 'transparent',
//                   minHeight: containerHeight,
//                   lineHeight: 24,
//                 }}
//                 lineNumberStyle={{ color: '#608b74', paddingRight: 10 }}
//                 showLineNumbers={false}
//               >
//                 {code || ' '}
//               </SyntaxHighlighter>
//             </View>

//             {/* Invisible TextInput Layer - Handles input/cursor/selection */}
//             <TextInput
//               style={[styles.textInput, { minHeight: containerHeight }]}
//               cursorColor="#ff8c00"
//               selectionColor="rgba(255, 140, 0, 0.3)"
//               multiline
//               value={code}
//               onChangeText={handleCodeChange}
//               textAlignVertical="top"
//               autoCapitalize="none"
//               autoCorrect={false}
//               spellCheck={false}
//               placeholder=""
//               placeholderTextColor="transparent"
//               onFocus={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
//               onContentSizeChange={(e) => {
//                 const maxHeight = Dimensions.get('window').height * 0.6;
//                 const newHeight = Math.min(maxHeight, e.nativeEvent.contentSize.height);
//                 setContainerHeight(Math.max(300, newHeight + 20));
//               }}


//               caretHidden={false}
//               contextMenuHidden={false}
//             />
//           </View>

//           <View style={styles.testCasesContainer}>
//             <View style={styles.tabsContainer}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Ionicons name="flask-outline" size={20} color="#ff8c00" style={{ marginRight: 8 }} />
//                 <Text style={styles.sectionTitle}>Test Cases</Text>
//               </View>
//             </View>

//             <View style={styles.tabHeader}>
//               <TouchableOpacity
//                 style={[styles.tabItem, activeTab === 'case1' && styles.activeTabItem]}
//                 onPress={() => setActiveTab('case1')}
//               >
//                 <Text style={[styles.tabText, activeTab === 'case1' && styles.activeTabText]}>Case 1</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.tabItem, activeTab === 'case2' && styles.activeTabItem]}
//                 onPress={() => setActiveTab('case2')}
//               >
//                 <Text style={[styles.tabText, activeTab === 'case2' && styles.activeTabText]}>Case 2</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.caseContent}>
//               <Text style={styles.label}>Input</Text>
//               <View style={styles.readOnlyInput}>
//                 <Text style={styles.readOnlyText}>
//                   {activeTab === 'case1'
//                     ? '{"arrA":[2,1,-2,5], "arrB":[3,0,-6]}'
//                     : '{"arrA":[3,-2], "arrB":[2,-6,7]}'}
//                 </Text>
//               </View>

//               <Text style={styles.label}>Expected Output</Text>
//               <View style={styles.readOnlyInput}>
//                 <Text style={styles.readOnlyText}>
//                   {activeTab === 'case1' ? '18' : '21'}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </ScrollView>

//         <View style={styles.footer}>
//           <TouchableOpacity
//             style={styles.submitButton}
//             onPress={() => {
//               Keyboard.dismiss();
//               console.log('Submitting code:', code);
//             }}
//           >
//             <Text style={styles.submitButtonText}>Submit Solution</Text>
//             <Ionicons name="play" size={16} color="#000" style={{ marginLeft: 5 }} />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default CodeEditor;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#102217',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#2C3E33',
//   },
//   backButton: {
//     marginRight: 12,
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     flex: 1,
//     marginRight: 8,
//   },
//   badge: {
//     backgroundColor: '#2C3E33',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//     marginRight: 10,
//   },
//   badgeText: {
//     color: '#FFD700',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   headerRightIcons: {
//     flexDirection: 'row',
//   },
//   keyboardContainer: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flex: 1,
//     backgroundColor: '#0d1a12',
//   },
//   scrollContent: {
//     paddingBottom: 100,
//   },
//   editorContainer: {
//     margin: 16,
//     borderRadius: 8,
//     overflow: 'hidden',
//     backgroundColor: '#0d1a12',
//     position: 'relative',
//     borderWidth: 1,
//     borderColor: '#2C3E33',
//   },
//   highlightContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   textInput: {
//     // Use rgba with 0 opacity instead of 'transparent' keyword
//     color: 'rgba(0, 0, 0, 0)',
//     backgroundColor: 'transparent',
//     fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
//     fontSize: 20,
//     lineHeight: 24,
//     minHeight: 300,
//     padding: 16,
//     paddingTop: 16,
//     textAlignVertical: 'top',
//     width: '100%',
//     // SOLUTION: Use opacity to hide text while keeping cursor visible
//     opacity: Platform.OS === 'android' ? 0.01 : 1,
//     ...Platform.select({
//       ios: {
//         // On iOS, we can use tintColor to hide text
//         tintColor: 'transparent',
//       },
//       android: {
//         textAlignVertical: 'top',
//         includeFontPadding: false,
//         // Very low opacity hides text but keeps cursor
//       },
//     }),
//   },
//   testCasesContainer: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#2C3E33',
//   },
//   tabsContainer: {
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   tabHeader: {
//     flexDirection: 'row',
//     marginBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//   },
//   tabItem: {
//     marginRight: 20,
//     paddingBottom: 8,
//   },
//   activeTabItem: {
//     borderBottomWidth: 2,
//     borderBottomColor: '#ff8c00',
//   },
//   tabText: {
//     color: '#888',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   activeTabText: {
//     color: '#fff',
//   },
//   caseContent: {
//     gap: 12,
//   },
//   label: {
//     color: '#fff',
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   readOnlyInput: {
//     backgroundColor: '#1C2E24',
//     padding: 12,
//     borderRadius: 8,
//   },
//   readOnlyText: {
//     color: '#ccc',
//     fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
//     fontSize: 13,
//   },
//   footer: {
//     padding: 16,
//     backgroundColor: '#102217',
//     borderTopWidth: 1,
//     borderTopColor: '#2C3E33',
//     paddingBottom: Platform.OS === 'ios' ? 34 : 16,
//   },
//   submitButton: {
//     backgroundColor: '#ff8c00',
//     borderRadius: 25,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   submitButtonText: {
//     color: '#000',
//     fontSize: 16,
//     fontWeight: 'bold',
//   }
// });