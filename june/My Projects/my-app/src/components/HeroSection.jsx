import React from 'react';
import Image1 from '../assets/Image1.png';
import Image2 from '../assets/Image2.png';
import Image3 from '../assets/Image3.png';
import Image4 from '../assets/Image4.png';
import Image5 from '../assets/Image5.png';
import './HeroSection.css';

const data = [
  {
    id: 1,
    title: 'Title 1',
    description: 'Description',
    image: Image1,
    color: 'rgb(108, 108, 229)',
  },
  {
    id: 2,
    title: 'Title 2',
    description: 'Description',
    image: Image2,
    color: 'rgb(249, 215, 76)',
  },
  {
    id: 3,
    title: 'Title 3',
    description: 'Description',
    image: Image3,
    color: 'rgb(249, 123, 139)',
  },
  {
    id: 4,
    title: 'Title 4',
    description: 'Description',
    image: Image4,
    color: 'rgb(233, 148, 69)',
  },
  {
    id: 5,
    title: 'Title 5',
    description: 'Description',
    image: Image5,
    color: 'rgb(108, 229, 120)',
  },
];

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="carousel-container">
        <div className="carousel">
          {data.map(({ id, title, description, image, color }) => (
            <div className="card" key={id} style={{ backgroundColor: color }}>
              <h1 className="card-title">{title}</h1>
              <img src={image} alt={`Image ${id}`} className="card-image" />
              <p className="card-description">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
