import React from 'react';
import { View, Text, Pressable } from 'react-native';

export const RadioButton =({ data, onPress }) => {
  return (
    <View>
    {data.map((item) => {
      return (
        <Pressable onPress={onPress(item.value)}>
          <Text> {item.value}</Text>
        </Pressable>
      );
    })}
  </View>
  );
}