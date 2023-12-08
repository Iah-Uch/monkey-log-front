import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native"
import { VStack, Heading, Box, Button, Text, Image } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { encode, decode } from "js-base64";
import * as yup from "yup";
import { Input } from "../../components/InputComponent";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../../contexts/auth";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const signInSchema = yup.object({
  email: yup.string().required("Enter the email").email("Invalid email"),
  password: yup
    .string()
    .required("Enter the password")
    .min(8, "Password must be at least 8 digits long"),
});

const SignIn = () => {
  const { signIn } = useAuth();
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const handleLogin = async (data) => {
    try {
      await signIn(data);
      // Lógica para autenticar o usuário com o email e senha fornecidos
      // Aqui você pode fazer uma chamada a uma API ou implementar sua própria lógica de autenticação
    } catch (error) {
      console.error(error);
      // Trate o erro aqui, como mostrar uma mensagem de erro ao usuário
    }
  };
  return (
    <VStack flex={1} justifyContent={"space-around"} bgColor={"#0B1416"}>
      <KeyboardAwareScrollView>
      <Box>
          <Image alt="Image logo monkey log" source={require("../../../assets/image-removebg-preview.png")} mt={16} ml={3} w={"80"} /> 
        <Heading
          textAlign="left"
            color="white"
          fontFamily="heading"
          ml={6}
            fontSize={"3xl"}
        >
            Sign in {"\n"}

          </Heading>

        <Heading
          textAlign="left"
            color="white"
          fontFamily="heading"
            fontWeight={"light"}
          ml={6}
            fontSize={"lg"}
        >
            If you don’t have an account register you can {"\n"}
          {
            <TouchableOpacity onPress={() => navigate("SignUp")}>
                <Text color={"#4D47C3"} fontWeight={"bold"} fontSize={"lg"}>
              Register here !
            </Text>
            </TouchableOpacity>
          }
        </Heading>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={8}
              placeholder="Enter email or user name"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
              fontFamily="body"
              returnKeyType="send"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              mt={4}
              placeholder="Password"
              onChangeText={onChange}
              secureTextEntry
              value={value}
              errorMessage={errors.password?.message}
              fontFamily="body"
              returnKeyType="send"
            />
          )}
        />
      </Box>
      <Button
        bgColor={"#4D47C3"}
        mx={10}
        rounded={"lg"}
        padding={5}
        _pressed={{ opacity: "0.6" }}
        onPress={handleSubmit(handleLogin)}
        mt={"1/6"}
      >
        Entrar
      </Button>
      </KeyboardAwareScrollView>
    </VStack>
  );
};

export default SignIn;
