import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import axios from "axios";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Image,
  NativeBaseProvider,
  Pressable,
  Spacer,
  Text,
} from "native-base";

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=20`)
      .then(async (response) => {
        const { data } = response;
        const pokemonList = data.results;

        const detailedPokemonList = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const detailedResponse = await axios.get(pokemon.url);
            return detailedResponse.data;
          })
        );

        setPokemons(detailedPokemonList);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon:", error);
      });
  }, []);

  const getColorByType = (type) => {
    switch (type) {
      case "grass":
        return "green";
      case "fire":
        return "red";
      case "water":
        return "blue";
      case "poison":
        return "violet";
      case "normal":
        return "yellow";
      case "flying":
        return "lightblue";
      case "bug":
        return "lime";
      default:
        return "gray";
    }
  };


  const pokeee = () => {
    return (
      <Box alignItems="center" p="4">
        {pokemons.map((pokemon, index) => (
          <Pressable
            key={index}
            onPress={() => console.log("I'm Pressed " + index )}
            rounded="8"
            overflow="hidden"
            borderWidth="1"
            borderColor="coolGray.300"
            shadow="4"
            bg="coolGray.100"
            /* style={{backgroundColor:  getColorByType(pokemon.types[0].type.name)}} */
            p="5"
            mb="3"
          >
            <Box>
              <HStack alignItems="center">
              {pokemon.types.map((type, typeIndex) => (
                  <Badge
                    key={typeIndex}
                    colorScheme={getColorByType(type.type.name)}
                    _text={{
                      color: "white",
                    }}
                    variant="solid"
                    rounded="4"
                  >
                    {type.type.name}
                  </Badge>
                ))}
                <Spacer />
                <Text fontSize={10} color="coolGray.800">
                  Height: {pokemon.height} /
                </Text>
                <Text fontSize={10} color="coolGray.800" paddingLeft={"2px"}>
                  Weight: {pokemon.weight}
                </Text>
              </HStack>
              <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                {pokemon.name}
              </Text>
              <Text mt="2" fontSize="sm" color="coolGray.700">
                {pokemon.location_area_encounters}
              </Text>
              <Flex>
                <Text
                  mt="2"
                  fontSize={12}
                  fontWeight="medium"
                  color="darkBlue.600"
                >
                  Read More
                </Text>
              </Flex>
              <Flex alignItems="center" mt="2">
                <Image
                  source={{ uri: pokemon.sprites.front_default }}
                  alt="Pokemon Image"
                  style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 10 }}
                />
              </Flex>
            </Box>
          </Pressable>
        ))}
      </Box>
    );
  };

  return (
    <NativeBaseProvider>
      <ScrollView>{pokeee()}</ScrollView>
    </NativeBaseProvider>
  );
};

export default Pokemon;
