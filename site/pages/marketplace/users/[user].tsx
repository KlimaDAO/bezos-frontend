import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ethers } from "ethers";

import { Users } from "components/pages/Marketplace/Users";
import { loadTranslation } from "lib/i18n";
import { getIsDomainInURL } from "lib/getIsDomainInURL";
import { getAddressByDomain } from "lib/getAddressByDomain";
import { getDomainByAddress } from "lib/getDomainByAddress";

import { getMarketplaceUser } from "@klimadao/lib/utils";
import { User } from "@klimadao/lib/types/marketplace";

interface Params extends ParsedUrlQuery {
  user: string;
}

interface PageProps {
  userAddress: string;
  userDomain: string | null;
  marketplaceUser: User | null;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  const { params, locale } = ctx;

  if (!params || !params?.user) {
    throw new Error("No matching params found");
  }

  try {
    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    const userInUrl = params.user;
    const isDomainInURL = getIsDomainInURL(userInUrl);
    const isValidAddress = !isDomainInURL && ethers.utils.isAddress(userInUrl);

    if (!isDomainInURL && !isValidAddress) {
      throw new Error("Not a valid user address");
    }

    const nameserviceDomain =
      !isDomainInURL && (await getDomainByAddress(userInUrl));

    // redirect now to this page again with nameserviceDomain in URL
    if (nameserviceDomain) {
      return {
        redirect: {
          destination: `/marketplace/users/${nameserviceDomain}`,
          statusCode: 301,
        },
      };
    }

    let userAddress: string;
    if (isDomainInURL) {
      userAddress = await getAddressByDomain(userInUrl); // this fn should throw if it fails to resolve
    } else {
      userAddress = userInUrl;
    }

    let marketplaceUser: User | null = null;

    const userData = await getMarketplaceUser(userAddress);
    // API returns object on 404 not found
    if (userData?.handle) {
      marketplaceUser = userData;
    }

    return {
      props: {
        userAddress,
        userDomain: isDomainInURL ? userInUrl : null,
        marketplaceUser,
        translation,
      },
      revalidate: 240,
    };
  } catch (e) {
    console.error("Failed to generate Marketplace Users Page", e);
    return {
      notFound: true,
      revalidate: 240,
    };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Users;
