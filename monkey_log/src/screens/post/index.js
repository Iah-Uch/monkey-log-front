import React, { useState } from "react";
import { VStack, Text, Center, Input, Button } from "native-base";
import { useNavigation } from '@react-navigation/native';


const Post = () => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState(Math.floor(Math.random() * 3) + 1);
  const navigation = useNavigation();


  async function PostFeed() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://6f0e-177-10-234-141.ngrok-free.app/feed`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            description,
            authorId: author
          })
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar feed");
      }
      setLoading(false);
    } catch (error) {
      console.error("Ocorreu um erro ao carregar o feed:", error);
    }
  }

  return (
    <VStack bgColor={"#0B1416"} flex={1} p={4}>
      <Text color="white" fontSize="lg" mb={4}>Create a post</Text>
      <Center borderTopWidth={1} borderColor={"#272729"}>
        <Input
          placeholder="Title"
          value={description}
          onChangeText={(text) => setDescription(text)}
          variant="filled"
          bgColor="#0B1416"
          color={"white"}
          my={4}
          borderWidth={1}
          borderColor={"#272729"}
        />
        <Center color={"white"} bgColor={"#272729"}
          borderWidth={1}
          borderColor={"#1A1A1B"}
          paddingTop={19}
          borderRadius={10}

          > 
          <Text paddingBottom={4} color={"white"}>Markdown</Text>
        <Input
          placeholder="Digite a descrição do feed"
          variant="filled"
          bgColor="#1A1A1B"
          borderWidth={1}
          borderColor={"#272729"}
          h={70}
        />
        </Center>
        <Center flexDirection={"row"}>
        <Button margin={4} onPress={() => {
          navigation.goBack()
        }} isLoading={loading}>Cancel</Button>
        <Button margin={4} onPress={PostFeed} isLoading={loading}>
          Post
        </Button>
        </Center>
      </Center>
    </VStack>
  );
};

export default Post;
