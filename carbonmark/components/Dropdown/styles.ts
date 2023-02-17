import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const dropdownHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  background-color: var(--surface-02);
  border-radius: 1rem;
  padding: 1rem 0.8rem 1rem 1.4rem;
  min-height: 4.8rem;

  &:hover {
    cursor: pointer;
  }

  svg {
    fill: var(--klima-green);
  }
`;

export const tippyContainer = css`
  .tippy-box {
    margin-top: 0rem;
  }
`;

export const dropDownMenu = css`
  background-color: var(--surface-02);
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: var(--shadow-03);
`;

export const sortbyButton = css`
  display: flex;
  align-items: center;
  background-color: var(--surface-02);
  border-radius: 1rem;
  padding: 1.2rem;
  min-height: auto;
  justify-content: center;

  &:hover {
    cursor: pointer;
    color: var(--klima-green);
  }

  &[data-active="true"] {
    color: var(--klima-green);
  }

  ${breakpoints.large} {
    padding: 1rem;
    min-height: 4.8rem;
  }
`;
