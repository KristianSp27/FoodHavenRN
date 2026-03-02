import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput } from "react-native";

export default function RegisterScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 20, justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={{ fontSize: 28, marginBottom: 20 }}>Register</Text>

      <Controller
        control={control}
        name="email"
        rules={{ required: "Email required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder="Email" value={value} onChangeText={onChange} style={{ borderWidth: 1, marginBottom: 10, padding: 10 }} />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password required",
          minLength: { value: 6, message: "Min length is 6" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput placeholder="Password" secureTextEntry value={value} onChangeText={onChange} style={{ borderWidth: 1, marginBottom: 10, padding: 10 }} />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Pressable onPress={handleSubmit(onSubmit)} style={{ backgroundColor: "black", padding: 15 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}