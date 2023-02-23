import { css } from "@emotion/css";
import { button } from "theme/typography";
import { transparent } from "./mixins";

const buttonBase = css`
  ${button};
  display: flex;
  padding: 0rem 2.4rem;
  align-items: center;
  justify-content: center;
  appearance: none;
  text-decoration: none;
  text-align: center;
  /* min-height to conform with Lighthouse min tap-target */
  min-height: 4.8rem;
  cursor: pointer;
  border-radius: 0.4rem;
  transition: opacity 0.3s ease 0s;

  &.rounded {
    border-radius: 0.8rem;
  }

  &.circle {
    border-radius: 100%;
    padding: 1.5rem;
  }

  &.icon {
    gap: 0.8rem;
    // @note overriding the styles defined in:
    // app/components/views/Home/styles.ts
    svg.MuiSvgIcon-root {
      width: 1em;
      height: 1em;
    }
  }
  &.suffix {
    flex-direction: row-reverse;
  }

  &.transparent {
    ${transparent}
  }
`;

export const buttonPrimary = css`
  ${buttonBase};
  background-color: var(--blue-yellow);
  color: white; /* same in darkmode */

  &:active:not(:disabled) {
    transform: scale(0.95);
    opacity: 0.6;
  }

  &,
  &:hover:not(:disabled),
  &:visited {
    color: var(--surface-02); /* same in darkmode */
  }

  &.gray {
    background-color: var(--surface-01);

    &,
    &:hover:not(:disabled),
    &:visited {
      color: var(--font-02); /* same in darkmode */
    }
  }

  &.lightGray {
    background-color: var(--surface-01);

    &,
    &:hover:not(:disabled),
    &:visited {
      color: var(--font-02); /* same in darkmode */
    }
  }

  &.red {
    background-color: var(--warning-red);
    color: var(--white);
  }

  &.blue {
    background-color: var(--bright-blue);
    &:hover:not(:disabled),
    &:visited {
      color: #000; /* same in darkmode */
    }
  }

  &:disabled {
    background-color: var(--surface-02);
    color: var(--font-03);
    cursor: not-allowed;
  }
`;

export const buttonSecondary = css`
  ${buttonBase};
  border: 1px solid var(--blue-yellow);
  color: var(--blue-yellow);
  background-color: transparent;

  &:hover:not(:disabled),
  &:visited {
    color: var(--blue-yellow); /* same in darkmode */
  }

  &.gray {
    border-color: var(--surface-01);

    &,
    &:hover,
    &:hover:not(:disabled),
    &:visited {
      color: var(--font-01); /* same in darkmode */
    }
  }

  &.lightGray {
    background-color: var(--surface-01);
    box-shadow: var(--shadow-01);
    &,
    &:hover,
    &:hover:not(:disabled),
    &:visited {
      color: var(--font-02); /* same in darkmode */
    }
  }

  &.red {
    border-color: var(--warning-red);
    color: var(--warning-red);
    &,
    &:hover,
    &:hover:not(:disabled),
    &:visited {
      color: var(--warning-red);
    }
  }

  &.blue {
    border-color: var(--bright-blue);

    &,
    &:hover,
    &:hover:not(:disabled),
    &:visited {
      color: var(--bright-blue); /* same in darkmode */
    }
  }
`;