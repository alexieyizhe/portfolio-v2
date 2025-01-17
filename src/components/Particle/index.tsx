import React, { useMemo } from "react";
import styled, { css } from "styled-components";

import { floatAnim } from "~utils/animations";
import { useSiteContext } from "~utils/context";

import { Size } from "~types/Size";
import { BaseElementProps } from "~types/BaseElementProps";

import {
  ZigzagParticle,
  CircleParticle,
  SquareParticle,
  TriangleParticle,
  RotatingAlexGif,
} from "~assets/images";

export interface ParticleInfo {
  x: number;
  y: number;
  s: number;
  color: string;
}

export interface ParticleProps extends BaseElementProps {
  name?: "zigzag" | "circle" | "triangle" | "square"; // random if not provided
  color?: string;
  size?: Size | number;
  float?: boolean;
  rotation?: number;
  customSVG?: string; // a custom SVG img to use
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PARTICLE_DICTIONARY: { [name: string]: any } = {
  zigzag: ZigzagParticle,
  circle: CircleParticle,
  triangle: TriangleParticle,
  square: SquareParticle,
};

const PARTICLE_OPTIONS = ["zigzag", "circle", "triangle", "square"];
const PARTICLE_SCALE_FACTOR = {
  [Size.XSMALL]: 0.7,
  [Size.SMALL]: 0.8,
  [Size.MEDIUM]: 1,
  [Size.LARGE]: 1.2,
  [Size.XLARGE]: 1.5,
};

const Container = styled.span<ParticleProps>`
  display: inline-block;

  ${({ float }) =>
    float &&
    css`
      animation: ${floatAnim} ${Math.random() * 5 + 3}s ease-in-out infinite;
    `}

  & > svg {
    transform: scale(
        ${({ size = Size.MEDIUM }) =>
          typeof size === "number" ? size : PARTICLE_SCALE_FACTOR[size]}
      )
      rotate(${({ rotation }) => rotation}deg);

    & circle {
      fill: ${({ theme, color = "black" }) =>
        theme.color[color] || color} !important;
    }
    & path {
      fill: ${({ theme, color = "black" }) =>
        theme.color[color] || color} !important;
    }
    & line {
      stroke: ${({ theme, color = "black" }) =>
        theme.color[color] || color} !important;
    }
  }
`;

const EasterEggImg = styled.img`
  max-width: 70px;
`;

const Particle: React.FC<ParticleProps> = ({
  name,
  rotation = 0,
  customSVG,
  ...rest
}) => {
  const { easterEggActive } = useSiteContext();

  const randomParticle = useMemo(
    () => PARTICLE_OPTIONS[Math.floor(Math.random() * PARTICLE_OPTIONS.length)],
    []
  );

  const ParticleComponent = useMemo(() => {
    if (easterEggActive) {
      return <EasterEggImg src={RotatingAlexGif} />;
    } else {
      const Markup = customSVG || PARTICLE_DICTIONARY[name || randomParticle];
      return <Markup />;
    }
  }, [customSVG, easterEggActive, name, randomParticle]);

  return (
    <Container {...rest} rotation={rotation}>
      {ParticleComponent}
    </Container>
  );
};

export default Particle;
