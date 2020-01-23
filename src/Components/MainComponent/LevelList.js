import React, {useState} from 'react';
import PropTypes from 'prop-types';
import JMCTitle from "../UIElements/JMCTitle";
import LevelItem from "./LevelItem";

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import JMCCard from "../UIElements/JMCCard";
import {Link} from "react-router-dom";

const LevelList = props => {

  const isPlayAble = level => level.id === 0;
  console.log('props.levelList = ',props.levelList);

  const anotherSlide = (data, isPlayAble) => {
    return (
        <CarouselProvider
            naturalSlideWidth={500}
            naturalSlideHeight={225}
            totalSlides={3}
        >
          <Slider>
            {/*<Slide index={0}><img src={GAME_1} alt={" "}/></Slide>
            <Slide index={1}><img src={GAME_2} alt={" "}/></Slide>
            <Slide index={2}><img src={GAME_3} alt={" "}/></Slide>*/}
          </Slider>

        </CarouselProvider>
    )
  }

  return (
      <div id="game" className="casino fullwidth">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <JMCTitle
                  displayPaddingBottom={true}
                  paddingButtonTitle={"pb-2"}
                  title="Select a level to play"
                  underlined={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-11 col-sm-10">

              <CarouselProvider
                  naturalSlideWidth={500}
                  naturalSlideHeight={500}
                  totalSlides={props.levelList.length}
                  visibleSlides={3}
              >
                <Slider>
                  {
                    props.levelList.map((level, index) => {
                      return (
                          <Slide key={index} index={index}>
                            <Link to={"/"}>
                              <LevelItem
                                  name={level.name}
                                  levelImageUrl={level.levelImageUrl}
                                  scored={level.scored}
                                  id={level.id}
                                  status={level.status}
                                  playAble={isPlayAble(level)}
                                  clicked={level.clicked}
                              />
                            </Link>
                          </Slide>
                      )
                    })
                  }
                  {/*<Slide tag="a" index={0}>{levelTmp(props.levelList, isPlayAble)[0]}</Slide>
                  <Slide tag="a" index={1}>{levelTmp(props.levelList, isPlayAble)[1]}</Slide>
                  <Slide tag="a" index={2}>{levelTmp(props.levelList, isPlayAble)[2]}</Slide>
                  <Slide tag="a" index={3}>{levelTmp(props.levelList, isPlayAble)[3]}</Slide>*/}
                </Slider>
                <ButtonBack>
                  <a className="jmc-arrow jmc-arrow-prev right-100" href="javascript: void(0)">
                    <i className="fa fa-long-arrow-left"></i>
                  </a>
                </ButtonBack>
                <ButtonNext>
                  <a className="jmc-arrow jmc-arrow-next left-100" href="javascript: void(0)">
                    <i className="fa fa-long-arrow-right"></i>
                  </a>
                </ButtonNext>
              </CarouselProvider>
              <JMCCard
                  imageUrl={"https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png"}
                  marginBottom={' '}
                  addClass={"opacity-0"}
              />
            </div>

            {/*<Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
              <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>*/}
            {/*{levelTmp(props.levelList, isPlayAble).slice(0, 3)}*/}
            {/*<JMCCard
                imageUrl={"https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png"}
                marginBottom={' '}
            />*/}
          </div>
        </div>
      </div>
  );
};

LevelList.propTypes = {
  levelList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    difficulty: PropTypes.node.isRequired,
    levelImageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    clicked: PropTypes.number.isRequired,
    scored: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  })),
};

export default LevelList;

/*
const levelTmp = (levelList, isPlayAble) => levelList.map(level => {
  return <LevelItem
      name={level.name}
      levelImageUrl={level.levelImageUrl}
      scored={level.scored}
      id={level.id}
      status={level.status}
      playAble={isPlayAble(level)}
      clicked={level.clicked}
  />
});*/
