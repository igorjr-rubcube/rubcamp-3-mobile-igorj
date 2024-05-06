import styled from "styled-components/native";
import Colors from "../../styles/colors";

export const Screen = styled.ImageBackground`
  flex: 1;
`;

export const TopContainer = styled.View`
  flex: 1;
  padding: 20px 25px;
  justify-content: space-between;
  background-color: transparent;
`;

export const BottomContainer = styled.View`
  background-color: ${Colors.background.secondary};
  flex: 5;
`;

export const BackgroundBottom = styled.View`
  background-color: ${Colors.background.primary};
  height: 100%;
  width: 100%;
  padding: 20px 25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;