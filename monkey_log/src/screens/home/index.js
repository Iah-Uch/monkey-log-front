import React from "react";
import { VStack, Text } from "native-base";
import FeedComponent from "../../components/FeedComponent";

const Home = () => {
  return (
    <VStack bgColor={"#0B1416"} flex={1}>
      <FeedComponent />
    </VStack>
  );
};
export default Home;
