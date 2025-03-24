import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const TextS: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.defaultText, style]} {...props} />;
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Nunito', // Replace with your font name
  },
});

export default TextS;
