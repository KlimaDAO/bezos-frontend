import { css } from "@emotion/css";
import * as typography from "@klimadao/lib/theme/typography";

export const main = css`
  width: 100%;
  padding: 0 0.4rem;
  border-bottom: 1px solid var(--surface-02);

  .content {
    padding: 0 0.4rem;
    overflow: hidden;
    display: none;
    max-height: 0;
    transition: 2s;
  }

  &[data-open="true"] {
    .content {
      display: block;
      max-height: 500px;
    }
  }
`;

export const label = css`
  ${typography.h5};
  font-size: 1.6rem !important;
`;

export const toggle = css`
  width: 100%;
  padding: 1rem 0.4rem;
  display: flex;
  align-items: center;
  svg {
    margin-left: auto;
  }
`;