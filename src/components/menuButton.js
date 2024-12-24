import React from 'react';
import { Pressable, StyleSheet,Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MenuButton = ({ onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuButton,
        { transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1 }] },
      ]}
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <MaterialIcons name="more-vert" size={24} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MenuButton;
