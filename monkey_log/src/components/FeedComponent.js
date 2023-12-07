import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Button,
  Icon,
  Box,
  HStack,
  Image,
  Text,
  FlatList,
  VStack,
  Center,
  Avatar,
  Spinner,
} from "native-base";
import LazyImage from "./LazyImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FeedComponent() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    try {
      if (total && pageNumber > total) return;
      setLoading(true);
      const response = await fetch(
        `https://e819-177-10-234-141.ngrok-free.app/feed?_expand=author&_limit=5&_page=${pageNumber}`
      );

      if (!response.ok) {
        throw new Error("Erro ao carregar feed");
      }

      const data = await response.json();
      const totalItems = response.headers.get("X-Total-Count");

      setTotal(Math.floor(totalItems / 5));
      setFeed(shouldRefresh ? data : [...feed, ...data]);
      setPage(pageNumber + 1);
      setLoading(false);
    } catch (error) {
      console.error("Ocorreu um erro ao carregar o feed:", error);
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  function handleLike() {
    setLikes(likes + 1);
  }

  function handleDislike() {
    setDislikes(dislikes + 1);
  }

  const renderFeed = (item) => {
    return (
      <Box marginTop={1}>
        <HStack padding={15} flexDirection={"row"} alignItems={"center"}>
          {/* Header */}
          <Image
            source={{ uri: item.author.avatar }}
            alt="image1"
            w={9}
            h={9}
            borderRadius={16}
            marginRight={3}
          />
          {/* Avatar */}
          <Text color={"white"} fontWeight={"bold"}>
            {item.author.name}
          </Text>
          {/* Name*/}
        </HStack>
        <Text color={"white"} padding={3} lineHeight={8} fontWeight={"bold"}>
          {/* Description */}
          {item.description}
        </Text>
        {item.image ? (
          <LazyImage
            source={{ uri: item.image }}
            smallSource={{ uri: item.small }}
            alt="image2"
          />
        ) : (
          <></>
        )}
        <HStack marginY={3}>
          <Box
            h={35}
            w={88}
            backgroundColor={"#1A282D"}
            borderRadius={50}
            marginLeft={5}
            flexDirection={"row"}
            justifyContent={"center"}
          >
            <MaterialCommunityIcons
              name="arrow-up-bold-outline"
              size={24}
              color="white"
              onPress={handleLike}
              style={{ alignSelf: "center" }}
            />
            <Text color={"white"} padding={2}>
              {likes}
            </Text>
            <MaterialCommunityIcons
              name="arrow-down-bold-outline"
              size={24}
              color="white"
              onPress={handleDislike}
              style={{ alignSelf: "center" }}
            />
          </Box>
          <Box
            h={35}
            w={50}
            backgroundColor={"#1A282D"}
            borderRadius={50}
            marginLeft={5}
            flexDirection={"row"}
            justifyContent={"center"}
          >
            <MaterialCommunityIcons
              name="share-variant"
              size={24}
              color="white"
              style={{ alignSelf: "center" }}
            />
          </Box>
        </HStack>
      </Box>
    );
  };

  async function refreshList() {
    setRefreshing(true);
    await loadPage(1, true);
    setRefreshing(false);
  }

  return (
    <Box>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        ListFooterComponent={
          loading && <Spinner margin={30} size={"sm"} color={"#999"} />
        }
        renderItem={({ item }) => renderFeed(item)}
      />
    </Box>
  );
}
