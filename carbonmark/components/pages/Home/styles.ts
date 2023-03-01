import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const hero = css`
  display: grid;
  padding: 0 !important;
  min-height: 60vh;
  grid-column: full;
  grid-template-columns: inherit;
  background: url("/hero.png") center center / cover no-repeat;

  .stack {
    gap: 3.2rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
    max-width: 100%;
    grid-column: main;
    margin-top: 8rem;
    margin-bottom: 4rem;

    ${breakpoints.desktop} {
      max-width: 70%;
      margin-bottom: 12rem;
    }

    & h1 {
      margin: 0;
      color: #000;
      font-size: 4.4rem;
      line-height: 4.4rem;
      max-width: 75%;

      ${breakpoints.desktop} {
        max-width: 100%;
        font-size: 6rem;
        line-height: 6rem;
      }
    }

    & h2 {
      margin: 0;
      color: #000;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2rem;
      font-family: var(--font-family);

      ${breakpoints.desktop} {
        font-size: 2.4rem;
        line-height: 3.2rem;
      }
    }

    & a {
      margin: 0 !important;
      color: #fff;
      width: 100%;
      font-size: 1.4rem;
      background: var(--warning-red);

      ${breakpoints.desktop} {
        width: 15rem;
        min-width: 15rem !important;
      }
    }

    ${breakpoints.desktop} {
      min-height: 100vh;
    }
  }
`;

export const partnersSection = css`
  padding: 4rem 0rem 2rem !important;
  background: url("/partners-bg.png") center top / cover no-repeat;

  ${breakpoints.desktop} {
    padding: 7.6rem 0rem 11rem !important;
  }

  & h2 {
    margin: 0 auto 4rem;
    max-width: 100%;
    font-size: 2.4rem;
    line-height: 2.8rem;

    ${breakpoints.desktop} {
      max-width: 80%;
      font-size: 3.2rem;
      line-height: 3.6rem;
    }
  }

  & .partners {
    gap: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 6rem;
    margin-top: 2.6rem;

    ${breakpoints.desktop} {
      gap: 7rem;
      margin-top: 2rem;
      flex-direction: row;
      margin-bottom: 37rem;
    }
  }

  & .card-wrapper {
    display: none;

    ${breakpoints.desktop} {
      display: flex;
      margin-top: 6rem;
    }

    p {
      height: 12rem;
      overflow: hidden;
    }
  }

  & a {
    margin: 0;
    display: none;

    ${breakpoints.desktop} {
      display: flex;
      margin: 4rem auto 0;
    }
  }
`;

export const offsetCarbonSection = css`
  padding: 4rem 0rem 4rem !important;
  background: url("/offset-carbon-bg.png") center center / cover no-repeat;

  ${breakpoints.desktop} {
    padding: 20rem 0rem 28rem !important;
  }

  & .stack {
    gap: 2.7rem;
    display: flex;
    flex-direction: column;

    ${breakpoints.desktop} {
      flex-direction: row;
    }
  }

  & h2 {
    margin-bottom: 3.2rem;
    max-width: 100%;
    text-align: left !important;
    font-size: 3.6rem;
    line-height: 3.6rem;

    ${breakpoints.desktop} {
      max-width: 80%;
      font-size: 6rem;
      line-height: 6rem;
      margin-bottom: 2rem !important;
    }
  }

  & .description {
    margin: 0 !important;
    margin-bottom: 2rem !important;
    text-align: left !important;
    font-size: 1.8rem; // desktop??
    line-height: 2rem; // desktop??
  }

  & a {
    margin: 2rem 0;
  }
`;

export const sellCarbonSection = css`
  padding: 4rem 0rem 4rem !important;
  background: url("/sell-carbon-bg.png") center bottom / cover no-repeat;

  ${breakpoints.desktop} {
    padding: 20rem 0rem 28rem !important;
  }

  & .stack {
    gap: 7.3rem;
    display: flex;
    flex-direction: column-reverse;

    ${breakpoints.desktop} {
      gap: 7.3rem;
      flex-direction: row;
    }
  }

  & h2 {
    margin-bottom: 3.2rem;
    max-width: 100%;
    text-align: left !important;
    font-size: 3.6rem;
    line-height: 3.6rem;

    ${breakpoints.desktop} {
      max-width: 80%;
      font-size: 6rem;
      line-height: 6rem;
      margin-bottom: 2rem !important;
    }
  }

  & .description {
    margin: 0 !important;
    margin-bottom: 2rem !important;
    text-align: left !important;
    font-size: 1.8rem; // desktop??
    line-height: 2rem; // desktop??
  }

  & a {
    width: 100%;
    margin: 0 !important;
    background: var(--warning-red);

    ${breakpoints.desktop} {
      width: 16.5rem;
    }
  }

  & .card {
    background: #eddaa9 !important;
    h4,
    svg {
      color: var(--warning-red);
    }
  }
`;

export const learnMoreSection = css`
  padding: 4rem 0rem;
  background: url("/learn-more-bg.png") center bottom / cover no-repeat;

  ${breakpoints.desktop} {
    padding: 7.5rem 0rem 3rem;
  }

  & h2 {
    margin-bottom: 4rem;
  }

  & a {
    color: #fff;
    margin: 0;
    background: #000;
    min-width: 13.5rem;

    ${breakpoints.desktop} {
      margin: 4.8rem auto 0;
    }
  }

  .card-wrapper div {
    min-height: 2.75rem;

    ${breakpoints.desktop} {
      justify-content: center;
    }

    & .content > * {
      text-align: center;
    }

    & .content {
      p {
        max-height: 6rem;
      }

      h5,
      h6 {
        font-size: 1.6rem;
        line-height: 2rem;
        font-family: var(--font-family-secondary);
        font-weight: 700;
        text-decoration: underline;
      }

      h5 {
        text-decoration: none;
      }
    }
  }
`;

export const poweredBySection = css`
  padding: 8.4rem 0rem 6rem !important;
  background: url("/powered-by-bg.png") center center / cover no-repeat;

  ${breakpoints.desktop} {
    padding: 16rem 0rem 6rem !important;
  }

  & h2 {
    color: #fff;
    margin: 0;
    gap: 1rem;
    font-size: 2.4rem;
    line-height: 2.8rem;
    display: flex !important;
    align-items: center;
    justify-content: center;

    ${breakpoints.desktop} {
      font-size: 3.2rem;
      line-height: 3.6rem;
    }
  }

  & p.description {
    max-width: 100%;
    margin: 2.4rem auto !important;
    text-align: center;
    font-size: 1.6rem;
    line-height: 2rem;
    color: #fff !important;

    ${breakpoints.desktop} {
      max-width: 75%;
      font-size: 2.2rem;
      line-height: 3.3rem;
      margin: 3.2rem auto !important;
    }
  }

  & svg path {
    fill: #fff !important;
    &:last-of-type {
      fill: var(--klima-green) !important;
    }
  }
`;

export const list = css`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;

  & .card-wrapper {
    gap: 2rem;
    display: flex;
    flex-direction: row;
    ${breakpoints.desktop} {
      justify-content: center;
    }
  }
`;

export const scroller = css`
  gap: 2rem;
  width: 100%;
  flex-direction: row;
  justify-content: normal;

  & .card-wrapper {
    gap: 1.6rem;
    display: flex;
    width: 100%;
    margin: 0 auto;
    padding: 0 0 1.6rem;
    flex-direction: column;

    ${breakpoints.desktop} {
      margin: 6rem auto;
    }

    // scrollbar-width: none;
    // -ms-overflow-style: none;
    // ::-webkit-scrollbar {
    //   display: none;
    // }

    & > div {
      min-width: 100%;
    }
  }
`;

export const step = css`
  flex: 1;
  display: flex;
  flex-direction: column;

  & h4 {
    font-size: 4.8rem;
    line-height: 4.8rem;
    color: var(--bright-blue);
    font-weight: 700;
    font-family: var(--font-family-secondary);
  }

  & .card {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-direction: row;
    justify-content: center;
    padding: 1.6rem;
    border-radius: 1rem;
    background-color: var(--surface-02);

    ${breakpoints.desktop} {
      padding: 3rem;
    }

    & h4 {
      flex: 1.5;
    }

    svg {
      flex: 0.5;
      height: 4.9rem;
      color: var(--bright-blue);
    }

    & .card-info {
      flex: 2;
      margin: 0;
      font-weight: 500;
      font-size: 1.8rem;
      line-height: 2.2rem;
      color: var(--font-01);
      font-family: var(--font-family-secondary);
    }
  }
`;

export const card = css`
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
  max-width: 32rem;
  display: flex;
  flex: 1;
  gap: 1.6rem;
  flex-direction: column;
  height: 100%;
  transition: all 0.2s ease 0s;

  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

export const cardImage = css`
  position: relative;
  overflow: hidden;
  height: 12rem;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
`;

export const cardContent = css`
  flex: 1 0 auto;
  padding: 1.2rem 2rem 2rem;
  display: grid;
  gap: 1.2rem;

  & h4 {
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.8rem;
    font-family: var(--font-family-secondary);
  }

  & h5 {
    font-weight: 700;
    font-size: 1.6rem;
    font-family: var(--font-family-secondary);
    line-height: 2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & p {
    line-height: 2rem;
    background: linear-gradient(
      180deg,
      #313131 43.44%,
      rgba(49, 49, 49, 0) 92.91%
    );
    background-clip: text;
    text-fill-color: transparent;
  }
`;

export const tags = css`
  display: flex;
  gap: 0.8rem;
  flex-direction: row;
  margin-top: auto;
  align-items: center;
`;

export const section = css`
  display: grid;
  grid-column: full;
  padding: 8rem 0rem;
  grid-template-columns: inherit;

  ${breakpoints.desktop} {
    padding: 10rem 0rem;
  }

  .stack {
    grid-column: main;

    & h2 {
      text-align: center;
    }

    & p.description {
      margin: 3.2rem 0;
      text-align: center;
      color: var(--font-02);

      ${breakpoints.desktop} {
        margin: 4rem 0;
        &:first-of-type {
          margin-bottom: 6rem;
        }
      }
    }

    & .coming-soon {
      margin-top: 3.2rem;
      text-align: center;
      color: var(--font-02);

      ${breakpoints.desktop} {
        margin-top: 6rem;
      }

      & > span {
        text-decoration: underline;
        color: var(--klima-green);
      }
    }
  }
`;

export const sectionAlt = css`
  display: grid;
  grid-column: full;
  padding: 8rem 0rem !important;
  grid-template-columns: inherit;

  ${breakpoints.desktop} {
    padding: 20rem 0rem !important;
  }

  .stack {
    grid-column: main;

    & h2 {
      gap: 1rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      ${breakpoints.desktop} {
        gap: 2rem;
        flex-direction: row;
      }

      & svg {
        height: 32px;
        display: inline-flex;

        ${breakpoints.desktop} {
          height: 48px;
        }
      }
    }

    & p.description {
      max-width: 60rem;
      margin: 3.2rem auto;
      text-align: center;
      color: var(--font-02);
    }
  }
`;

export const sectionImage = css`
  width: 100%;
  display: flex;
  grid-column: full;
  padding: 0 !important;
  min-height: 53rem;

  ${breakpoints.desktop} {
    min-height: 70rem;
  }

  & div {
    width: 100%;
    display: flex;
    flex-direction: column;

    &.project-devs {
      flex-direction: column-reverse;
      ${breakpoints.desktop} {
        flex-direction: row;
      }
    }

    ${breakpoints.desktop} {
      flex-direction: row;
    }

    & .image-bg {
      width: 100%;
      height: 50rem;

      ${breakpoints.desktop} {
        width: 50%;
        height: 100%;
      }
    }

    &.carbon-traders {
      & .image-bg {
        background: url("/plant-pots.png") center center / cover no-repeat;
      }
      & .pattern-bg {
        background: url("/carbon-traders-bg.png") center center / cover
          no-repeat;
      }
    }

    &.project-devs {
      & .image-bg {
        background: url("/plant.png") center center / cover no-repeat;
      }
      & .pattern-bg {
        background: url("/project-devs-bg.png") center center / cover no-repeat;
      }
    }

    & .pattern-bg {
      width: 100%;
      height: auto;

      ${breakpoints.desktop} {
        width: 50%;
        height: 100%;
      }

      & div {
        display: flex;
        max-width: 100%;
        padding: 8rem 1.8rem;
        margin: 0 auto;
        flex-direction: column;
        justify-content: center;

        ${breakpoints.desktop} {
          padding: 0;
          max-width: 60%;
        }
      }

      & h2 {
        max-width: 75%;
        text-align: center;
        font-size: 3.6rem;
        line-height: 3.6rem;
        margin: 0 auto 3.2rem;

        ${breakpoints.desktop} {
          max-width: 100%;
          margin-bottom: 4rem;
          font-size: 6rem;
          line-height: 6rem;
        }
      }

      & ul {
        padding: 0;
        list-style: none;

        & li {
          gap: 1.8rem;
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;
          font-size: 2.2rem;
          line-height: 3.3rem;

          &:last-child {
            margin-bottom: 0;
          }

          & svg {
            width: 3rem;
            height: 3rem;
            color: var(--bright-blue);
          }
        }
      }
    }
  }
`;

export const sectionDark = css`
  & h2 {
    color: #fff;
    text-align: center;
  }
  & p.description {
    color: #ddd !important;
  }

  & .card {
    color: #fff;
    background: #303030 !important;

    & .card-info {
      color: #fff;
    }
  }
`;

export const browseButton = css`
  width: auto;
  margin: 4rem auto 0;
  font-size: 1.4rem;
  color: var(--white) !important;
  background-color: var(--bright-blue);

  ${breakpoints.desktop} {
    width: 19rem;
    min-width: 19rem;
  }
`;

export const footer = css`
  background: var(--manatee);
  padding: 2.8rem 0;
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
  height: unset;

  nav {
    max-height: unset;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
  }

  ${breakpoints.medium} {
    padding: 4rem 0;
    nav {
      width: unset;
    }
  }
`;

export const footerContent = css`
  display: flex;
  flex-direction: column;
  grid-column: main;
  align-items: center;
  gap: 5rem;
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

export const footerNav = css`
  font-size: 1.4rem;
  max-height: 12rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 1.6rem;
  column-gap: 3.2rem;

  a {
    width: 100%;
    ${breakpoints.medium} {
      width: auto;
    }
  }

  & a {
    color: #fff !important;
    &:hover {
      color: var(--font-01) !important;
    }
  }

  ${breakpoints.large} {
    gap: 1.6rem 7rem;
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

export const footerIcons = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
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
