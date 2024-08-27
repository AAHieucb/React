import { css } from '@linaria/core';
import { styled } from '@linaria/react';

const header = css`
  text-transform: uppercase;
`;

// Tạo components mới
// Hỗ trợ style như sass
const Container = styled.div`
  font-size: "30"px;
  &:hover {
    color: red;
  }
`;

const UseLinaria = () => {
  return (
    <>
      <h1 className={header}>Hello world</h1>
      <Container>Hello</Container>
    </>
  );
};
export default UseLinaria;