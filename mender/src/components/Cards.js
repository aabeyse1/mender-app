import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import {Container, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ButtonGroup } from 'react-bootstrap'
// import './Cards.css'


function Cards (props) {
  const [db, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState()
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db.length]
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get/moreUsers/'+props.email+'/'); // Replace with your actual API endpoint
        setData(response.data)
        console.log(typeof(response.data))
        setCurrentIndex(response.data.length-1)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setCurrentIndex(db.length-1)
  }, []);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0;


  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()

  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
  
      if (dir === 'right') {
        const currentCardData = db[currentIndex];
        console.log(db[currentIndex]);
  
        try {
          await axios.get('http://127.0.0.1:8000/like/'+props.email+"/"+currentCardData.email+'/');
        } catch (error) {
          console.error('Error making swipe right GET request:', error);
        }
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        swipe('left');
      } else if (e.key === 'ArrowRight') {
        swipe('right');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [swipe]);
  

  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div className='justify-content-center align-items-center' style={{width: "100vw", height: "80vh"}}>
      <div className='d-flex align-items-center justify-content-center position-relative' style={{width: "100%", height: "80%"}}>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe rounded bg-primary position-absolute w-50 h-70 px-5 py-5'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
            style={{ background: 'linear-gradient(to bottom, #2193b0, #6dd5ed)'}} // Blue gradient background
          >
            <h1 className='text-light'>{character.name}</h1>
            <h2 className='text-light'>{character.area}</h2>
            <ul>
              <h3 className='text-light'>College: {character.college}</h3>
              <h3 className='text-light'>Hometown: {character.hometown}</h3>
              <h3 className='text-light'>Industry: {character.industry}</h3>
              <h3 className='text-light'>Interests:</h3>
              <ButtonGroup>
                {character.interests.map((interest, index) => (
                  <Button
                    key={index}
                    className="mx-1 shadow"
                    variant="primary"
                    style={{background: 'linear-gradient(to right, #4e8cff, #ff5e62)'}}
                  >
                    {interest}
                  </Button>
                ))}
              </ButtonGroup>
            </ul>
          </TinderCard>
        ))}
      </div>
      <div className='d-flex justify-content-center mt-1'>
        <Button className ="mx-1 shadow" variant={canSwipe ? "danger" : "outline-danger"} onClick={() => swipe('left')}>
            <h2>
                Swipe left!
            </h2>
        </Button>
        <Button className ="mx-1 shadow" variant={canGoBack ? "warning" : "outline-warning"} onClick={() => goBack()}>
            <h2>
                Undo swipe!
            </h2>
        </Button>
        <Button  className ="mx-1 shadow" variant={canSwipe ? "success" : "outline-success"} onClick={() => swipe('right')}>
            <h2>
                Swipe right!
            </h2>
        </Button>
      </div>
    </div>
  );  
}

export default Cards;