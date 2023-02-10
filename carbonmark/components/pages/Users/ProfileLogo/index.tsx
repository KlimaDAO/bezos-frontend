import { FC, useEffect, useState } from "react";

import { cx } from "@emotion/css";
import Image from "next/image";

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import userLogo from "public/user_default_avatar.png";

import * as styles from "./styles";

type Props = {
  isCarbonmarkUser: boolean;
  profileImgUrl?: string;
  className?: string;
  hasBorder?: boolean;
};

export const ProfileLogo: FC<Props> = (props) => {
  const [hasValidImageUrl, setHasValidImageUrl] = useState(
    !!props.profileImgUrl
  );
  useEffect(() => {
    if (props.profileImgUrl) {
      setHasValidImageUrl(true);
    }
  }, [props.profileImgUrl]);

  const className = cx(styles.profileLogo, props.className, {
    hasBorder: props.hasBorder,
  });

  return (
    <div className={className}>
      {props.isCarbonmarkUser ? (
        hasValidImageUrl ? (
          <img
            src={props.profileImgUrl}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              setHasValidImageUrl(false);
            }}
            alt="Carbonmark User Logo"
            className="imgUrl"
            width={50}
            height={50}
          />
        ) : (
          <Image
            src={userLogo}
            alt="Carbonmark User Logo"
            width={50}
            height={50}
          />
        )
      ) : (
        <PermIdentityOutlinedIcon className="notRegisteredSvg" />
      )}
    </div>
  );
};
