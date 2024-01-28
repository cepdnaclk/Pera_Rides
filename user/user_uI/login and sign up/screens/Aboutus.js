import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const members = [
  {
    name: 'Rajitha Thennakoon',
    photo: require('../assets/images/raj.jpg'), // Replace with actual image path
    description: 'E/19/405',
  },
  {
    name: 'Dulshan Chamuditha',
    photo: require('../assets/images/chamu.jpg'), // Replace with actual image path
    description: 'E/19/395',
  },
  {
    name: 'Sasindu Dilshan',
    photo: require('../assets/images/sasi.jpg'), // Replace with actual image path
    description: 'E/19/465',
  },
  {
    name: 'Jeevajith Madushanka',
    photo: require('../assets/images/jeeva.jpg'), // Replace with actual image path
    description: 'E/19/227',
  },
  {
    name: 'Pasan Dissanayake',
    photo: require('../assets/images/pasa.jpg'),
    description: 'E/19/091',
  },
  // Add similar objects for other members
];

export default function AboutUs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.description}>
        We are undergraduate Computer Engineering students of University of Peradeniya.
      </Text>
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          {members.slice(0, 2).map((member, index) => (
            <View key={index} style={index === 0 ? styles.firstRowMemberContainer : styles.memberContainer}>
              <Image source={member.photo} style={styles.memberPhoto} />
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberDescription}>{member.description}</Text>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          {members.slice(2, 4).map((member, index) => (
            <View key={index} style={styles.memberContainer}>
              <Image source={member.photo} style={styles.memberPhoto} />
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberDescription}>{member.description}</Text>
            </View>
          ))}
        </View>
        <View style={styles.centerMember}>
          <View style={styles.memberContainer}>
            <Image source={members[4].photo} style={styles.memberPhoto} />
            <Text style={styles.memberName}>{members[4].name}</Text>
            <Text style={styles.memberDescription}>{members[4].description}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  centerMember: {
    alignItems: 'center',
    marginBottom: 20,
  },
  memberContainer: {
    alignItems: 'center',
  },
  firstRowMemberContainer: {
    alignItems: 'center',
    marginRight: 15, // Added margin between the first two names
  },
  memberPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  memberDescription: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
