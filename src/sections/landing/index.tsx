import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Waypoint } from "react-waypoint";
import { useSpring, animated, config } from "react-spring";
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";

import Intro from "./components/Intro";
import QuickLinks from "./components/QuickLinks";
import BackgroundParticles from "./components/BackgroundParticles";

const Container = styled(animated.div)`
  position: relative;
  height: 80vh;

  ${({ theme }) => theme.mediaQueries.tablet`
    height: 85vh;
  `}

  ${({ theme }) => theme.mediaQueries.xlMobile`
    height: 80vh;
  `}
`;

const HeroImgContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60%;

  ${({ theme }) => theme.mediaQueries.tablet`
    bottom: 10vh;
    width: 80%;
  `}

  ${({ theme }) => theme.mediaQueries.largeMobile`
    bottom: 100px;
    width: 100%;
  `}
`;

const Landing = () => {
  const [landingVisible, setLandingVisible] = useState(false);

  const onLandingEnter = useCallback(() => setLandingVisible(true), []);

  const entryAnimStyles = useSpring({
    opacity: landingVisible ? 1 : 0,
    transform: landingVisible ? "translateY(0)" : "translateY(100px)",
    config: config.stiff,
  });

  // query for hero image with graphQL
  const {
    file: { childImageSharp },
  } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "hero-main.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);

  return (
    <>
      <BackgroundParticles />
      <Waypoint onEnter={onLandingEnter} scrollableAncestor="window">
        <Container>
          <HeroImgContainer>
            <Img
              fluid={childImageSharp.fluid}
              alt="Landing page image of Alex Xie"
            />
          </HeroImgContainer>
          <Intro style={entryAnimStyles} />
          <QuickLinks style={entryAnimStyles} />
        </Container>
      </Waypoint>
    </>
  );
};

export default Landing;
