import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { scalSize } from '../common/helper';
import { Colors } from '../common/color';

interface ButtonProps {
  disabled?: boolean;
  onPress?: () => void;
  title?: string;
  style?: object;
  textStyle?: object;
}

const CustomButton: React.FC<ButtonProps> = ({
  disabled = false,
  onPress,
  title = '',
  style,
  textStyle,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        style,
        { opacity: disabled ? 0.5 : 1 }, // Adjust opacity based on disabled state
      ]}
      disabled={disabled}
      onPress={onPress}
      accessible // Ensure accessibility
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scalSize(15),
    alignItems: 'center',
    borderRadius: scalSize(8),
    backgroundColor: Colors.chilled_chilly,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default CustomButton;
