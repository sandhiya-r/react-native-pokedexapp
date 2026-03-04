import { useEffect, useState} from "react";
import { Text, TextInput, View, TouchableWithoutFeedback, Pressable, Image, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';

interface Pokemon {
    name: string,
    image: string
    type: string
}

interface PokemonType {
  name: string,
  url: string
}

const colorsByType = {
  normal: "#E6E2D3",      // soft beige
  fire: "#FFADAD",        // pastel red
  water: "#A0C4FF",       // pastel blue
  electric: "#FFF3B0",    // soft pastel yellow
  grass: "#b5e0b9",       // pastel green
  ice: "#CDEDFD",         // icy pastel blue
  fighting: "#F4A261",    // muted warm orange
  poison: "#D0A6FF",      // pastel purple
  ground: "#E9C46A",      // sandy pastel
  flying: "#CAF0F8",      // sky pastel
  psychic: "#FFAFCC",     // pastel pink
  bug: "#D9ED92",         // soft lime
  rock: "#D6CCC2",        // light stone
  ghost: "#CDB4DB",       // soft lavender
  dragon: "#BDB2FF",      // dreamy violet
  dark: "#6D6875",        // muted dark pastel
  steel: "#D8E2DC",       // pale metallic grey
  fairy: "#FFC8DD"       // pastel fairy pink
}

//Pokemon Summary Card Component
const PokemonCard = (pokemon: Pokemon) => {
  return (
      <Link href="/detailPage" asChild>
        <TouchableOpacity style={{flex:1}}>
          <View  key = {pokemon.name} style={[styles.card, {
      // @ts-ignore
      backgroundColor: colorsByType[pokemon.type] 
      }]}>
            <View style = {styles.info}>
              <Text style = {styles.name}>{pokemon.name}</Text>
              <View style = {styles.bubble}><Text style = {styles.type}>{pokemon.type}</Text></View>
            </View>
            <Image source = {{uri: pokemon.image}} style = {styles.image}></Image>
          </View>
           

        </TouchableOpacity>
          
      </Link>
          
     
  );
}


export default function Index() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  const [search, setSearch] = useState(''); // state for search bar input
  useEffect(() => {
        fetchPokemon();
    }, []);

  // Load font from google fonts
    const [loaded, error] = useFonts({
    'tiny5-regular': require('../assets/fonts/Tiny5-Regular.ttf'),
  });

    useEffect(() => {
    if (loaded || error) {
      console.log("Could not find font")
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  
  const handleSearch = (text: string) => {
    setSearch(text);
    const textToSearch = text.toLowerCase().replaceAll(' ', '');
    const filtered = pokemons.filter((item: Pokemon) =>
      item.name.toLowerCase().includes(textToSearch)
    );
    setFilteredPokemons(filtered);
  };



  async function fetchPokemon(){
    try{
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await res.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon: any)=> {
              const result = await fetch(pokemon.url);
              const details = await result.json();
              return {
                name: pokemon.name,
                image: details.sprites.front_default,
                type: details.types[0].type.name
              }
        }))

        setPokemons(detailedPokemons);
    } catch(error){
      console.log("Error fetching from PokeAPI: ", error);
    }
  }

   return(
    <View>
      <Text style = {styles.title}>Pokedex</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a Pokemon"
        placeholderTextColor={'grey'}
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        style = {styles.mainContainer}
        data = {filteredPokemons}
        renderItem = {({item})=>
        <PokemonCard {...item}></PokemonCard>}
        numColumns={2}
      />
    </View>
     
   );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  card: {
    flexDirection: 'column',
    flex:1,
    margin: 5,
    borderRadius: 20
  },
  info: {
    padding: 10,
    flex: 1,
  },
  image: {
      width: 120, 
      height: 120, 
  },
  row:{
    flexDirection: 'row',
    flex: 1
  },
  title:{
    fontFamily: 'tiny5',
    fontSize: 50,
    margin: 20,
  },
  name: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'tiny5-regular',
    fontSize: 20

  },
  type: {
    fontFamily: 'tiny5-regular',
    color: 'black',
  },
  bubble: {
    backgroundColor: 'white',
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderRadius: 5
  }

})