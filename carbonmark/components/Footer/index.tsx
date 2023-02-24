import { cx } from "@emotion/css";
import {
  Anchor as A,
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";
import { FC } from "react";

import { urls } from "@klimadao/lib/constants";
import * as styles from "./styles";

interface Props {
  className?: string;
  transparent?: boolean;
}

export const Footer: FC<Props> = (props) => (
  <footer className={cx(styles.footer(props.transparent), props.className)}>
    <div className={cx(styles.footer_content, "footer_content")}>
      <nav className={cx(styles.footer_nav, "footer_nav")}>
        <Link href="/">
          <Trans>Privacy Policy</Trans>
        </Link>
        <Link href="/">
          <Trans>Terms of Use</Trans>
        </Link>
        <Link href="/">
          <Trans>Contact</Trans>
        </Link>
        <Link href="/">
          <Trans>Help</Trans>
        </Link>
        <Link href="/">
          <Trans>Resources</Trans>
        </Link>
        <Link href="/">
          <Trans>KlimaDAO</Trans>
        </Link>
      </nav>
      <nav className={styles.footer_icons}>
        <A href={urls.twitterCarbonmark}>
          <TwitterIcon />
        </A>
        <A href={urls.github}>
          <GithubIcon />
        </A>
        <A href={urls.linkedInCarbonmark}>
          <LinkedInIcon />
        </A>
        <A href={urls.pressEmail}>
          <EmailIcon />
        </A>
      </nav>
    </div>
  </footer>
);
