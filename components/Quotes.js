import { Text } from 'react-native';

export default function Quote({ author, text }) {
    return (
        <>
            <Text style={ { fontSize: 25, fontStyle: 'italic' } }>{text}</Text>
            <Text style={ { fontSize: 24 } }>&mdash; {author}</Text>
        </>
    );
};

