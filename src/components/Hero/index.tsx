/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { GiMicroscope } from 'react-icons/gi';
import { ImPlay } from 'react-icons/im';
import Popup from 'reactjs-popup';

import { useApp } from 'contexts/app';

// import heroImg from 'assets/header_hero.svg';
import Container, {
  HeroIntro,
  HeroVideo,
  HeroMainTitle,
  HeroSubTitle,
  HeroDescription,
  HeroButton,
  // HeroImage,
  HeroList,
  HeroListItem,
  HeroListItemLink,
  HeroListItemText,
  HeroListItemPopupContent,
} from './styles';

const Hero: React.FC = () => {
  const context = useApp();
  const { labels } = context;

  const steps = [
    {
      id: 'video',
      icon: <ImPlay size={32} color="#DB71AF" />,
      link: 'https://www.youtube.com/embed/Hv_T8qPqRnA',
      modal: true,
      title: labels.hero_video,
    },
    {
      id: 'science',
      icon: <GiMicroscope size={32} color="#DB71AF" />,
      link: 'https://www.healthprotection.com/the-science-behind-us/',
      modal: false,
      title: labels.hero_science,
    },
  ];

  return (
    <Container id="hero">
      <HeroIntro>
        <HeroMainTitle>{labels.hero_title}</HeroMainTitle>
        <HeroSubTitle>{labels.hero_subtitle}</HeroSubTitle>
        <HeroDescription>{labels.hero_description}</HeroDescription>
        <HeroButton className="button hero__button" href="#step_1">
          {labels.hero_button}
        </HeroButton>
      </HeroIntro>
      <HeroVideo width="720" autoPlay loop muted>
        <source src="/videos/hero_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </HeroVideo>
      {/* <HeroImage src={heroImg} alt="" /> */}
      <HeroList>
        {steps.map(step => (
          <React.Fragment key={step.id}>
            {step.modal ? (
              <Popup
                trigger={
                  <HeroListItem>
                    {step.icon}
                    <HeroListItemText>{step.title}</HeroListItemText>
                  </HeroListItem>
                }
                modal
                nested
              >
                <HeroListItemPopupContent>
                  <iframe
                    width="560"
                    height="315"
                    src={step.link}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </HeroListItemPopupContent>
              </Popup>
            ) : (
              <HeroListItem>
                {step.icon}
                <HeroListItemLink href={step.link}>
                  {step.title}
                </HeroListItemLink>
              </HeroListItem>
            )}
          </React.Fragment>
        ))}
      </HeroList>
    </Container>
  );
};

export default Hero;
