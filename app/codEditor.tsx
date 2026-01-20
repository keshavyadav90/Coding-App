

// import { Ionicons } from '@expo/vector-icons';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Dimensions,
//   Image,
//   Keyboard,
//   KeyboardAvoidingView,
//   Modal,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// import { SimpleLineIcons } from '@expo/vector-icons';
// import axios from 'axios';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import SyntaxHighlighter from 'react-native-syntax-highlighter';
// import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { languages } from './language';


// interface data {
//   id: number,
//   question: string,
//   hint1: string,
//   hint2: string,
//   example1_input: string,
//   example1_output: string,
//   example2_input: string,
//   example2_output: string,
//   level: string,
//   discription: string,
// }
// interface language {
//   id: number,
//   language: string,
//   image: string
// }

// const CodeEditor = () => {


//   const navigation = useRouter();
//   const scrollViewRef = useRef<ScrollView>(null);
//   const windowWidth = Dimensions.get('window').width;

//   const { parsedItem } = useLocalSearchParams<{ parsedItem: string }>();
//   const Item: data | null = parsedItem ? JSON.parse(parsedItem) : null;



//   if (!Item) return null;

//   const [code, setCode] = useState<string>("");
//   const [selectedLanguage, setSelectedLanguage] = useState<string>("javascript");
//   const [activeTab, setActiveTab] = useState<'case1' | 'case2'>('case1');
//   const [containerHeight, setContainerHeight] = useState(400);
//   const [visible, setVisible] = useState(false)

//   const handleCodeChange = (newCode: string) => {
//     setCode(newCode);
//   };

//   const runCode = async () => {
//     try {
//       await axios.post("http://127.0.0.1:3000/run", {
//         code,
//         languages: AVAILABLE_LANGUAGES,
//         timeoutMs: 3000,
//         user_id: 1,
//         problem_id: 2
//       })
//     } catch (error) {
//       console.error("Faild for fetch error", error)
//     }
//   }

//    const getSyntaxLanguage = (lang: string) => {
//     const mapping: { [key: string]: string } = {
//       'JavaScript': 'javascript',
//       'Python': 'python',
//       'Java': 'java',
//       'C++': 'cpp',
//       'TypeScript': 'typescript'
//     };
//     return mapping[lang] || 'javascript';
//   };


//   useEffect(() => {
//     const lines = code.split('\n').length;
//     const calculatedHeight = Math.max(400, Math.min(lines * 24 + 40, 800));
//     setContainerHeight(calculatedHeight);
//   }, [code]);

//   return (

//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.back()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>

//          <TouchableOpacity
//           onPress={() => setVisible(true)}
//           style={styles.languageSelector}
//         >
//           <View style={styles.languageInfo}>
//             {/* Show icon of selected language if found, else just text */}
//             {(() => {
//               const selectedLangData = languages.find(l => l.language === selectedLanguage);
//               return (
//                 <>
//                   {selectedLangData && <Image source={selectedLangData.image} style={styles.selectedLangIcon} />}
//                   <Text style={styles.selectedLangText}>
//                     {selectedLanguage}
//                   </Text>
//                 </>
//               );
//             })()}
//           </View>
//           <SimpleLineIcons name="arrow-down" size={12} color="#00D9FF" />
//         </TouchableOpacity>

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={visible}
//           onRequestClose={() => setVisible(false)}
//         >
//           <TouchableOpacity 
//             style={styles.modalOverlay}
//             activeOpacity={1}
//             onPress={() => setVisible(false)}
//           >
//             <TouchableOpacity 
//               activeOpacity={1}
//               onPress={(e) => e.stopPropagation()}
//             >
//               <View style={styles.modalContent}>
//                 <View style={styles.modalHeader}>
//                   <Text style={styles.modalTitle}>Select Language</Text>
//                   <TouchableOpacity onPress={() => setVisible(false)}>
//                     <Ionicons name="close" size={24} color="#8B9D92" />
//                   </TouchableOpacity>
//                 </View>

//                 <ScrollView contentContainerStyle={styles.languageList}>
//                   {languages.map((item) => (
//                     <TouchableOpacity
//                       key={item.id}
//                       style={[
//                         styles.languageItem,
//                         selectedLanguage === item.language && styles.activeLanguageItem
//                       ]}
//                       onPress={() => {
//                         setSelectedLanguage(item.language);
//                         setVisible(false);
//                       }}
//                     >
//                       <View style={styles.languageItemLeft}>
//                         <Image source={item.image} style={styles.languageIcon} />
//                         <Text style={[
//                           styles.languageName,
//                           selectedLanguage === item.language && styles.activeLanguageName
//                         ]}>
//                           {item.language}
//                         </Text>
//                       </View>
//                       {selectedLanguage === item.language && (
//                         <Ionicons name="checkmark" size={20} color="#E5855E" />
//                       )}
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>
//               </View>
//             </TouchableOpacity>
//           </TouchableOpacity>
//         </Modal>


//         <View style={styles.headerRightIcons}>
//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="copy-outline" size={22} color="#8B9D92" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="refresh-outline" size={22} color="#8B9D92" />
//           </TouchableOpacity>
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
//           showsVerticalScrollIndicator={false}
//         >

//           <View style={styles.editorWrapper}>
//             <View style={styles.editorHeader}>
//               <Ionicons name="code-slash" size={16} color="#8B9D92" />
//               <Text style={styles.editorTitle}>Solution</Text>
//             </View>

//             <View style={[styles.editorContainer, { height: containerHeight }]}>

//               <View style={styles.highlightContainer} pointerEvents="none">
//                 <SyntaxHighlighter
//                   style={atomOneDark}
//                   language={selectedLanguage}
//                   wrapLines={true}
//                   fontSize={16}
//                   fontFamily={Platform.OS === 'ios' ? 'Menlo' : 'monospace'}
//                   PreTag={View}
//                   CodeTag={View}
//                   customStyle={{
//                     padding: 16,
//                     margin: 0,
//                     backgroundColor: 'transparent',
//                     minHeight: containerHeight,
//                     lineHeight: 22,
//                   }}
//                   showLineNumbers={false}
//                 >
//                   {code || ' '}
//                 </SyntaxHighlighter>
//               </View>

//               <TextInput
//                 style={styles.textInput}
//                 cursorColor="#00D9FF"
//                 selectionColor="rgba(0, 217, 255, 0.3)"
//                 multiline
//                 value={code}
//                 onChangeText={handleCodeChange}
//                 textAlignVertical="top"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 spellCheck={false}
//                 placeholder="// Write your code here..."
//                 placeholderTextColor="#3A4F42"
//                 scrollEnabled={false}
//               />
//             </View>
//           </View>


//           <View style={styles.testCasesWrapper}>
//             <View style={styles.testCasesHeader}>
//               <View style={styles.testCasesHeaderLeft}>
//                 <Ionicons name="flask" size={18} color="#00D9FF" />
//                 <Text style={styles.sectionTitle}>Test Cases</Text>
//               </View>
//             </View>

//             <View style={styles.tabHeader}>
//               <TouchableOpacity
//                 style={[styles.tabItem, activeTab === 'case1' && styles.activeTabItem]}
//                 onPress={() => setActiveTab('case1')}
//               >
//                 <Text style={[styles.tabText, activeTab === 'case1' && styles.activeTabText]}>
//                   Case 1
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[styles.tabItem, activeTab === 'case2' && styles.activeTabItem]}
//                 onPress={() => setActiveTab('case2')}
//               >
//                 <Text style={[styles.tabText, activeTab === 'case2' && styles.activeTabText]}>
//                   Case 2
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.caseContent}>
//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Input</Text>
//                 <View style={styles.readOnlyInput}>
//                   <Text style={styles.readOnlyText}>
//                     {activeTab === 'case1' ? Item.example1_input : Item.example2_input}
//                   </Text>
//                 </View>
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Expected Output</Text>
//                 <View style={styles.readOnlyInput}>
//                   <Text style={styles.readOnlyText}>
//                     {activeTab === 'case1' ? Item.example1_output : Item.example2_output}
//                   </Text>
//                 </View>
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
//             activeOpacity={0.8}
//           >
//             <Ionicons name="play" size={18} color="#0A1810" style={{ marginRight: 8 }} />
//             <Text style={styles.submitButtonText}>Run Code</Text>
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
//     backgroundColor: '#0A1810',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     backgroundColor: '#0F1F17',
//     borderBottomWidth: 1,
//     borderBottomColor: '#1A2F24',
//   },
//   backButton: {
//     marginRight: 16,
//     padding: 4,
//   },
//   badge: {
//     // backgroundColor: '#1A2F24',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     // borderRadius: 6,
//     // borderWidth: 1,
//     // borderColor: '#2A4435',
//     flex: 1,
//   },
//   languageSelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#1A2F24',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#2A4435',
//     minWidth: 140,
//   },
//   languageInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   selectedLangIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//   },
//   selectedLangText: {
//     color: '#00D9FF',
//     fontSize: 14,
//     fontWeight: '600',
//     letterSpacing: 0.3,
//   },

//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: '#0F1F17',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     borderWidth: 1,
//     borderColor: '#1A2F24',
//     paddingBottom: Platform.OS === 'ios' ? 40 : 24,
//     maxHeight: '70%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#1A2F24',
//   },
//   modalTitle: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '700',
//   },
//   languageList: {
//     padding: 16,
//     gap: 12,
//   },
//   languageItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//     backgroundColor: '#0A1810',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#1A2F24',
//   },
//   activeLanguageItem: {
//     borderColor: '#E5855E', // Match the orange/brown border in the image
//     backgroundColor: '#1E1A18', // Slightly warmer dark bg
//   },
//   languageItemLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   languageIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//   },
//   languageName: {
//     color: '#B8C5BE',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   activeLanguageName: {
//     color: '#FFFFFF',
//     fontWeight: '700',
//   },
//   picker: {
//     color: '#00D9FF',
//     height: 50,
//     width: 150,
//     marginTop: -12,
//   },
//   headerRightIcons: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   iconButton: {
//     padding: 8,
//   },
//   keyboardContainer: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flex: 1,
//     backgroundColor: '#0A1810',
//   },
//   scrollContent: {
//     paddingBottom: 20,
//   },


//   editorWrapper: {
//     margin: 16,
//     borderRadius: 12,
//     backgroundColor: '#0F1F17',
//     borderWidth: 1,
//     borderColor: '#1A2F24',
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   editorHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#0D1C14',
//     borderBottomWidth: 1,
//     borderBottomColor: '#1A2F24',
//     gap: 8,
//   },
//   editorTitle: {
//     color: '#8B9D92',
//     fontSize: 13,
//     fontWeight: '600',
//     letterSpacing: 0.5,
//     textTransform: 'uppercase',
//   },
//   editorContainer: {
//     position: 'relative',
//     backgroundColor: '#0A1810',
//   },
//   highlightContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 1,
//   },
//   textInput: {
//     fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
//     fontSize: 16,
//     lineHeight: 22,
//     padding: 16,
//     textAlignVertical: 'top',
//     width: '100%',
//     height: '100%',
//     zIndex: 2,
//     ...Platform.select({
//       ios: {
//         color: 'transparent',
//         backgroundColor: 'transparent',
//       },
//       android: {

//         color: 'rgba(255, 255, 255, 0.01)',
//         backgroundColor: 'transparent',
//         textAlignVertical: 'top',
//         includeFontPadding: false,
//       },
//     }),
//   },


//   testCasesWrapper: {
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 12,
//     backgroundColor: '#0F1F17',
//     borderWidth: 1,
//     borderColor: '#1A2F24',
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   testCasesHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#0D1C14',
//     borderBottomWidth: 1,
//     borderBottomColor: '#1A2F24',
//   },
//   testCasesHeaderLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   sectionTitle: {
//     color: '#FFFFFF',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   tabHeader: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#1A2F24',
//   },
//   tabItem: {
//     marginRight: 24,
//     paddingBottom: 12,
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//   },
//   activeTabItem: {
//     borderBottomColor: '#00D9FF',
//   },
//   tabText: {
//     color: '#5A6F62',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   activeTabText: {
//     color: '#00D9FF',
//   },
//   caseContent: {
//     padding: 16,
//     gap: 16,
//   },
//   inputGroup: {
//     gap: 8,
//   },
//   label: {
//     color: '#8B9D92',
//     fontSize: 13,
//     fontWeight: '600',
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   readOnlyInput: {
//     backgroundColor: '#0A1810',
//     padding: 14,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#1A2F24',
//   },
//   readOnlyText: {
//     color: '#B8C5BE',
//     fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
//     fontSize: 13,
//     lineHeight: 20,
//   },


//   footer: {
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: Platform.OS === 'ios' ? 28 : 16,
//     backgroundColor: '#0F1F17',
//     borderTopWidth: 1,
//     borderTopColor: '#1A2F24',
//   },
//   submitButton: {
//     backgroundColor: '#00D9FF',
//     borderRadius: 12,
//     height: 52,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     shadowColor: '#00D9FF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   submitButtonText: {
//     color: '#0A1810',
//     fontSize: 16,
//     fontWeight: '700',
//     letterSpacing: 0.3,
//   },
//     modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.75)',
//     justifyContent: 'flex-end',
//   },
// });



import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { languages } from './language';


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
interface language {
  id: number,
  language: string,
  image: string
}

const CodeEditor = () => {


  const navigation = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const windowWidth = Dimensions.get('window').width;

  const { parsedItem } = useLocalSearchParams<{ parsedItem: string }>();
  const Item: data | null = parsedItem ? JSON.parse(parsedItem) : null;



  if (!Item) return null;

  const [code, setCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("JavaScript");
  const [activeTab, setActiveTab] = useState<'case1' | 'case2'>('case1');
  const [containerHeight, setContainerHeight] = useState(400);
  const [visible, setVisible] = useState(false)

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };
  const getSyntaxLanguage = (lang: string) => {
    const mapping: { [key: string]: string } = {
      'JavaScript': 'javascript',
      'Python': 'python',
      'Java': 'java',
      'C++': 'cpp',
      'TypeScript': 'typescript'
    };
    return mapping[lang] || 'javascript';
  };

  const runCode = async () => {
    try {
      await axios.post("http://127.0.0.1:3000/run", {
        code,
        language: selectedLanguage,
        timeoutMs: 3000,
        user_id: 1,
        problem_id: 2
      })
    } catch (error) {
      console.error("Failed to fetch error", error)
    }
  }


  useEffect(() => {
    const lines = code.split('\n').length;
    const calculatedHeight = Math.max(400, Math.min(lines * 24 + 40, 800));
    setContainerHeight(calculatedHeight);
  }, [code]);

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.languageSelector}
        >
          <View style={styles.languageInfo}>

            {(() => {
              const selectedLangData = languages.find(l => l.language === selectedLanguage);
              return (
                <>
                  {selectedLangData && <Image source={selectedLangData.image} style={styles.selectedLangIcon} />}
                  <Text style={styles.selectedLangText}>
                    {selectedLanguage}
                  </Text>
                </>
              );
            })()}
          </View>
          <SimpleLineIcons name="arrow-down" size={12} color="#00D9FF" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setVisible(false)}
          >
            <TouchableOpacity 
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Language</Text>
                  <TouchableOpacity onPress={() => setVisible(false)}>
                    <Ionicons name="close" size={24} color="#8B9D92" />
                  </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.languageList}>
                  {languages.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.languageItem,
                        selectedLanguage === item.language && styles.activeLanguageItem
                      ]}
                      onPress={() => {
                        setSelectedLanguage(item.language);
                        setVisible(false);
                      }}
                    >
                      <View style={styles.languageItemLeft}>
                        <Image source={item.image} style={styles.languageIcon} />
                        <Text style={[
                          styles.languageName,
                          selectedLanguage === item.language && styles.activeLanguageName
                        ]}>
                          {item.language}
                        </Text>
                      </View>
                      {selectedLanguage === item.language && (
                        <Ionicons name="checkmark" size={20} color="#E5855E" />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
            
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>


        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="copy-outline" size={22} color="#8B9D92" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="refresh-outline" size={22} color="#8B9D92" />
          </TouchableOpacity>
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
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.editorWrapper}>
            <View style={styles.editorHeader}>
              <Ionicons name="code-slash" size={16} color="#8B9D92" />
              <Text style={styles.editorTitle}>Solution</Text>
            </View>

            <View style={[styles.editorContainer, { height: containerHeight }]}>

              <View style={styles.highlightContainer} pointerEvents="none">
                <SyntaxHighlighter
                  style={atomOneDark}
                  language={getSyntaxLanguage(selectedLanguage)}
                  wrapLines={true}
                  fontSize={16}
                  fontFamily={Platform.OS === 'ios' ? 'Menlo' : 'monospace'}
                  PreTag={View}
                  CodeTag={View}
                  customStyle={{
                    padding: 16,
                    margin: 0,
                    backgroundColor: 'transparent',
                    minHeight: containerHeight,
                    lineHeight: 22,
                  }}
                  showLineNumbers={false}
                >
                  {code || ' '}
                </SyntaxHighlighter>
              </View>

              <TextInput
                style={styles.textInput}
                cursorColor="#00D9FF"
                selectionColor="rgba(0, 217, 255, 0.3)"
                multiline
                value={code}
                onChangeText={handleCodeChange}
                textAlignVertical="top"
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                placeholder="// Write your code here..."
                placeholderTextColor="#3A4F42"
                scrollEnabled={false}
              />
            </View>
          </View>


          <View style={styles.testCasesWrapper}>
            <View style={styles.testCasesHeader}>
              <View style={styles.testCasesHeaderLeft}>
                <Ionicons name="flask" size={18} color="#00D9FF" />
                <Text style={styles.sectionTitle}>Test Cases</Text>
              </View>
            </View>

            <View style={styles.tabHeader}>
              <TouchableOpacity
                style={[styles.tabItem, activeTab === 'case1' && styles.activeTabItem]}
                onPress={() => setActiveTab('case1')}
              >
                <Text style={[styles.tabText, activeTab === 'case1' && styles.activeTabText]}>
                  Case 1
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabItem, activeTab === 'case2' && styles.activeTabItem]}
                onPress={() => setActiveTab('case2')}
              >
                <Text style={[styles.tabText, activeTab === 'case2' && styles.activeTabText]}>
                  Case 2
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.caseContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Input</Text>
                <View style={styles.readOnlyInput}>
                  <Text style={styles.readOnlyText}>
                    {activeTab === 'case1' ? Item.example1_input : Item.example2_input}
                  </Text>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Expected Output</Text>
                <View style={styles.readOnlyInput}>
                  <Text style={styles.readOnlyText}>
                    {activeTab === 'case1' ? Item.example1_output : Item.example2_output}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>


        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              Keyboard.dismiss();
              runCode();
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="play" size={18} color="#0A1810" style={{ marginRight: 8 }} />
            <Text style={styles.submitButtonText}>Run Code</Text>
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
    backgroundColor: '#0A1810',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#0F1F17',
    borderBottomWidth: 1,
    borderBottomColor: '#1A2F24',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flex: 1,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A2F24',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2A4435',
    minWidth: 140,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectedLangIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  selectedLangText: {
    color: '#00D9FF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0F1F17',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2F24',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#1A2F24',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  languageList: {
    padding: 16,
    gap: 10,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#0A1810',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#1A2F24',
  },
  activeLanguageItem: {
    borderColor: '#E5855E',
    backgroundColor: '#1A1410',
  },
  languageItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  languageName: {
    color: '#B8C5BE',
    fontSize: 16,
    fontWeight: '500',
  },
  activeLanguageName: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  picker: {
    color: '#00D9FF',
    height: 50,
    width: 150,
    marginTop: -12,
  },
  headerRightIcons: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 'auto',
  },
  iconButton: {
    padding: 8,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#0A1810',
  },
  scrollContent: {
    paddingBottom: 20,
  },


  editorWrapper: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#1A2F24',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  editorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0D1C14',
    borderBottomWidth: 1,
    borderBottomColor: '#1A2F24',
    gap: 8,
  },
  editorTitle: {
    color: '#8B9D92',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  editorContainer: {
    position: 'relative',
    backgroundColor: '#0A1810',
  },
  highlightContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  textInput: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 16,
    lineHeight: 22,
    padding: 16,
    textAlignVertical: 'top',
    width: '100%',
    height: '100%',
    zIndex: 2,
    ...Platform.select({
      ios: {
        color: 'transparent',
        backgroundColor: 'transparent',
      },
      android: {

        color: 'rgba(255, 255, 255, 0.01)',
        backgroundColor: 'transparent',
        textAlignVertical: 'top',
        includeFontPadding: false,
      },
    }),
  },


  testCasesWrapper: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#0F1F17',
    borderWidth: 1,
    borderColor: '#1A2F24',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  testCasesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0D1C14',
    borderBottomWidth: 1,
    borderBottomColor: '#1A2F24',
  },
  testCasesHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  tabHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A2F24',
  },
  tabItem: {
    marginRight: 24,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: '#00D9FF',
  },
  tabText: {
    color: '#5A6F62',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#00D9FF',
  },
  caseContent: {
    padding: 16,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: '#8B9D92',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  readOnlyInput: {
    backgroundColor: '#0A1810',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1A2F24',
  },
  readOnlyText: {
    color: '#B8C5BE',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    lineHeight: 20,
  },


  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    backgroundColor: '#0F1F17',
    borderTopWidth: 1,
    borderTopColor: '#1A2F24',
  },
  submitButton: {
    backgroundColor: '#00D9FF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#0A1810',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});