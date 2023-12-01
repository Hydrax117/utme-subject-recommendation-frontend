import styled from "styled-components";
const FooterContainer = styled.div`
  background: black;
  height: 200px;
  position: relative;
  border-top: 2px solid white;
  color: white;
  text-align: center;
`;
export const Footer = () => {
  return (
    <FooterContainer>
      <p>Created by P.kaka70@2023</p>
      <p>all rights are reserved</p>
    </FooterContainer>
  );
};
