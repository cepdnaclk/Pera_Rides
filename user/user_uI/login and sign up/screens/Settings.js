import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';



const Settings = () => {
  const navigation = useNavigation();
  const [notificationSwitch, setNotificationSwitch] = useState(false);
  const [darkModeSwitch, setDarkModeSwitch] = useState(false);

  const toggleNotificationSwitch = () => {
    setNotificationSwitch((prev) => !prev);
  };

  const toggleDarkModeSwitch = () => {
    setDarkModeSwitch((prev) => !prev);
  };

  


  return (
    <View style={styles.container}>
       
      <Text style={styles.header}>Settings</Text>


      {/* Notification Toggle */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Receive Notifications</Text>
        <Switch
          value={notificationSwitch}
          onValueChange={toggleNotificationSwitch}
          thumbColor="#fff"
          trackColor={{ false: '#aaa', true: '#66bb6a' }}
        />
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={darkModeSwitch}
          onValueChange={toggleDarkModeSwitch}
          thumbColor="#fff"
          trackColor={{ false: '#aaa', true: '#2196F3' }}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.push('Login')}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
