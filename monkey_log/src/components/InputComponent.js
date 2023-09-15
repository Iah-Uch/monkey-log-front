import React from "react";
import { Input as NativeBaseInput, FormControl } from "native-base";

export function Input({ errorMessage = null, isInvalid, ...rest }) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput
        borderWidth={1}
        borderColor="#1A282D"
        fontSize="xs"
        color="white"
        bgColor={"#1A282D"}
        fontFamily="body"
        rounded="lg"
        isInvalid={invalid}
        mx={5}
        py={5}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        placeholderTextColor="gray.300"
        _focus={{
          bg: "white",
          borderWidth: 1,
          borderColor: "green.500",
        }}
        {...rest}
      />
      <FormControl.ErrorMessage mx={"5"}>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
