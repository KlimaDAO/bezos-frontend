import { css } from "@emotion/css";
import breakpoints from "./breakpoints";

export const h1 = css`
  font-family: var(--font-family);
  font-size: 4.8rem;
  line-height: 4.8rem;
  font-weight: 700;
  ${breakpoints.large} {
    font-size: 6rem;
    line-height: 6rem;
  }
`;

export const h2 = css`
  font-family: var(--font-family);
  font-size: 3.6rem;
  line-height: 3.6rem;
  font-weight: 700;
  ${breakpoints.large} {
    font-size: 4.8rem;
    line-height: 4.8rem;
  }
`;

export const h3 = css`
  font-family: var(--font-family);
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-weight: 600;
  ${breakpoints.large} {
    font-size: 3.2rem;
    line-height: 3.6rem;
  }
`;

export const h4 = css`
  font-family: var(--font-family);
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 600;
`;

export const h5 = css`
  font-family: var(--font-family);
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 700;
`;

export const body1 = css`
  font-family: var(--font-family-secondary);
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 500;
  letter-spacing: 1%;
`;

export const body2 = css`
  font-family: var(--font-family-secondary);
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 400;
  letter-spacing: 1%;
`;

export const body3 = css`
  font-family: var(--font-family-secondary);
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 600;
  letter-spacing: 1%;
`;

// nav text
export const body4 = css`
  font-family: var(--font-family);
  font-size: 1.2rem;
  line-height: 1.6rem;
  font-weight: 600;
`;

export const button = css`
  font-family: var(--font-family);
  text-transform: uppercase;
  font-size: 1.2rem;
  line-height: 1.6rem;
  font-weight: 600;
`;

// legacy tags

export const body5 = css`
  font-size: 2rem;
  line-height: 2.8rem;
  font-weight: 300;
  ${breakpoints.large} {
    font-size: 2.4rem;
    line-height: 3.2rem;
  }
`;
export const body6 = css`
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 300;
  ${breakpoints.large} {
    font-size: 1.8rem;
    line-height: 2.4rem;
  }
`;
export const body7 = css`
  font-weight: 300;
  font-size: 2rem;
  line-height: 2.8rem;
  ${breakpoints.large} {
    font-size: 2.8rem;
    line-height: 3.6rem;
  }
`;
export const body8 = css`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.2rem;
`;
export const caption = css`
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 500;
  ${breakpoints.large} {
    font-size: 1.6rem;
    line-height: 2rem;
  }
`;

export const badge = css`
  text-transform: uppercase;
  font-size: 1.2rem;
  line-height: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.06rem;
`;
