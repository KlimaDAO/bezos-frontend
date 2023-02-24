import { cx } from "@emotion/css";
import {
  ButtonPrimary,
  CircleLogo,
  GridContainer,
  LogoWithClaim,
  OffsetraLogo,
  SCBLogo,
  Section,
  Text,
} from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import ParkOutlinedIcon from "@mui/icons-material/ParkOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import Image from "next/image";

import { Project } from "lib/types/carbonmark";
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
            The largest selection of digital carbon credits worldwide. Buy,
            sell, and retire digital carbon from any project instantly with 0%
            transaction fee.
          </Text>
          <ButtonPrimary label="Get Started" className={styles.browseButton} />
        </div>
      </Section>
      <Section className={cx(styles.section, styles.partnersSection)}>
        <div className="stack">
          <div className="">
            <Text t="h2" as="h2">
              Our Partners
            </Text>
            <div className="partners">
              <CircleLogo height="50" />
              <SCBLogo height="50" />
              <OffsetraLogo height="50" />
            </div>
          </div>
          <Text t="h2" as="h2">
            Over 20 million verified digital carbon credits from hundreds of
            projects, $4 billion in trade to date
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
                        "The Bull Run project is designed to protect 4,650 ha of tropical pine forests, grasslands, and mature humid broadleaf forest in the Cayo District of Belize, Central America. This area, which lies 23.5 km east-southeast of San Ignacio, Belize, includes 15 IUCN listed endangered species! The property consists primarily of a tropical pine savannah with a small component of tropical mixed broadleaf forest. Several studies involving bird conservation and protection on the property have been undertaken in the years since the project started, including a study on the threatened Orange-breasted falcons."}
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
            label="Browse Projects"
            className={styles.browseButton}
          />
        </div>
      </Section>
      <Section className={cx(styles.section, styles.offsetCarbonSection)}>
        <div className="stack">
          <div style={{ flex: "1" }}>
            <Text t="h2" as="h2">
              Buy or Offset Carbon
            </Text>
            <Text t="body1" className="description">
              Maximize your climate impact.
            </Text>
            <Text t="body1" className="description">
              Carbonmark doesn't charge an additional transaction fee and offers
              best-in-the-market pricing. Explore hundreds of verified carbon
              projects.
            </Text>
            <Text t="body1" className="description">
              Offset now, or acquire carbon to offset later- you decide what to
              do when you take ownership of your carbon assets.
            </Text>
            <ButtonPrimary
              label="Browse Projects"
              className={styles.browseButton}
            />
          </div>
          <div style={{ flex: "1" }}>
            <div className={styles.list}>
              <div className={styles.step}>
                <div className="card">
                  <Text t="body3" as="h4">
                    Step 1
                  </Text>
                  <TravelExploreOutlinedIcon fontSize="large" />
                  <Text t="body3" className="card-info">
                    Choose a project and quantity
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <Text t="body3" as="h4">
                    Step 2
                  </Text>
                  <PaymentOutlinedIcon fontSize="large" />
                  <Text t="body3" className="card-info">
                    Create profile and get connected
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <Text t="body3" as="h4">
                    Step 3
                  </Text>
                  <ParkOutlinedIcon fontSize="large" />
                  <Text t="body3" className="card-info">
                    Offset instantly, or purchase and hold digital carbon
                  </Text>
                </div>
              </div>
            </div>
            {/* <Text t="h3" className="coming-soon">
              Coming Soon: Zero-fees when <span>paying with KLIMA</span>
            </Text> */}
          </div>
        </div>
      </Section>
      <Section className={cx(styles.section, styles.sellCarbonSection)}>
        <div className="stack">
          <div style={{ flex: "1.35" }}>
            <div className={styles.list}>
              <div className={styles.step}>
                <div className="card">
                  <Text t="body3" as="h4">
                    Step 1
                  </Text>
                  <ControlPointDuplicateOutlinedIcon fontSize="large" />
                  <Text t="body3" className="card-info">
                    Digitize your carbon by using a supported bridge.
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <Text t="body3" as="h4">
                    Step 2
                  </Text>
                  <PersonOutlinedIcon fontSize="large" />
                  <Text t="body3" className="card-info">
                    Create a seller profile.
                  </Text>
                </div>
              </div>
              <div className={styles.step}>
                <div className="card">
                  <Text t="body3" as="h4">
                    Step 3
                  </Text>
                  <MouseOutlinedIcon fontSize="large" />
                  <Text t="body3" className="card-info">
                    List your projects for sale in just a few clicks.
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              flex: "1",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text t="h2" as="h2">
              Sell Carbon
            </Text>
            <Text t="body1" className="description">
              Create your own carbon storefront. Sell directly to organizations
              and individuals alike.
            </Text>
            <Text t="body1" className="description">
              Unprecedented transparency across the digital carbon market.
            </Text>
            <ButtonPrimary
              label="Create Profile"
              className={styles.browseButton}
            />
          </div>
        </div>
      </Section>
      <Section className={styles.sectionImage}>
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
                  0% listing fee.
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  All assets sourced from major registries.
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Instant settlement of all trades.
                </li>
              </ul>
            </div>
          </div>
          <div className="image-bg" />
        </div>
      </Section>
      <Section className={styles.sectionImage}>
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
                  Get paid immediately, transactions are resolved in seconds.
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  List and sell for free.
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  No barriers to entry for verified carbon projects.
                </li>
                <li>
                  <CheckCircleOutlineOutlinedIcon fontSize="large" />
                  Sell your digital carbon directly to buyers.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
      <Section className={cx(styles.section, styles.learnMoreSection)}>
        <div className="stack">
          <Text t="h2" as="h2">
            Learn More
          </Text>
          <div className={cx(styles.list, isMobile ? styles.scroller : {})}>
            <div className="card-wrapper">
              <div className={styles.card}>
                <div className={styles.cardImage}>
                  <Image
                    fill
                    alt="Article"
                    src="/article-bg.png"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={cx(styles.cardContent, "content")}>
                  <Text t="caption" as="h5">
                    Introducing carbonmark article
                  </Text>
                  <Text t="body8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris tempor non sagittis egestas sellus ...
                  </Text>
                  <Text t="body8" as="h6">
                    Read more
                  </Text>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardImage}>
                  <Image
                    fill
                    alt="FAQs"
                    src="/faq-bg.png"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={cx(styles.cardContent, "content")}>
                  <Text t="caption" as="h5">
                    FAQs
                  </Text>
                  <Text t="body8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris tempor non sagittis egestas sellus ...
                  </Text>
                  <Text t="body8" as="h6">
                    Read more
                  </Text>
                </div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardImage}>
                  <Image
                    fill
                    alt="Role"
                    src="/role-bg.png"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={cx(styles.cardContent, "content")}>
                  <Text t="caption" as="h5">
                    Carbonmark's role
                  </Text>
                  <Text t="body8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris tempor non sagittis egestas sellus ...
                  </Text>
                  <Text t="body8" as="h6">
                    Read more
                  </Text>
                </div>
              </div>
            </div>
          </div>
          <ButtonPrimary label="Resources" className={styles.browseButton} />
        </div>
      </Section>
      <Section className={cx(styles.section, styles.poweredBySection)}>
        <div className="stack">
          <Text t="h2" as="h2">
            Powered by
            <LogoWithClaim />
          </Text>
          <Text t="body1" className="description">
            KlimaDAO provides the transparent, neutral, and public digital
            carbon infrastructure to accelerate climate finance on a global
            scale.
          </Text>
        </div>
      </Section>
      <Footer />
    </GridContainer>
  );
};
