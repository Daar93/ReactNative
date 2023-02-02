// 1) import-Anweisungen
import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BigButton from "./components/BigButton";
import IconButton from "./components/IconButton";
import Quote from "./components/Quotes";
import NewQuote from "./components/NewQuote";

// 2) unsere UI-Komponente deklarieren
export default function App() {
  const [index, setIndex] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [showNewDialog, setShowNewDialog] = useState(false);

  // Zitate beim Start der App laden
  useEffect(() => {
    loadQuotes(); 
  }, []);  // --> einmalige Ausfuehrung

  function addQuoteToList (content, name) {
    setShowNewDialog(false);
    const newQuotes = [
      ...quotes, 
      { text: content, author: name }
    ];
    setQuotes(newQuotes);
    setIndex(newQuotes.length - 1);
    saveQuotes(newQuotes);
  }
  
  function removeQuoteFromList() {
    const newQuotes = [...quotes];
    newQuotes.splice(index, 1);
    setQuotes(newQuotes);
    setIndex(0);
    saveQuotes(newQuotes);
  }

  function deleteQuote() {
    Alert.alert(
      "Zitat loeschen",
      "Soll das Zitat wirklich geloescht werden?",
      [{text: 'Abbrechen', style:"cancel"}, 
        {
          text: 'Bestaetigen', 
          style: 'destructive', 
          onPress: removeQuoteFromList
        }
      ]
    )
  }

  function saveQuotes(newQuotes) {
    AsyncStorage.setItem("QUOTES", JSON.stringify(newQuotes))
  }

  async function loadQuotes() {
    let quotesFromDB = await AsyncStorage.getItem("QUOTES");
    if(quotesFromDB !== null) {
      console.log("Anzahl der Zitate: " + quotesFromDB.length);
      quotesFromDB = JSON.parse(quotesFromDB);
      console.log("nach JSON.parse " + quotesFromDB.length);
      setQuotes(quotesFromDB);
    }
  }

  let prevIndex = index - 1;
  if(prevIndex < 0) {
    prevIndex = quotes.length - 1;
  }

  let content = <Text style={styles.noQuotes}>Keine Zitate</Text>;
  if(quotes.length > 0) {
    const quote = quotes[index];
    content = <Quote text={quote.text} author={quote.author}/>;
  } 

  return (
    <View style={styles.container}>
      <IconButton 
        onPress={() => setShowNewDialog(true)}
        icon="add-circle" 
        style={styles.new}
      />
      <IconButton 
        onPress={deleteQuote}
        icon="delete" 
        style={styles.delete}
      />
      <NewQuote 
        visible={showNewDialog}
        onCancel={() => setShowNewDialog(false)} 
        onSave={addQuoteToList}
      />
      {content}
      <BigButton 
        style={styles.next}
        title="Naechstes Zitat" 
        onPress={() => setIndex((index + 1) % quotes.length)}
      />
      <BigButton 
        style={styles.previous}
        title="Vorheriges Zitat" 
        onPress={() => setIndex(prevIndex)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E0C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  next: {
    position: 'absolute', 
    bottom: 60,
  },
  previous: {
    position: 'absolute', 
    bottom: 15,
  },
  new: {
    position: "absolute",
    top: 60,
    right: 30,
  },
  delete: {
    position: "absolute",
    top: 60,
    left: 30,
  },
  noQuotes: {
    fontSize: 36,
    fontWeight: '300'
  }
});
