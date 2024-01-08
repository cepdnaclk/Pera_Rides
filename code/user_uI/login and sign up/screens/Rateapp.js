import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RateApp = () => {
  const [rating, setRating] = useState(0); // Initial rating state

  const handleRating = value => {
    // Function to handle setting the rating value
    setRating(value);
    // Logic to submit the rating to your backend or perform other actions
    // For example, send 'value' to an API endpoint to record the user's rating
  };

  // Function to generate star icons based on the rating value
  const renderStars = () => {
    const stars = [];
    const maxStars = 5; // Maximum number of stars

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleRating(i)}>
          <FontAwesome
            name={i <= rating ? 'star' : 'star-o'} // Using FontAwesome icons for stars
            size={40}
            color={i <= rating ? '#FFD700' : '#C0C0C0'} // Selected or unselected star color
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate Our App</Text>
      <View style={styles.starsContainer}>{renderStars()}</View>
      <Text style={styles.ratingText}>
        {rating === 0 ? 'Tap a star to rate' : `You rated: ${rating} stars`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 18,
    color: '#333',
  },
});

export default RateApp;
