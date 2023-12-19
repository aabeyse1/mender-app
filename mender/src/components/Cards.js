import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Cards() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(data.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(
    () =>
      Array(data.length)
        .fill(0)
        .map((i) => React.createRef()),
    [data]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < data.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < data.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get/moreUsers/yharris@example.org'); // Replace with your actual API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='justify-content-center align-items-center' style={{width: "100vw", height: "100vh"}}>
      <div className='d-flex align-items-center justify-content-center position-relative' style={{width: "100%", height: "80%"}}>
        {data.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe rounded bg-primary position-absolute w-50 h-50 px-5 py-5'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
            style={{ background: 'linear-gradient(to bottom, #2193b0, #6dd5ed)'}} // Blue gradient background
          >
            <h1 className='text-light'>{character.name}</h1>
            <h2 className='text-light'>{character.location}</h2>
            <ul>
              <h3 className='text-light'>College: {character.college}</h3>
              <h3 className='text-light'>Hometown: {character.hometown}</h3>
              <h3 className='text-light'>Interests:</h3>
              {character.interests.map((interest, interestIndex) => (
                <Button key={interestIndex} variant='outline-light' className='mr-2 mb-2'>
                  {interest}
                </Button>
              ))}
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