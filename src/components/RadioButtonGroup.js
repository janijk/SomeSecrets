import React from 'react';
import { View, Text, Pressable } from 'react-native';

export const RadioButtonGroup = ({data, onPress}) => {
    
    return (
        <View>
            {data.map((item, indx) => {
            return (
                <Pressable onPress={onPress(indx)}>
                <Text> {item.value}</Text>
                </Pressable>
            );
            })}
      </View>
      );
}