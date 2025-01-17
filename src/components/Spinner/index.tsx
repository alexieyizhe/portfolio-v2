import React from "react";
import styled from "styled-components";

export interface SpinnerProps {
  color?: string;
}

const Container = styled.div`
  position: relative;
  width: 36px;
  height: 25px;
  display: flex;
  justify-content: center;
`;

const LoadingRing = styled.div`
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  display: block;
  position: absolute;
  width: 23px;
  height: 23px;

  border: 4px solid
    ${({ theme, color = "" }) => theme.color[color] || color || "black"};
  border-radius: 50%;
  border-color: ${({ theme, color = "" }) =>
      theme.color[color] || color || "black"}
    transparent transparent transparent;

  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const Spinner: React.FC<SpinnerProps> = ({ color }) => (
  <Container>
    <LoadingRing color={color} />
    <LoadingRing color={color} />
    <LoadingRing color={color} />
    <LoadingRing color={color} />
  </Container>
);

export default Spinner;
