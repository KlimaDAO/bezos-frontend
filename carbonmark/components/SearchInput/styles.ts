import { css } from "@emotion/css";
export const input = css`
  background: var(--surface-01);
  border: unset;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  width:100%:
`;

export const main = css`
  display: flex;
  width: 100%;
  max-width: 40rem;
  min-width: 17.5rem;
  // Not great but we need to force the div "container" element
  // in InputField to fill available space
  div {
    width: 100%;
  }
`;

export const button = css`
  padding: 1.4rem;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  //Unfortunately button styles win the selector war here
  color: var(--font-inverse-01) !important;
  background: var(--surface-inverse-01);
  svg {
    font-size: 2rem;
  }
`;
