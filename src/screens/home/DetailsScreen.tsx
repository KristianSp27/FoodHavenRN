import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function DetailsScreen({ route, navigation }: any) {
  const { food } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Image source={{ uri: food.image }} style={{ width: "100%", height: 200 }} />
      <Text style={{ fontSize: 24 }}>{food.title}</Text>
      <Text>${food.price}</Text>
      <Text>{food.description}</Text>

      <Pressable
        onPress={() => navigation.navigate("EditFood", { food })}
        style={{ backgroundColor: "black", padding: 12, marginTop: 20 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Edit</Text>
      </Pressable>
    </View>
  );
}
