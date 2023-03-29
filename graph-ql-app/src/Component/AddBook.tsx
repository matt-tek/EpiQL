import React, { useState } from 'react';
import '../Styles/books.css';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_AUTHOR = gql`
    {
        authors {
            id
            name
        }
    }
`

const ADD_BOOK = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, authorId: $authorId, genre: $genre) {
            name
            id
        }
    }
`

function AddBooks() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const { loading, error, data } = useQuery(GET_AUTHOR);
    const [addBook, { loading: mutationLoading, error: mutationError } ] = useMutation(ADD_BOOK);
    console.log("DATA = ", authorId)
    console.log(genre)
    console.log(title)

    const handleSubmit = () => {
        addBook(
            { 
                variables: { name: title, authorId: authorId, genre: genre }
            })
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (
        <form className='add-book'>
            <div style={{padding: 20 }}>
                <label style={{ margin: 10, fontWeight: 'bold'}}>Book Title:</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div style={{padding: 20 }}>
                <label style={{ margin: 10, fontWeight: 'bold'}}>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div style={{padding: 20 }}>
                <label style={{ margin: 10, fontWeight: 'bold'}}>Author:</label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select Author</option>
                    {data?.authors.map((author: any) => (
                        <option key={author.id}
                            value={author.id}>{author.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleSubmit}>Add Book</button>
        </form>
    )
}

export default AddBooks;