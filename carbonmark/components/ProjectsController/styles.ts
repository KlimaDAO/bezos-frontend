import { css } from "@emotion/css";

export const main = css`
  display: flex;
  > *:not(:nth-last-child(1)) {
    margin-right: 2rem;
  }
`;

export const filterButton = css`
  //Unfortunately button styles win the selector war here
  color: var(--font-inverse-01) !important;
  background: var(--surface-inverse-01);
`;
