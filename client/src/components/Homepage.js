import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Fade } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import './styles/style.css'; 

import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg'; 
import img4 from '../assets/img4.jpeg';
import img5 from '../assets/img5.jpeg';

const galleryImages = [
  img1,
  img2, img3,img4, img5
];

export default function Homepage() {
  const [current, setCurrent] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % galleryImages.length);
        setFadeIn(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      setFadeIn(true);
    }, 300);
  };

  const handleNext = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % galleryImages.length);
      setFadeIn(true);
    }, 300);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', mt: 2 }}>
      <Fade in={fadeIn} timeout={500}>
        <Box
          component="img"
          src={galleryImages[current]}
          alt={`Gallery Image ${current + 1}`}
          sx={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </Fade>

      <IconButton onClick={handlePrev} sx={{ position: 'absolute', top: '50%', left: 10, color: 'white', zIndex: 2 }}>
        <ArrowBackIos />
      </IconButton>

      <IconButton onClick={handleNext} sx={{ position: 'absolute', top: '50%', right: 10, color: 'white', zIndex: 2 }}>
        <ArrowForwardIos />
      </IconButton>

      <Box sx={{ textAlign: 'center', mt: 1 }}>
        {galleryImages.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              display: 'inline-block',
              width: 10,
              height: 10,
              mx: 0.5,
              borderRadius: '50%',
              backgroundColor: current === index ? '#1976d2' : '#ccc',
              cursor: 'pointer'
            }}
          />
        ))}
      </Box>

    
    </Box>
  );
}