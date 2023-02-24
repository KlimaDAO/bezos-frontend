import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const fullWidth = css`
  grid-column: 1 / 3;
`;

export const projectLink = css`
  display: inline-flex;
  margin: 1rem 0;
`;

export const backToResults = css`
  color: var(--font-01) !important;

  svg {
    margin-right: 0.8rem;
  }
`;

export const projectHeader = css`
  position: relative;
  overflow: hidden;
  padding: 2.4rem 1.6rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 2.5rem;

  .stack {
    display: grid;
    gap: 1.6rem;
  }

  ${breakpoints.medium} {
    padding: 10rem 2rem;
  }
`;

export const imageGradient = css`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const projectHeaderText = css`
  color: var(--white);
  word-break: break-word;
  font-size: 1.4rem;
  font-weight: 600;
  z-index: 1;

  a {
    color: var(--klima-blue);
  }
`;

export const price = css`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
  border-radius: var(--border-radius);
  padding: 0.4rem 0.8rem;
  background-color: var(--surface-02);
  flex-direction: row;
  align-items: center;
  align-self: flex-start;

  font-size: 1.4rem;
  color: var(--font-01);
`;

export const formContainer = css`
  max-width: 42rem;
`;

export const inputsContainer = css`
  display: grid;
  align-content: start;
  gap: 1.6rem;
  overflow: hidden;
`;

export const availableAmount = css`
  margin-top: -1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

export const spinnerWrap = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 25rem;
`;

export const errorMessagePrice = css`
  font-size: 1.2rem;
  line-height: 1.4rem;
  font-weight: 400;
  color: var(--warn);
  margin-bottom: 0.2rem;
  word-break: break-word;
  margin-top: -0.8rem;

  ${breakpoints.large} {
    font-size: 1.4rem;
    line-height: 1.6rem;
    margin-bottom: 0.8rem;
  }
`;
