import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { api } from "../../services/api";

export default function EditFoodScreen({ route, navigation }: any) {
  const { food } = route.params;

  const [title, setTitle] = useState(food.title);
  const [price, setPrice] = useState(String(food.price));

  const updateFood = async () => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      title,
      price: Number(price),
    });
    navigation.goBack();
  };

  const deleteFood = async () => {
    await api.delete(`/foods/${food.id}`);
    navigation.popToTop();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Pressable onPress={updateFood} style={{ backgroundColor: "black", padding: 12 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Update</Text>
      </Pressable>

      <Pressable
        onPress={deleteFood}
        style={{ backgroundColor: "red", padding: 12, marginTop: 10 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Delete</Text>
      </Pressable>
    </View>
  );
}
