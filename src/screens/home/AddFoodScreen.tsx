import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { api } from "../../services/api";

export default function AddFoodScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createFood = async () => {
    await api.post("/foods", {
      title,
      price: Number(price),
      image,
      description: "New food item",
    });

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Pressable onPress={pickImage} style={{ backgroundColor: "gray", padding: 12 }}>
        <Text style={{ color: "white" }}>Pick Image</Text>
      </Pressable>

      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100, marginTop: 10 }} />
      )}

      <Pressable
        onPress={createFood}
        style={{ backgroundColor: "black", padding: 15, marginTop: 20 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Create</Text>
      </Pressable>
    </View>
  );
}
