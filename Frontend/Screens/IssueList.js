import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Shared/Header1'; // Import your Header component

const issues = [
  { id: '1', category: 'Electric', title: 'Switch not working', date: 'Today' },
  { id: '2', category: 'Carpentry', title: 'Door is broken', date: 'Today' },
  { id: '3', category: 'Cleaning', title: 'Request for cleaning the class', date: 'Tuesday' },
  { id: '4', category: 'Plumbing', title: 'Leakage', date: 'Tuesday' },
  { id: '5', category: 'Electric', title: 'Switch not working', date: '24/09/2024' },
];

const groupByDate = (issues) => {
  return issues.reduce((groups, issue) => {
    const { date } = issue;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(issue);
    return groups;
  }, {});
};

const groupedIssues = groupByDate(issues);

export default function IssueListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('IssueDetail', { issue: item })}
    >
      <View style={styles.categoryWrapper}>
        <View style={styles.iconBox}>
          <Ionicons name="alert-circle" size={20} color="white" />
        </View>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = (date) => (
    <View style={styles.dateHeader}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );

  const renderSection = ({ date, issues }) => (
    <View style={styles.sectionWrapper}>
      {renderSectionHeader(date)}
      <FlatList
        data={issues}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <FlatList
        data={Object.keys(groupedIssues)}
        keyExtractor={(date) => date}
        renderItem={({ item: date }) => renderSection({ date, issues: groupedIssues[date] })}
        contentContainerStyle={styles.listContent}  // Add space between header and content
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f1f2f6',  // Light background color for the container
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 3,  // Added elevation for subtle shadow
    marginBottom: 12,  // Added bottom margin between cards
  },
  categoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,  // Spacing between icon and title
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E3963E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  category: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',  // Dark color for category text
  },
  title: {
    fontSize: 16,
    color: '#555',  // Lighter color for title text
  },
  separator: {
    height: 12,  // Adds space between the items
  },
  dateHeader: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginBottom: 5,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E3963E',
  },
  sectionWrapper: {
    marginBottom: 20,  // Adds space between sections
  },
  listContent: {
    marginTop: 80,  // Adjusted space between header and list content (can be tweaked)
  },
});
