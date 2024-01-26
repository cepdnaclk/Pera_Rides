import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RateApp = () => {
  const [rating, setRating] = useState(0); // Initial rating state
  const [feedback, setFeedback] = useState('');

  const handleRating = value => {
    // Function to handle setting the rating value
    setRating(value);
  };

  const handleFeedbackChange = text => {
    // Function to handle feedback text input
    setFeedback(text);
  };

  const handleSubmit = () => {
    // Logic to submit the rating and feedback to your backend or perform other actions
    // For example, send 'rating' and 'feedback' to an API endpoint
    console.log(`Rating: ${rating}, Feedback: ${feedback}`);
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
      <TextInput
        style={styles.feedbackInput}
        placeholder="Provide feedback (optional)"
        value={feedback}
        onChangeText={handleFeedbackChange}
        multiline
      />
      <Button title="Submit Rating" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#74ebd5', // Background color (light blue)
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // Text color (white)
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 18,
    color: '#ffffff', // Text color (white)
    marginBottom: 20,
  },
  feedbackInput: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff', // Textbox background color (white)
  },
});

export default RateApp;
