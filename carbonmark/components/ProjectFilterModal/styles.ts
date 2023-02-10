import { css } from "@emotion/css";

export const main = css`
  max-width: 50rem;
  width: 32rem;

  button.action {
    width: 100%;
  }

  .modalContent {
    display: grid;
    grid-gap: 5px;
  }

  .dropdown {
    width: 100%;
    button {
      width: 100%;
    }
  }
`;

export const option = css`
  display: flex;
  align-items: center;

  svg {
    font-size: 1.8rem;
    opacity: 0.6;
    margin-right: 5px;
  }
`;
