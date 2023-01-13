import { cx } from "@emotion/css";
import { ButtonPrimary, MarketplaceLogo } from "@klimadao/lib/components";
import { Domain } from "@klimadao/lib/types/domains";
import {
  concatAddress,
  getENSProfile,
  getKNSProfile,
  useWeb3,
} from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import Menu from "@mui/icons-material/Menu";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { Footer } from "components/Footer";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FC, ReactNode, useEffect, useState } from "react";
import { useResponsive } from "../hooks/useResponsive";
import { NavDrawer } from "./NavDrawer";

import * as styles from "./styles";

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

const ThemeToggle = dynamic(() => import("components/Navigation/ThemeToggle"), {
  ssr: false,
});

type Props = {
  userAddress?: string;
  userDomain?: string | null;
  profileButton?: JSX.Element;
  children: ReactNode;
};

export const MarketplaceLayout: FC<Props> = (props: Props) => {
  const { address, renderModal, isConnected, toggleModal, disconnect } =
    useWeb3();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [profileData, setProfileData] = useState<Domain>();
  const { isDesktop } = useResponsive();

  // collect nameserviceDomain Data if connected and domain is in URL
  useEffect(() => {
    if (!props.userDomain || !address) return;

    const setProfile = async () => {
      const kns = await getKNSProfile({
        address: address,
      });

      if (kns) return setProfileData(kns);

      const ens = await getENSProfile({ address: address });
      if (ens) return setProfileData(ens);
    };

    setProfile();
  }, [props.userDomain, address]);

  return (
    <div
      className={cx(styles.container, styles.global)}
      data-scroll-lock={showMobileMenu}
    >
      <div className={styles.desktopNavMenu}>
        <NavDrawer userAddress={props.userAddress} />
      </div>
      <div className={styles.cardGrid}>
        <div className={styles.controls}>
          <Link
            href="/marketplace"
            className={styles.mobileLogo}
            data-mobile-only
          >
            <MarketplaceLogo />
          </Link>

          {/* keep mobile nav menu here in markup hierarchy for tab nav */}
          <div
            className={styles.mobileNavMenu_overlay}
            data-visible={showMobileMenu}
            onClick={() => setShowMobileMenu(false)}
          />
          <div className={styles.mobileNavMenu} data-visible={showMobileMenu}>
            <NavDrawer
              userAddress={props.userAddress}
              onHide={() => setShowMobileMenu(false)}
            />
          </div>

          <ChangeLanguageButton />
          {isDesktop && <ThemeToggle />}

          {props.profileButton}

          <ButtonPrimary
            data-mobile-only
            variant="gray"
            icon={<Menu />}
            onClick={() => setShowMobileMenu((s) => !s)}
            className={styles.menuButton}
          />
          <div data-desktop-only>
            {!address && !isConnected && (
              <ButtonPrimary
                label={t({
                  id: "shared.login_connect",
                  message: "Login / Connect",
                })}
                onClick={toggleModal}
              />
            )}
            {address && isConnected && (
              <ButtonPrimary
                label={concatAddress(address)}
                onClick={disconnect}
              />
            )}
          </div>

          {renderModal &&
            renderModal({
              errorMessage: t({
                message: "We had some trouble connecting. Please try again.",
                id: "connect_modal.error_message",
              }),
              torusText: t({
                message: "or continue with",
                id: "connectModal.continue",
              }),
              titles: {
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
              },
            })}
        </div>
      </div>

      {props.children}

      <Footer className={styles.fullWidthFooter} />
    </div>
  );
};
