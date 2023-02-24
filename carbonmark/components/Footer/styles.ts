import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const footer = (transparent = false) => css`
  background: ${transparent
    ? "none"
    : "#8B8FAE"}; // @todo - change this to variable
  padding: 4rem 0;
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
  height: unset;

  nav {
    max-height: unset;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  ${breakpoints.medium} {
    padding: 4rem 0;
    nav {
      width: unset;
    }
  }
`;

export const footer_content = css`
  display: flex;
  flex-direction: column;
  grid-column: main;
  align-items: center;
  gap: 4rem;
  justify-content: space-between;
  height: 100%;

  ${breakpoints.medium} {
    justify-content: center;
  }

  ${breakpoints.large} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const footer_nav = css`
  font-size: 1.4rem;
  max-height: 12rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 1.6rem;
  column-gap: 3.2rem;

  a {
    // Full width link on mobile
    width: 100%;
    ${breakpoints.medium} {
      width: auto;
    }
  }

  & a {
    // color: var(--font-02) !important;
    color: #fff !important;
    font-weight: 500;
    &:hover {
      color: var(--font-01) !important;
    }
  }

  ${breakpoints.large} {
    gap: 3.2;
    flex-direction: column;
  }

  ${breakpoints.desktop} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1.6rem 3.2rem;
  }
`;

export const footer_icons = css`
  gap: 1.6rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start !important;

  ${breakpoints.desktop} {
    justify-content: center;
  }

  & a {
    display: inline-flex;
  }

  svg {
    width: 1.6rem;
    height: 2rem;
  }

  & svg path {
    fill: #fff;
    // fill: var(--font-02);
  }

  & svg:hover path {
    fill: var(--font-01);
  }

  ${breakpoints.medium} {
    flex-direction: row;
    svg {
      width: 1.8rem;
    }
  }
`;
