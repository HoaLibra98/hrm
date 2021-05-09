import styled from "styled-components";

const Main = styled("div")`
  & .app-main__outer {
    display: flex;
    flex: 1;
    overflow-x: hidden;
    & .app-main__inner {
      overflow-x: hidden;
      display: flex;
      flex: 1;
      & > div {
        overflow-x: hidden;
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow-x: hidden;
      }
    }
  }
`;

export { Main };
