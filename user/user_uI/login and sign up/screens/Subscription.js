// Import necessary components and libraries
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, PricingCard } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

// SubscriptionPlans component

const Subscription = () => {
  const navigation = useNavigation();
  // State to track the selected plan
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Function to handle subscription purchase
  const handleSubscribe = () => {
    // Implement logic for handling subscription purchase
    // This could include navigating to a payment screen, integrating with a payment service, etc.
    if (selectedPlan) {
      // Navigate to the payment screen or initiate the payment process
      // For example, you can use navigation.navigate('PaymentScreen', { selectedPlan });
      // Replace 'PaymentScreen' with the actual screen where you handle payments.
      console.log(`Subscribe to ${selectedPlan.name}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Subscription Plan</Text>

      {/* Display subscription plans using PricingCard */}
      <Card containerStyle={styles.cardContainer}>
        <PricingCard
          color="#4f9deb"
          title="Weekly Plan"
          price="LKR 200"
          info={['Access to basic features', 'Limited support']}
          button={{ title: 'Select', icon: 'check' }}
          onButtonPress={() => navigation.push('Money')}
        />
      </Card>

      <Card containerStyle={styles.smallcardContainer}>
        <PricingCard
          color="#ff9900"
          title="Monthly Plan"
          price="LKR 700"
          info={['Full access to all features', 'Priority support']}
          button={{ title: 'Select', icon: 'check' }}
          onButtonPress={() => navigation.push('Money')}
        />
      </Card>

      {/* Button to handle subscription */}
      {/* <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
        <Text style={styles.subscribeButtonText}>Subscribe</Text>
      </TouchableOpacity> */}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    topmargin: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardContainer: {
    marginBottom: 0.5,
    borderWidth: 1,
    borderRadius: 10,
  },
  smallCardContainer: {
    marginBottom: 10, // Adjust the margin as needed
    borderWidth: 1,
    borderRadius: 10,
    width: Dimensions.get('window').width - 100, // Adjust the width as needed
  },
  subscribeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  subscribeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Subscription;
