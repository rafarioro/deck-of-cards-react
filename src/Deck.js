import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'
const Deck = () => {

    const [deck, setDeck] = useState(null)
    const [url, setUrl] = useState('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    //const [disable, setDisable] = useState(false)
    const [remaining, setRemaining] = useState(null)
    const [drawnCards, setDrawnCards] = useState([])
    
    const drawCard = () => {
        async function Draw(){
            const res = await axios.get( `http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1 `);
            let newCard = res.data.cards[0] //now its an obkect
            addCard(newCard);
            setRemaining( res.data.remaining )
            console.log(`draw card function ${newCard}`)
            console.log(`Remaining Cards in deck: ${remaining}`)
        }
        Draw();
    }
    
    const addCard = (card) => {
            setDrawnCards(prevState => (
                [...prevState, card]
            ))
        console.log(`addCard function ran: drawnCards: ${drawnCards}`)
    }

    const drawDeck = () => {
        setUrl('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        console.log(`deck dfrawn,` )
    }

    const clearDeck = () => {
        console.log('deck cleared')
        setUrl('')
        setDeck(null)
        setDrawnCards([])
        setRemaining(null)

    }

    useEffect(()=>{
       async function loadDeck(){
           const res = await axios.get(url);
           setDeck(res.data)
           console.log(deck)
       }
       loadDeck();
       console.log('use Effect ran')
       }, [url]) //here useEffect is watching for URL



    return(
        <div>
            <button onClick={drawDeck}>New Deck</button>
            <button onClick={clearDeck}>Clear Deck</button><br/>
            <button disabled={remaining===0? true:false} onClick={drawCard}>Draw Card</button>
            <p> remaining: {remaining}</p>
            
            <div>
                {drawnCards.map( (ele) => <Card code={ele.code} img={ele.image}/> ) }
            </div>
        </div>
    )
}

export default Deck;