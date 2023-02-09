import { cx } from "@emotion/css";
import {
  Anchor as A,
  DiscordIcon,
  LinkedInIcon,
  RedditIcon,
  RSSIcon,
  TelegramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
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
          <Trans>Home</Trans>
        </Link>
        <Link href="/">
          <Trans>Buy</Trans>
        </Link>
        <Link href="/">
          <Trans>Stake</Trans>
        </Link>
        <Link href="/">
          <Trans>App</Trans>
        </Link>
        <Link href="/">
          <Trans>Docs</Trans>
        </Link>
        <Link href="/">
          <Trans>Blog</Trans>
        </Link>
        <Link href="/">
          <Trans>Contact</Trans>
        </Link>
        <Link href="/">
          <Trans>Disclaimer</Trans>
        </Link>
      </nav>
      <nav className={styles.footer_icons}>
        <A href={urls.twitterCarbonmark}>
          <TwitterIcon />
        </A>
        <A href={urls.youtube}>
          <YoutubeIcon />
        </A>
        <A href={urls.discordInvite}>
          <DiscordIcon />
        </A>
        <A href={urls.reddit}>
          <RedditIcon />
        </A>
        <A href={urls.linkedInCarbonmark}>
          <LinkedInIcon />
        </A>
        <A href={urls.telegram}>
          <TelegramIcon />
        </A>
        <A href={urls.podcast}>
          <RSSIcon />
        </A>
      </nav>
    </div>
  </footer>
);
