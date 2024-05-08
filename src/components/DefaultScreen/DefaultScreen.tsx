import {ReactNode} from 'react';
import {
  BackgroundBottom,
  BottomContainer,
  Screen,
  TopContainer,
} from './DefaultScreen.styles';

const background = require('../../assets/background.png');

export function Background({children}: {children: ReactNode}) {
  return <Screen source={background}>{children}</Screen>;
}

export function TopView({
  children,
  flexSize,
}: {
  children: ReactNode;
  flexSize: number;
}) {
  return <TopContainer flexSize={flexSize}>{children}</TopContainer>;
}

export function BottomView({
  children,
  flexSize,
}: {
  children: ReactNode;
  flexSize: number;
}) {
  return (
    <BottomContainer flexSize={flexSize}>
      <BackgroundBottom>{children}</BackgroundBottom>
    </BottomContainer>
  );
}

export function DefaultScreen({children}: {children: ReactNode}) {
  return (
    <Background>
      <BottomContainer flexSize={1}>
        <BackgroundBottom>{children}</BackgroundBottom>
      </BottomContainer>
    </Background>
  );
}
