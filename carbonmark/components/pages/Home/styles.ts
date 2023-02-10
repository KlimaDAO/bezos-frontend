import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const hero = css`
  display: grid;
  padding: 0 !important;
  min-height: 60vh;
  grid-column: full;
  grid-template-columns: inherit;
  background: url("/hero.png") center center / cover no-repeat;
  padding-top: 2rem !important;

  .stack {
    gap: 3.2rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
    max-width: 100%;
    grid-column: main;
    margin-bottom: 8rem;

    ${breakpoints.desktop} {
      max-width: 70%;
      margin-bottom: 0;
      margin-bottom: 12rem;
    }

    & h1 {
      margin: 0;
      color: #fff;
      font-size: 4.8rem;
      line-height: 4.8rem;

      ${breakpoints.desktop} {
        font-size: 6rem;
        line-height: 6rem;
      }
    }

    & h2 {
      margin: 0;
      color: #fff;
      font-size: 2rem;
      line-height: 2.8rem;

      ${breakpoints.desktop} {
        font-size: 2.4rem;
        line-height: 3.2rem;
      }
    }

    & button {
      margin: 0 !important;
      width: 100%;

      ${breakpoints.desktop} {
        width: 17rem;
      }
    }

    ${breakpoints.desktop} {
      min-height: 100vh;
    }
  }
`;

export const list = css`
  display: flex;
  gap: 3.6rem;
  margin-top: 4rem;
  flex-direction: column;
  justify-content: center;

  & .card-wrapper {
    gap: 2rem;
    display: flex;
    flex-direction: row;
  }

  ${breakpoints.desktop} {
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

export const scroller = css`
  gap: 2rem;
  width: 110%;
  flex-direction: row;
  justify-content: normal;

  & .card-wrapper {
    gap: 1.6rem;
    display: flex;
    padding: 1rem 0;
    overflow-x: auto;

    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }

    & > div {
      min-width: 80%;
      &:last-child {
        margin-right: 10%;
      }
    }
  }
`;

export const step = css`
  flex: 1;
  display: flex;
  flex-direction: column;

  ${breakpoints.desktop} {
    &:nth-of-type(2) {
      margin-top: 6rem;
    }

    &:nth-of-type(3) {
      margin-top: 12rem;
    }
  }

  & h4 {
    text-align: center;
    color: var(--klima-green);
  }

  & .card {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: 2rem;
    padding: 1.6rem;
    background-color: var(--surface-02);

    ${breakpoints.desktop} {
      padding: 3.5rem 1.5rem;
    }

    & .card-info {
      margin: 0;
      font-weight: 400;
      text-align: center;
      margin-top: 2.2rem;
      font-size: 1.6rem;
      line-height: 2.4rem;
      color: var(--font-01);
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
    font-size: 2rem;
  }

  & h5 {
    font-weight: 600;
    font-size: 1.6rem;
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
    min-height: 100rem;
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
        background: url("/greenhouse.png") center center / cover no-repeat;
      }
    }

    &.project-devs {
      & .image-bg {
        background: url("/field.png") center center / cover no-repeat;
      }
    }

    & .pattern-bg {
      width: 100%;
      height: auto;
      background: url("/line-pattern.svg") center center / cover no-repeat;

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
          max-width: 75%;
        }
      }

      & h2 {
        margin-bottom: 3.2rem;
        ${breakpoints.desktop} {
          margin-bottom: 4rem;
        }
      }

      & ul {
        padding: 0;
        list-style: none;

        & li {
          gap: 1.8rem;
          display: flex;
          align-items: center;
          margin-bottom: 2rem;

          &:last-child {
            margin-bottom: 0;
          }

          & svg {
            color: var(--klima-green);
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
  margin: 4rem auto 0;
  width: 100%;

  ${breakpoints.desktop} {
    width: auto;
    min-width: 25rem;
  }
`;
