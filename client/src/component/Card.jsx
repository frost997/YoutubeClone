import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
const Container = styled.div`
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 202px;
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
`;
const ChannelImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const Texts = styled.div`
  /* font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text}; */
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

export const Card = () => {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container>
        <Img src="https://images.justwatch.com/poster/227125464/s718/cyberpunk-edgerunners.%7Bformat%7D" />
        <Details>
          <ChannelImg src="https://preview.redd.it/3j9secjn6q071.png?auto=webp&s=b0ede6d32a0d66b455d0347dce9f1e4bf96ee779" />
          <Texts>
            <Title>Test Video</Title>
            <ChannelName>Kelvin</ChannelName>
            <Info>503k views . 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};
