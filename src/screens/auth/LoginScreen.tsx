import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { login } = useContext(AuthContext);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    await login();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 20, justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={{ fontSize: 28, marginBottom: 20 }}>Login</Text>

      <Controller
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
          />
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
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
          />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Pressable onPress={handleSubmit(onSubmit)} style={{ backgroundColor: "black", padding: 15 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={{ marginTop: 15 }}>Go to Register</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}