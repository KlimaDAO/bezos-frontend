import { Text } from "@klimadao/lib/components";
import { FC } from "react";
import Image from "next/legacy/image";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import userLogo from "public/marketplace/marketplace_user.png";

import * as styles from "./styles";

type Props = {
  userName: string;
  description?: string;
  isMarketplaceUser: boolean;
};

export const ProfileHeader: FC<Props> = (props) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileLogo}>
        {props.isMarketplaceUser ? (
          <Image
            src={userLogo}
            alt="Marketplace User Logo"
            width={50}
            height={50}
          />
        ) : (
          <PermIdentityOutlinedIcon className="notRegisteredSvg" />
        )}
      </div>
      <div className={styles.profileText}>
        <Text t="h3">{props.userName}</Text>
        {props.description && <Text t="caption">{props.description}</Text>}
      </div>
    </div>
  );
};