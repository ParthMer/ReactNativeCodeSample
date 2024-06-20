import React from 'react';
import { TextInput, View, StyleSheet, Text, Image, Pressable } from 'react-native';

interface TextInputProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  onPress?: () => void;
  value?: string;
  label?: string;
  error?: string;
  inputStyle?: object;
  secureTextEntry?: boolean;
  icon?: any;
}

const CustomTextInput: React.FC<TextInputProps> = ({
  placeholder,
  onChangeText,
  value,
  label,
  error,
  inputStyle,
  onBlur,
  onPress,
  secureTextEntry,
  icon,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={'grey'}
      />
      {icon && (
        <Pressable onPress={onPress} style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} />
        </Pressable>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  input: {
    height: 60,
    backgroundColor: '#f4f0f0',
    color: 'black',
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
  error: {
    color: 'red',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 17,
    right: 10,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 5,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});

export default CustomTextInput;
