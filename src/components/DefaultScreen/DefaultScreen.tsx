import {
  BackgroundBottom,
  BottomContainer,
  Screen,
  TopContainer,
} from './DefaultScreen.styles';
import {ReactNode} from 'react';

const background = require('../../assets/background.png');

export function Background({children}: {children: ReactNode}) {
  return <Screen source={background}>{children}</Screen>;
}

export function TopView({children}: {children: ReactNode}) {
  return <TopContainer>{children}</TopContainer>;
}
// TODO - Make the flex size be passed as a prop
export function BottomView({children}: {children: ReactNode}) {
  return (
    <BottomContainer>
      <BackgroundBottom>{children}</BackgroundBottom>
    </BottomContainer>
  );
}
