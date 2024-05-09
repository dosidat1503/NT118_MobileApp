import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import AvatarExample from './Avartar'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

export default function HeaderBar() {
  return (
    <View style={styles.homeTop}>
      <AvatarExample></AvatarExample>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="bell"
            size={25}
            color={Colors.light.tint}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  homeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  }
})