import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.css';

const SimpleSlider = () => {

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div style={{width:"60%"}}>
        <Slider {...settings}>
          <div className='card'>
              <img id='background' src={require('../../img/card_back.png')} alt="dog" width={252} height={266} draggable={false} />
              <img id='polemos' src={require('../../img/polemos.png')} alt="dog" width={75} height={75} draggable={false} />
              <div className="cardInfo">
                  <p>О проекте</p>
                  <span>Подробнее</span>
              </div>
          </div>
          <div className='card'>
              <img id='background' src={require('../../img/card_back.png')} alt="dog" width={252} height={266} draggable={false} />
              <img id='polemos' src={require('../../img/polemos.png')} alt="dog" width={75} height={75} draggable={false} />
              <div className="cardInfo">
                  <p>О проекте</p>
                  <span>Подробнее</span>
              </div>
          </div>
          <div className='card'>
              <img id='background' src={require('../../img/card_back.png')} alt="dog" width={252} height={266} draggable={false} />
              <img id='polemos' src={require('../../img/polemos.png')} alt="dog" width={75} height={75} draggable={false} />
              <div className="cardInfo">
                  <p>О проекте</p>
                  <span>Подробнее</span>
              </div>
          </div>
        </Slider>
      </div>
  );
};

export default SimpleSlider;