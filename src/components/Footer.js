const { default: styled } = require("styled-components");

const Wrapper = styled.footer`
  margin-top: 5rem;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  span {
    padding: 0.5rem;
  }
`;

const Footer = () => (
  <Wrapper>
    <span>This website was created for study purpose</span>
    <span>R.Phuwanat 2021</span>
  </Wrapper>
);

export default Footer;
