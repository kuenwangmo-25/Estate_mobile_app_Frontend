import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../Shared/Header1';

const notifications = [
  { id: '1', title: 'Issue Solved', description: 'Your issue has been solved', date: 'Today' },
  { id: '2', title: 'Issue in Progress', description: 'We are working on your issue', date: 'Today' },
  { id: '3', title: 'Delay in Service', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', date: 'Tuesday' },
  { id: '4', title: 'Issue Solved', description: 'Your issue has been solved', date: 'Tuesday' },
  { id: '5', title: 'Issue Solved', description: 'Your issue has been solved', date: '24/02/2024' },
  { id: '6', title: 'Issue Solved', description: 'Your issue has been solved', date: '24/02/2024' },
  { id: '7', title: 'New Issue Reported', description: 'A new issue has been reported.', date: '24/02/2024' },
  { id: '8', title: 'Issue Closed', description: 'Your issue has been successfully closed.', date: '25/02/2024' },
  { id: '9', title: 'Maintenance Update', description: 'Scheduled maintenance will occur on the weekend.', date: '25/02/2024' },
];

const NotificationScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header navigation={navigation} />
      </View>


      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
        renderItem={({ item, index }) => (
          <View style={styles.notificationBox}>
            {(index === 0 || notifications[index - 1].date !== item.date) && (
              <Text style={styles.dateHeader}>{item.date}</Text>
            )}
            <View style={styles.notificationContent}>
              <Ionicons name="person-circle" size={40} color="#097969" style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDescription}>{item.description}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    paddingHorizontal: 20,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    zIndex: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  notificationList: {
    marginTop: 120,
    paddingBottom: 20,
  },
  notificationBox: {
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#EFEFEF',
    shadowColor: '#EFEFEF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '100%',
    alignSelf: 'stretch',
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E3963E',
    marginBottom: 5,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDescription: {
    color: '#555',
    fontSize: 14,
  },
});

export default NotificationScreen;
