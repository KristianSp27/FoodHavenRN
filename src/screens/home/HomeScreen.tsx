import React, { useCallback, useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    RefreshControl,
    Text
} from "react-native";
import { api } from "../../services/api";

export default function HomeScreen({ navigation }: any) {
  const [foods, setFoods] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const res = await api.get("/foods");
      setFoods(res.data);
    } catch (e) {
      console.log("Error fetching foods", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFoods();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={foods}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            navigation.navigate("Details", { food: item })
          }
          style={{ padding: 16, borderBottomWidth: 1 }}
        >
          <Text style={{ fontSize: 18 }}>{item.title}</Text>
          <Text>${item.price}</Text>
        </Pressable>
      )}
    />
  );
}