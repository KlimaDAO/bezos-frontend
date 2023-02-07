import {
  Anchor as A,
  ButtonPrimary,
  CarbonmarkLogo,
  DiscordIcon,
  GithubIcon,
  LinkedInIcon,
  Text,
  TwitterIcon,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import Close from "@mui/icons-material/Close";
import { useGetDomainFromAddress } from "hooks/useGetDomainFromAddress";
import Link from "next/link";
import { FC } from "react";
import { AddressSection } from "../AddressSection";
import { NavMenu } from "../NavMenu";
import * as styles from "./styles";
// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

// const DynamicThemeToggle = dynamic(
//   () => import("components/shared/ThemeToggle"),
//   { ssr: false }
// );

interface NavDrawerProps {
  userAddress?: string;
  onHide?: () => void;
}

export const NavDrawer: FC<NavDrawerProps> = (props) => {
  const { address, isConnected, disconnect, toggleModal } = useWeb3();
  // collect nameserviceDomain Data if connected and domain is in URL
  const connectedDomain = useGetDomainFromAddress(address);

  return (
    <nav className={styles.container}>
      <Link href="/" data-desktop-only>
        <CarbonmarkLogo />
      </Link>
      <div className={styles.mobile.header} data-mobile-only>
        {/* <DynamicThemeToggle /> */}
        <ButtonPrimary
          variant="lightGray"
          className="close"
          label={<Close />}
          onClick={props.onHide}
        />
      </div>
      {!address && !isConnected && (
        <div data-mobile-only>
          <ButtonPrimary
            label={t`Log in`}
            onClick={toggleModal}
            className="connectButton"
          />
          <div className="hr" />
        </div>
      )}
      {address && isConnected && (
        <div data-mobile-only>
          <ButtonPrimary
            label={t`Log out`}
            onClick={disconnect}
            className="connectButton"
          />
        </div>
      )}
      <div className={styles.addressContainer}>
        <div className="hr" />
        <AddressSection domain={connectedDomain} address={address} />
        <div className="hr" />
      </div>
      <NavMenu
        userAddress={props.userAddress}
        connectedAddress={address}
        connectedDomain={connectedDomain}
      />

      <div className="navFooter">
        <div className="hr" />
        <Text t="caption" align="center">
          <Trans>
            Built with 🌳 by <a href="https://klimadao.finance">KlimaDAO</a>
          </Trans>
        </Text>
        <div className={styles.footer_icons}>
          <A href={urls.twitterCarbonmark}>
            <TwitterIcon />
          </A>
          <A href={urls.discordInvite}>
            <DiscordIcon />
          </A>
          <A href={urls.github}>
            <GithubIcon />
          </A>
          <A href={urls.linkedInCarbonmark}>
            <LinkedInIcon />
          </A>
        </div>
      </div>
    </nav>
  );
};
