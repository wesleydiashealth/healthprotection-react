import React from 'react';
import { IconBaseProps } from 'react-icons';

import Container, {
  LockedIcon,
  Title,
  TooltipIcon,
  Tooltip,
  BlockedMessage,
  Subtitle,
} from './styles';

interface StepIntroData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<IconBaseProps>;
  color: string;
  isActive?: boolean;
}

const StepIntro: React.FC<StepIntroData> = ({
  id,
  title,
  subtitle,
  description,
  icon: Icon,
  color,
  isActive,
}) => {
  const currentColor = isActive ? color : '#565656';

  return (
    <Container {...isActive}>
      <Icon color={currentColor} size={52} />
      <Title>
        {!isActive && <LockedIcon size={20} />}
        {title}
        <TooltipIcon
          size={20}
          color={currentColor}
          data-tip={description}
          data-for={id}
        />
        <Tooltip
          id={id}
          place="bottom"
          type="light"
          effect="solid"
          offset={{ top: 10, left: 10 }}
          html
          backgroundColor="#fff"
        />
      </Title>
      {!isActive && (
        <BlockedMessage>
          Step Blocked. Complete previous step to proceed.
        </BlockedMessage>
      )}
      {subtitle && (
        <Subtitle color={currentColor}>
          <span>{subtitle.split(' ').shift()}</span>
          {subtitle.substring(subtitle.indexOf(' '))}
        </Subtitle>
      )}
    </Container>
  );
};

StepIntro.defaultProps = {
  isActive: false,
};

export default StepIntro;
