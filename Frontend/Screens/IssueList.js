import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Shared/Header1'; // Import your Header component
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    <ScrollView contentContainerStyle={styles.container}>
      <Header navigation={navigation} />

      <FlatList
        data={Object.keys(groupedIssues)}
        keyExtractor={(date) => date}
        renderItem={({ item: date }) => renderSection({ date, issues: groupedIssues[date] })}
        contentContainerStyle={styles.listContent}  // Add space between header and content
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: wp(4),  // Responsive padding
    backgroundColor: '#f1f2f6',  // Light background color for the container
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(3),  // Responsive padding
    borderRadius: 8,
    elevation: 3,  // Added elevation for subtle shadow
    marginBottom: wp(4),  // Added bottom margin between cards
  },
  categoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(2),  // Spacing between icon and title
  },
  iconBox: {
    width: wp(8),  // Responsive icon box width
    height: wp(8),  // Responsive icon box height
    borderRadius: wp(4),  // Responsive radius for the icon box
    backgroundColor: '#E3963E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),  // Responsive margin right
  },
  category: {
    fontWeight: 'bold',
    fontSize: wp(4.5),  // Responsive font size
    color: '#333',  // Dark color for category text
  },
  title: {
    fontSize: wp(4),  // Responsive font size
    color: '#555',  // Lighter color for title text
  },
  separator: {
    height: wp(3),  // Adds space between the items
  },
  dateHeader: {
    backgroundColor: '#f2f2f2',
    paddingVertical: wp(2),  // Responsive padding
    paddingHorizontal: wp(4),  // Responsive padding
    borderRadius: 5,
    marginBottom: wp(2),
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: wp(4),  // Responsive font size
    color: '#E3963E',
  },
  sectionWrapper: {
    marginBottom: wp(5),  // Adds space between sections
  },
  listContent: {
    paddingTop: hp(4),  // Adds space between header and list content (adjust as needed)
  },
});
