import { css } from "@emotion/css";

export const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--surface-04);
  backdrop-filter: blur(1px);
`;

export const heading = css`
  display: flex;
  position: relative;
  justify-content: space-between;
`;

export const closeButton = css`
  width: 18px;
  display: flex;
  border-radius: var(--border-radius);
  background: var(--surface-02);
  padding: 0.9rem;
  margin-left: var(--padding-small);
`;

export const content = css`
  margin-top: var(--padding-medium);
`;

export const modal = css`
  background: var(--surface-01);
  border-radius: 3px;
  box-sizing: border-box;
  left: 50vw;
  padding: var(--padding-medium);
  position: fixed;
  top: 50vh;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  overflow: auto;
  align-items: center;

  button {
    width: fit-content;
  }
`;
