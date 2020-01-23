import React, {useState} from 'react';
import PropTypes from 'prop-types';
import JMCTitle from "../UIElements/JMCTitle";
import StageItem from "./StageItem";

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import JMCCard from "../UIElements/JMCCard";
import {Link} from "react-router-dom";

const StageList = props => {

  const isPlayAble = stage => stage.id === 0;
  console.log('props.stageList = ',props.stageList);

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
                  title="Select a stage to play"
                  underlined={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-11 col-sm-10">

              <CarouselProvider
                  naturalSlideWidth={500}
                  naturalSlideHeight={500}
                  totalSlides={props.stageList.length}
                  visibleSlides={3}
              >
                <Slider>
                  {
                    props.stageList.map((stage, index) => {
                      return (
                          <Slide key={index} index={index}>
                            <Link to={"/"}>
                              <StageItem
                                  name={stage.name}
                                  stageImageUrl={stage.stageImageUrl}
                                  scored={stage.scored}
                                  id={stage.id}
                                  status={stage.status}
                                  playAble={isPlayAble(stage)}
                                  clicked={stage.clicked}
                              />
                            </Link>
                          </Slide>
                      )
                    })
                  }
                  {/*<Slide tag="a" index={0}>{stageTmp(props.stageList, isPlayAble)[0]}</Slide>
                  <Slide tag="a" index={1}>{stageTmp(props.stageList, isPlayAble)[1]}</Slide>
                  <Slide tag="a" index={2}>{stageTmp(props.stageList, isPlayAble)[2]}</Slide>
                  <Slide tag="a" index={3}>{stageTmp(props.stageList, isPlayAble)[3]}</Slide>*/}
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
            {/*{stageTmp(props.stageList, isPlayAble).slice(0, 3)}*/}
            {/*<JMCCard
                imageUrl={"https://i.postimg.cc/dVsJ1yCC/one-piece-couv.png"}
                marginBottom={' '}
            />*/}
          </div>
        </div>
      </div>
  );
};

StageList.propTypes = {
  stageList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    difficulty: PropTypes.node.isRequired,
    stageImageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    clicked: PropTypes.number.isRequired,
    scored: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  })),
};

export default StageList;

/*
const stageTmp = (stageList, isPlayAble) => stageList.map(stage => {
  return <StageItem
      name={stage.name}
      stageImageUrl={stage.stageImageUrl}
      scored={stage.scored}
      id={stage.id}
      status={stage.status}
      playAble={isPlayAble(stage)}
      clicked={stage.clicked}
  />
});*/
