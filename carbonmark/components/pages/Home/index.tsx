import { cx } from "@emotion/css";
import {
  ButtonPrimary,
  CarbonmarkLogo,
  GridContainer,
  Section,
  Text,
} from "@klimadao/lib/components";
import { Project } from "@klimadao/lib/types/carbonmark";
import { t } from "@lingui/macro";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Category } from "components/Category";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Navigation } from "components/shared/Navigation";
import { Vintage } from "components/Vintage";
import { formatBigToPrice } from "lib/formatNumbers";

import { useResponsive } from "hooks/useResponsive";
import * as styles from "./styles";

export interface Props {
  projects?: Project[];
}

export const Home: NextPage<Props> = (props) => {
  const { locale } = useRouter();
  const { isMobile } = useResponsive();
  return (
    <GridContainer>
      <PageHead
        title={t`Carbonmark.com`}
        mediaTitle={t`Carbonmark | Universal Carbon Market`}
        metaDescription={t`The open platform for digital carbon.`}
      />
      <Section className={styles.hero}>
        <Navigation transparent activePage="Home" />
        <div className="stack">
          <Text t="h1" as="h1">
            The Universal Carbon Marketplace.
          </Text>
          <Text t="body1" as="h2">
            Buy, sell, and offset any certified carbon offset project.
            Transparent, open-source, & barrier-free.
          </Text>
          <ButtonPrimary
            label="View Projects"
            className={styles.browseButton}
          />
        </div>
      </Section>
      <Section variant="gray" className={styles.section}>
        <div className="stack">
          <Text t="h2" as="h2">
            Featured Projects
          </Text>
          <div className={cx(styles.list, isMobile ? styles.scroller : {})}>
            <div className="card-wrapper">
              {props?.projects?.slice(0, 3)?.map((project, idx) => (
                <div key={`project-${idx}`} className={styles.card}>
                  <div className={styles.cardImage}>
                    {!!project.category?.id && (
                      <ProjectImage category={project.category.id} />
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <Text t="body3" as="h4">
                      {formatBigToPrice(project.price, locale)}
                    </Text>
                    <Text t="caption" as="h5">
                      {project.name || "! MISSING PROJECT NAME !"}
                    </Text>
                    <Text t="body8">
                      {project.description ||
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor non sagittis egestas sellus ..."}
                    </Text>
                    <div className={styles.tags}>
                      {!!project.category?.id && (
                        <Category category={project.category.id} />
                      )}
                      {project.isPoolProject && (
                        <SyncOutlinedIcon fontSize="large" />
                      )}
                      <Vintage vintage={project.vintage} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ButtonPrimary
            label="Browse All Projects"
            className={styles.browseButton}
          />
        </div>
      </Section>
      <Section variant="white" className={styles.section}>
        <div className="stack">
          <Text t="h2" as="h2">
            For Offsetting
          </Text>
          <Text t="body1" className="description">
            Maximize your impact-per-dollar with low fees and market-rate
            pricing. Explore an ever-growing selection of 100% verified
            projects.
          </Text>
          <Text t="body1" className="description">
            Offset now, or buy now and offset later. Take full ownership of your
            carbon assets.
          </Text>
          <div className={styles.list}>
            <div className={styles.step}>
              <Text t="body3" as="h4">
                Step 1
              </Text>
              <div className="card">
                <TravelExploreOutlinedIcon fontSize="large" />
                <Text t="body3" className="card-info">
                  Choose a project and quantity
                </Text>
              </div>
            </div>
            <div className={styles.step}>
              <Text t="body3" as="h4">
                Step 2
              </Text>
              <div className="card">
                <PaymentOutlinedIcon fontSize="large" />
                <Text t="body3" className="card-info">
                  Create profile and connect wallet
                </Text>
              </div>
            </div>
            <div className={styles.step}>
              <Text t="body3" as="h4">
                Step 3
              </Text>
              <div className="card">
                <ParkOutlinedIcon fontSize="large" />
                <Text t="body3" className="card-info">
                  Offset instantly, or send the project tokens to your wallet
                </Text>
              </div>
            </div>
          </div>
          <Text t="h3" className="coming-soon">
            Coming Soon: Zero-fees when <span>paying with KLIMA</span>
          </Text>
        </div>
      </Section>
      <Section
        variant="darkgray"
        className={cx(styles.section, styles.sectionDark)}
      >
        <div className="stack">
          <Text t="h2" as="h2">
            For Sellers
          </Text>
          <Text t="body1" className="description">
            Create your own carbon storefront. Sell directly to organizations
            and individuals alike.
          </Text>
          <Text t="body1" className="description">
            Unprecedented transparency across the digital carbon market.
          </Text>
          <div className={styles.list}>
            <div className={styles.step}>
              <Text t="body3" as="h4">
                Step 1
              </Text>
              <div className="card">
                <ControlPointDuplicateOutlinedIcon fontSize="large" />
                <Text t="body3" className="card-info">
                  Tokenize your projects using a supported bridge (C3, Toucan).
                </Text>
              </div>
            </div>
            <div className={styles.step}>
              <Text t="body3" as="h4">
                Step 2
              </Text>
              <div className="card">
                <PersonOutlinedIcon fontSize="large" />
                <Text t="body3" className="card-info">
                  Create a seller profile.
                </Text>
              </div>
            </div>
            <div className={styles.step}>
              <Text t="body3" as="h4">
                Step 3
              </Text>
              <div className="card">
                <MouseOutlinedIcon fontSize="large" />
                <Text t="body3" className="card-info">
                  List your projects for sale in just a few clicks.
                </Text>
              </div>
            </div>
          </div>
          <ButtonPrimary label="Sell Carbon" className={styles.browseButton} />
        </div>
      </Section>
      <Section variant="white" className={styles.sectionImage}>
        <div className="carbon-traders">
          <div className="pattern-bg">
            <div>
              <Text t="h2" as="h2">
                For Carbon Traders
              </Text>
              <ul>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Compare prices across all sellers and trading pools.
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Real-time price and transaction data powered by the
                  blockchain.
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  List and sell for zero fees.
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  No barrier to entry -- all you need is a Web3 wallet.
                </li>
              </ul>
            </div>
          </div>
          <div className="image-bg" />
        </div>
      </Section>
      <Section variant="white" className={styles.sectionImage}>
        <div className="project-devs">
          <div className="image-bg" />
          <div className="pattern-bg">
            <div>
              <Text t="h2" as="h2">
                For Project Developers
              </Text>
              <ul>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Efficiently connect directly with buyers.
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Get paid immediately, transactions are resolved in seconds.
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Support for major registries and carbon bridges.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
      <Section
        variant="darkgray"
        style={{ background: "#2a2a2a" }}
        className={cx(styles.sectionAlt, styles.sectionDark)}
      >
        <div className="stack">
          <Text t="h2" as="h2">
            Powered By <CarbonmarkLogo color="#fff" />
          </Text>
          <Text t="body1" className="description">
            KlimaDAO has incentivized millions of dollars of liquidity for key
            carbon pools. KlimaDAO lets you buy carbon-backed KLIMA tokens to
            get a stake in growing on-chain carbon markets. Earn daily rewards
            on your KLIMA holdings as the carbon market and DAO treasury grows.
          </Text>
        </div>
      </Section>
      <Section variant="white" className={styles.sectionAlt}>
        <div className="stack">
          <Text t="h2" as="h2">
            Governed by you
          </Text>
          <Text t="body1" className="description" style={{ marginBottom: 0 }}>
            KLIMA token holders participate in the future of the on-chain carbon
            market.
          </Text>
        </div>
      </Section>
      <Footer />
    </GridContainer>
  );
};
