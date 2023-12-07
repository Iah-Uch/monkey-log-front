import React from "react";
import { View } from "react-native";
import { Image } from "native-base";

export default function LazyImage({ source }) {
  return (
    <Image
      source={source}
      h={"sm"}
      w={"95%"}
      alt="LazyImage"
      borderRadius={10}
      alignSelf={"center"}
    />
  );
}
