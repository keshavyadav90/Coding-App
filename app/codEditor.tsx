import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';



import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

const App = () => {
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Define variable tempX', checked: true },
    { id: 2, text: 'Implement bubble sort loop', checked: false },
    { id: 3, text: 'Return sorted integers', checked: false },
  ]);

  const toggleCheck = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const checkedCount = checklist.filter((item) => item.checked).length;

  const codeLines = [
    'function sortArray(arr) {',
    '  let n = arr.length;',
    '  ',
    '  // TODO: Implement sorting logic',
    '  for (let i = 0; i < n - 1; i++) {',
    '    |',
    '  }',
    '  ',
    '  return arr;',
    '}',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#102217" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Algo-Sort X</Text>
          <TouchableOpacity style={[styles.iconButton, styles.primaryIconButton]}>
            <Text style={styles.primaryIconText}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* HUD Stats */}
        <View style={styles.hudContainer}>
          <View style={styles.statPill}>
            <Text style={styles.timerIcon}>⏱</Text>
            <Text style={styles.timerText}>14:02</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={styles.rankLabel}>RANK</Text>
            <Text style={styles.rankValue}>#12</Text>
            <View style={styles.rankChange}>
              <Text style={styles.rankArrow}>↑</Text>
              <Text style={styles.rankChangeValue}>3</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Mission Objectives */}
        <View style={styles.section}>
          <View style={styles.objectivesCard}>
            <View style={styles.objectivesHeader}>
              <Text style={styles.objectivesTitle}>MISSION OBJECTIVES</Text>
              <View style={styles.progressBadge}>
                <Text style={styles.progressText}>{checkedCount}/3</Text>
              </View>
            </View>
            
            {checklist.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.checklistItem}
                onPress={() => toggleCheck(item.id)}
              >
                <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
                  {item.checked && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[styles.checklistText, item.checked && styles.checklistTextChecked]}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Code Editor */}
        <View style={styles.section}>
          <View style={styles.editorHeader}>
            <Text style={styles.fileName}>solution.js</Text>
            <Text style={styles.autoSaved}>Auto-saved</Text>
          </View>
          
          <View style={styles.editorContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.editorContent}>
                {/* Line Numbers */}
                <View style={styles.lineNumbers}>
                  {codeLines.map((_, index) => (
                    <Text key={index} style={styles.lineNumber}>
                      {index + 1}
                    </Text>
                  ))}
                </View>
                
                {/* Code */}
                <View style={styles.codeArea}>
                  {codeLines.map((line, index) => (
                    <Text key={index} style={styles.codeLine}>
                      {line === '|' ? (
                        <Text style={styles.cursor}>|</Text>
                      ) : (
                        line
                      )}
                    </Text>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Keyboard Helper */}
        <View style={styles.keyboardHelper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.keyboardRow}>
              {['{', '}', '(', ')', '[', ']', ';', '=', 'tab'].map((key, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.keyButton, key === 'tab' && styles.tabKey]}
                >
                  <Text style={[styles.keyText, key === 'tab' && styles.tabKeyText]}>
                    {key}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Action Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.testButton}>
          <Text style={styles.testButtonIcon}>▶</Text>
          <Text style={styles.testButtonText}>Test Run</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonIcon}>✓</Text>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102217',
  },
  header: {
    backgroundColor: 'rgba(16, 34, 23, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    paddingBottom: rh(1),
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rw(4),
    paddingTop: rh(1),
    paddingBottom: rh(1),
  },
  iconButton: {
    width: rw(10),
    height: rw(10),
    borderRadius: rw(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryIconButton: {
    backgroundColor: 'rgba(43, 238, 121, 0.1)',
  },
  iconText: {
    fontSize: rf(3),
    color: '#fff',
  },
  primaryIconText: {
    fontSize: rf(2.5),
    color: '#2bee79',
  },
  title: {
    fontSize: rf(2.2),
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  hudContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: rw(4),
    paddingBottom: rh(1),
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2e22',
    borderRadius: 20,
    paddingHorizontal: rw(3),
    paddingVertical: rh(0.8),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 8,
  },
  timerIcon: {
    fontSize: rf(2),
    color: '#2bee79',
  },
  timerText: {
    fontSize: rf(1.8),
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'monospace',
  },
  rankLabel: {
    fontSize: rf(1.3),
    color: '#9ca3af',
    fontWeight: '500',
  },
  rankValue: {
    fontSize: rf(1.8),
    fontWeight: 'bold',
    color: '#fff',
  },
  rankChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rankArrow: {
    fontSize: rf(1.5),
    color: '#2bee79',
    fontWeight: 'bold',
  },
  rankChangeValue: {
    fontSize: rf(1.3),
    color: '#2bee79',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
  },
  section: {
    paddingHorizontal: rw(4),
    paddingTop: rh(2),
  },
  objectivesCard: {
    backgroundColor: '#1a2e22',
    borderRadius: 16,
    padding: rw(4),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  objectivesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rh(1.5),
  },
  objectivesTitle: {
    fontSize: rf(1.4),
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  progressBadge: {
    backgroundColor: 'rgba(43, 238, 121, 0.2)',
    paddingHorizontal: rw(2),
    paddingVertical: rh(0.3),
    borderRadius: 12,
  },
  progressText: {
    fontSize: rf(1.3),
    color: '#2bee79',
    fontWeight: 'bold',
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rh(1.2),
    gap: 12,
  },
  checkbox: {
    width: rw(5),
    height: rw(5),
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#326747',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2bee79',
    borderColor: '#2bee79',
  },
  checkmark: {
    fontSize: rf(1.5),
    color: '#102217',
    fontWeight: 'bold',
  },
  checklistText: {
    fontSize: rf(1.6),
    color: '#d1d5db',
    flex: 1,
  },
  checklistTextChecked: {
    color: '#6b7280',
    textDecorationLine: 'line-through',
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rh(1),
  },
  fileName: {
    fontSize: rf(1.3),
    color: '#9ca3af',
    fontFamily: 'monospace',
  },
  autoSaved: {
    fontSize: rf(1.3),
    color: '#2bee79',
    opacity: 0.8,
    fontFamily: 'monospace',
  },
  editorContainer: {
    backgroundColor: '#0b1610',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: rh(35),
  },
  editorContent: {
    flexDirection: 'row',
  },
  lineNumbers: {
    backgroundColor: '#0f1d16',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: rh(2),
    paddingHorizontal: rw(3),
  },
  lineNumber: {
    fontSize: rf(1.5),
    color: '#6b7280',
    fontFamily: 'monospace',
    lineHeight: rf(2.5),
    textAlign: 'right',
  },
  codeArea: {
    paddingVertical: rh(2),
    paddingHorizontal: rw(4),
  },
  codeLine: {
    fontSize: rf(1.5),
    color: '#d1d5db',
    fontFamily: 'monospace',
    lineHeight: rf(2.5),
  },
  cursor: {
    color: '#2bee79',
  },
  keyboardHelper: {
    backgroundColor: '#15261d',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: rh(1),
    marginTop: rh(2),
  },
  keyboardRow: {
    flexDirection: 'row',
    paddingHorizontal: rw(3),
    gap: 8,
  },
  keyButton: {
    height: rh(5),
    minWidth: rw(10),
    backgroundColor: '#234832',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rw(3),
  },
  tabKey: {
    backgroundColor: '#234832',
  },
  keyText: {
    fontSize: rf(2),
    color: '#fff',
    fontFamily: 'monospace',
    fontWeight: '500',
  },
  tabKeyText: {
    color: '#2bee79',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: rw(4),
    paddingVertical: rh(2),
    paddingBottom: rh(3),
    backgroundColor: '#102217',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    gap: 12,
  },
  testButton: {
    flex: 1,
    height: rh(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    gap: 8,
  },
  testButtonIcon: {
    fontSize: rf(2.2),
    color: '#fff',
  },
  testButtonText: {
    fontSize: rf(1.8),
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    flex: 2,
    height: rh(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#2bee79',
    gap: 8,
  },
  submitButtonIcon: {
    fontSize: rf(2.5),
    color: '#102217',
  },
  submitButtonText: {
    fontSize: rf(2),
    color: '#102217',
    fontWeight: 'bold',
  },
});

export default App;