// 1) import-Anweisungen
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';
import Quote from "./components/Quotes";

const data = [
  {
    text: "„Fordere viel von dir selbst und erwarte wenig von den anderen. So wird dir Ärger erspart bleiben.\“", 
    author: "Konfuzius"
  },
  {text: "Wer einmal sich selbst gefunden, kann nichts auf dieser Welt mehr verlieren.", 
  author:"Stefan Zweig"},
  {text: "Wenn die Menschen nur über das sprächen, was sie begreifen, dann würde es sehr still auf der Welt sein.", 
  author:"Albert Einstein"}
];

// 2) unsere UI-Komponente deklarieren
export default function App() {
  // useState-Hook erweitert Komponente/Funktion mit Zustand
  // Vorgehen:
  // - useState-Hook importieren
  // - useState mit initialem Zustandswert aufrufen
  // - Rueckgabe destrukturieren: state-Objekt, Aenderungsfunkt.
  // - State-Aenderung mit der Aenderungsfunktion durchfuehren
  // --> bei state-Aenderung wird UI automatisch 
  // --> deklarative, reaktive Programmierung in React (Native)
  const [index, setIndex] = useState(0);

  // Destrukturierung:
  // const list = [8, 4, 4, 7, 1];
  // const [first, second, third] = list;
  // entspricht:
  // const first = list[0];
  // const second = list[1];
  // const third = list[2];

  // const person = {name: "Kim", age: 32};
  // const {age, name} = person;
  // entpricht:
  // const name = person.name;
  // const name = person.age;

  const quote = data[index];

  let prevIndex = index - 1;
  if(prevIndex < 0) {
    prevIndex = data.length - 1;
  }

  return (
    <View style={styles.container}>
      <Quote text={quote.text} author={quote.author}/>
      <Button title="Naechstes Zitat" 
        onPress={() => {
          setIndex((index + 1) % data.length);
          }
        }
      />
      <Button title="Vorheriges Zitat" 
        onPress={() => {
          setIndex(prevIndex);
          }
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
