/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { GiMicroscope } from 'react-icons/gi';
import { ImPlay } from 'react-icons/im';
// import Popup from 'reactjs-popup';

import { useApp } from 'contexts/app';

// import heroImg from 'assets/header_hero.svg';
import Container, {
  HeroIntro,
  HeroButton,
  HeroList,
  HeroListItem,
  HeroListItemLink,
  HeroListItemText,
  // HeroListItemPopupContent,
} from './styles';

const Hero: React.FC = () => {
  const context = useApp();
  const { labels } = context;

  const steps = [
    {
      id: 'video',
      icon: <ImPlay size={32} color="#DB71AF" />,
      link: '#',
      modal: true,
      title: labels.hero_video,
    },
    {
      id: 'science',
      icon: <GiMicroscope size={32} color="#DB71AF" />,
      link: '#',
      modal: false,
      title: labels.hero_science,
    },
  ];

  return (
    <Container id="hero">
      <HeroIntro>
        <HeroButton className="button hero__button" href="#step_1">
          {labels.hero_button}
        </HeroButton>
      </HeroIntro>
      {/* <HeroList>
        {steps.map(step => (
          <React.Fragment key={step.id}>
            {step.modal ? (
              <HeroListItem>
                {step.icon}
                <HeroListItemText>{step.title}</HeroListItemText>
              </HeroListItem>
            ) : (
              // <Popup
              //   trigger={
              //     <HeroListItem>
              //       {step.icon}
              //       <HeroListItemText>{step.title}</HeroListItemText>
              //     </HeroListItem>
              //   }
              //   modal
              //   nested
              // >
              //   <HeroListItemPopupContent>
              //     <iframe
              //       width="560"
              //       height="315"
              //       src={step.link}
              //       title="YouTube video player"
              //       frameBorder="0"
              //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              //       allowFullScreen
              //     />
              //   </HeroListItemPopupContent>
              // </Popup>
              <HeroListItem>
                {step.icon}
                <HeroListItemLink href={step.link}>
                  {step.title}
                </HeroListItemLink>
              </HeroListItem>
            )}
          </React.Fragment>
        ))}
      </HeroList> */}
    </Container>
  );
};

export default Hero;
