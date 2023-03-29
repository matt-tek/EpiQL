import React from 'react';
import '../Styles/books.css';
import { gql, useQuery } from '@apollo/client';

interface BookProps {
    id: string;
    name: string;
    genre: string;
    authorID: string;
}

type QueryType = {
    books: BookProps[];
}

const GET_QUERY = gql`
    {
        books {
            id
            name
            genre
        }
    }
`

function Books() {
    const { loading, error, data } = useQuery<QueryType>(GET_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (
        <div>
            {data?.books.map((book) => (
                <ul key={book.id} className='book-item'>
                    <h2>{book.name}</h2>
                    <p>genre: {book.genre}</p>
                </ul>
            ))}
        </div>
    );
}

export default Books;