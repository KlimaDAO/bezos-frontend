import {
  ButtonPrimary,
  ConnectModal,
  MarketplaceLogo,
} from "@klimadao/lib/components";
import { Domain } from "@klimadao/lib/types/domains";
import { t } from "@lingui/macro";
import Close from "@mui/icons-material/Close";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FC } from "react";
import { AddressSection } from "../AddressSection";
import { NavMenu } from "../NavMenu";
import * as styles from "./styles";

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const DynamicThemeToggle = dynamic(
  () => import("components/Navigation/ThemeToggle"),
  { ssr: false }
);

interface NavDrawerProps {
  userAddress?: string;
  connectedAddress?: string;
  connectedDomain?: Domain;
  isMobile?: boolean;
  onHide?: () => void;
}

export const NavDrawer: FC<NavDrawerProps> = (props) => {
  return (
    <nav className={styles.container}>
      <Link href="/marketplace" data-desktop-only>
        <MarketplaceLogo />
      </Link>
      <div className={styles.mobile.header} data-mobile-only>
        <DynamicThemeToggle />
        <ButtonPrimary
          variant="lightGray"
          className="close"
          label={<Close />}
          onClick={props.onHide}
        />
      </div>
      <div className="hr" />
      <div data-mobile-only>
        <ConnectModal
          buttonClassName="connectButton"
          errorMessage={t({
            message: "We had some trouble connecting. Please try again.",
            id: "connect_modal.error_message",
          })}
          torusText={t({
            message: "or continue with",
            id: "connectModal.continue",
          })}
          titles={{
            connect: t({
              id: "connect_modal.sign_in",
              message: "Sign In / Connect",
            }),
            loading: t({
              id: "connect_modal.connecting",
              message: "Connecting...",
            }),
            error: t({
              id: "connect_modal.error_title",
              message: "Connection Error",
            }),
          }}
          buttonText={t({ id: "shared.connect", message: "Connect" })}
        />
      </div>
      <div className={styles.addressContainer} data-desktop-only>
        <AddressSection
          domain={props.connectedDomain}
          address={props.connectedAddress}
        />
      </div>
      <div className="hr" />
      <NavMenu />

      <div className="navFooter">
        <div className="hr" />
        <div className="navFooter_buttons"></div>
      </div>
    </nav>
  );
};
