import { css } from "@emotion/css";
export const input = css`
  background: var(--surface-01);
  border: unset;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  width: 40rem;
`;

export const main = css`
  display: flex;
`;

export const button = css`
  padding: 1.4rem;
  //Unfortunately button styles win the selector war here
  color: var(--font-inverse-01) !important;
  background: var(--surface-inverse-01);
  svg {
    font-size: 2rem;
  }
`;
