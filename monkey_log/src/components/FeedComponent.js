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

export default function FeedComponent() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    try {
      if (total && pageNumber > total) return;
      setLoading(true);
      const response = await fetch(
        `https://deb9-177-10-234-141.ngrok-free.app/feed?_expand=author&_limit=5&_page=${pageNumber}`
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

  const renderFeed = (item) => {
    return (
      <Box marginTop={5}>
        {/* Post */}
        <HStack padding={15} flexDirection={"row"} alignItems={"center"}>
          {/* Header */}
          <Image
            source={{ uri: item.author.avatar }}
            alt="image1"
            w={9}
            h={9}
            borderRadius={16}
            marginRight={10}
          />
          {/* Avatar */}
          <Text color={"white"} fontWeight={"bold"}>
            {item.author.name}
          </Text>
          {/* Name*/}
        </HStack>
        <LazyImage 
        source={{ uri: item.image }}
        smallSource={{uri: item.small}}
        alt="image2" />
        {/* PostImage */}
        <Text color={"white"} padding={8} lineHeight={8}>
          {/* Description */}
          {/* Name */}
          <Text color={"white"}>{item.author.name}</Text> {item.description}
        </Text>
      </Box>
    );
  };

  async function refreshList(){
    setRefreshing(true);
      await loadPage(1, true)
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
