import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import {Container, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Cards.css'

const db = [
  {
    name: 'Richard Hendricks',
    location: "New York",
    hometown: "San Francisco",
    college: "Harvard",
    interests: ["Coffee", "Cars"],
  },
  {
    name: 'Erlich Bachman',
    location: "New York",
    hometown: "San Francisco",
    college: "Harvard",
    interests: ["Coffee", "Cars"],
  },
  {
    name: 'Monica Hall',
    location: "New York",
    hometown: "San Francisco",
    college: "Harvard",
    interests: ["Coffee", "Cars"],
  },
  {
    name: 'Jared Dunn',
    location: "New York",
    hometown: "San Francisco",
    college: "Harvard",
    interests: ["Coffee", "Cars"],
  },
  {
    name: 'Dinesh Chugtai',
    location: "New York",
    hometown: "San Francisco",
    college: "Harvard",
    interests: ["Coffee", "Cars"],
  }
]

function Cards () {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div className='justify-content-center align-items-center' style={{width: "100vw", height: "100vh"}}>
      <div className='d-flex align-items-center justify-content-center position-relative' style={{width: "100%", height: "80%"}}>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe rounded bg-primary position-absolute w-50 h-50 px-5 py-5'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <h1 className='text-light'>{character.name}</h1>
            <h2 className='text-light'>{character.location}</h2>
            <ul>
              <h3 className='text-light'>College: {character.college}</h3>
              <h3 className='text-light'>Hometown: {character.hometown}</h3>
              <h3 className='text-light'>Interests: {character.interests}</h3>
            </ul>
          </TinderCard>
        ))}
      </div>
      <div className='d-flex justify-content-center mt-1'>
        <Button className ="mx-1" variant={canSwipe ? "success" : "outline-success"} onClick={() => swipe('left')}>
            <h2>
                Swipe left!
            </h2>
        </Button>
        <Button className ="mx-1" variant={canGoBack ? "warning" : "outline-warning"} onClick={() => goBack()}>
            <h2>
                Undo swipe!
            </h2>
        </Button>
        <Button className ="mx-1" variant={canSwipe ? "danger" : "outline-danger"} onClick={() => swipe('right')}>
            <h2>
                Swipe right!
            </h2>
        </Button>
      </div>
    </div>
  );  
}

export default Cards;