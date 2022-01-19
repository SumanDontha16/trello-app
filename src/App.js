import React, { useState, useEffect } from 'react'
import isEmpty from "lodash/isEmpty";
import axios from "axios";
import Board from "react-trello";

function App() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    async function fetchData() {
      await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      ).then(res => {
        const cards = {
          lanes: [
            {
              id: "applicants",
              title: "Applicants",
              style: { width: 280 },
              cards: res.data.map(user => ({
                id: user.id.toString(),
                title: user.name,
                description: user.email
              }))
            },
            {
              id: "interviewed",
              title: "Interviewed",
              style: { width: 280 },
              cards: []
            }
          ]
        };
        setCards(cards);
      })
        .catch(error => {
          console.error(error);
        });
    }
    fetchData()
  }, []);

  useEffect(() => {
    const cards = localStorage.getItem("my-card-list")
    if (cards) {
      setCards(JSON.parse(cards))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("my-card-list", JSON.stringify(cards))
  })

  return (
    <div className="container-fluid">
      <h1 className='mb-3 mt-3' data-testid="title"> My Trello App </h1>
      {!isEmpty(cards) ? <Board data={cards} draggable editable canAddLanes addLaneTitle addCardTitle /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
