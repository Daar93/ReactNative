import { StyleSheet, Text } from 'react-native';

export default function Quote({ author, text }) {
    return (
        <>
            <Text style={[styles.text, styles.red]}>{text}</Text>
            <Text style={styles.author}>&mdash; {author}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    text: { 
        fontSize: 25, 
        fontStyle: 'italic',
    },
    red: {
        color: 'red'
    },
    author: { 
        fontSize: 24
    }
});