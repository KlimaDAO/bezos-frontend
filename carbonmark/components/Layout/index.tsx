import { cx } from "@emotion/css";
import { ButtonPrimary, CarbonmarkLogo } from "@klimadao/lib/components";
import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import Menu from "@mui/icons-material/Menu";
import { ProjectsController } from "components/pages/Project/ProjectsController";
import { InvalidNetworkModal } from "components/shared/InvalidNetworkModal";
import { useResponsive } from "hooks/useResponsive";
import { connectErrorStrings } from "lib/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode, useState } from "react";
import { Footer } from "../Footer";
import { NavDrawer } from "./NavDrawer";
import * as styles from "./styles";

// dynamic import for ThemeToggle as its reads the document and localStorage of Browser
// see https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr

// const ThemeToggle = dynamic(() => import("../shared/ThemeToggle"), {
//   ssr: false,
// });

type Props = {
  userAddress?: string;
  profileButton?: JSX.Element;
  children: ReactNode;
};

export const Layout: FC<Props> = (props: Props) => {
  const { address, renderModal, isConnected, toggleModal, disconnect } =
    useWeb3();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isDesktop, isMobile } = useResponsive();
  /**
   * Only show the projects controller if on the Projects Page
   * @todo lift this logic to projects/index.tsx and pass the child components as props to Layout
   */
  const isProjects = useRouter().pathname === "/projects";

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
          <Link href="/" className={styles.mobileLogo} data-mobile-only>
            <CarbonmarkLogo />
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

          {/* <ChangeLanguageButton /> */}
          {/* {isDesktop && <ThemeToggle />} */}
          {/* Desktop controller */}
          {isProjects && isDesktop && (
            <ProjectsController className={styles.projectsController} />
          )}

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
              errors: connectErrorStrings,
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
          <InvalidNetworkModal />
        </div>
        {isProjects && isMobile && (
          <ProjectsController className={styles.mobileProjectsController} />
        )}

        {props.children}

        <Footer className={styles.fullWidthFooter} />
      </div>
    </div>
  );
};