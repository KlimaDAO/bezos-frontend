import { Trans } from "@lingui/macro";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Text } from "components/Text";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { HistoryContext } from "pages/_app";
import userLogo from "public/user_default_avatar.png";
import { FC, useContext, useEffect, useState } from "react";

import * as styles from "./styles";

type Props = {
  userName: string;
  description?: string;
  isCarbonmarkUser: boolean;
};

export const ProfileHeader: FC<Props> = (props) => {
  const router = useRouter();
  const historyContext = useContext(HistoryContext);
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    setShowBackButton(historyContext?.[0] !== router.asPath);
  }, [historyContext]);

  return (
    <>
      {!!showBackButton && (
        <CarbonmarkButton
          label={
            <div className={styles.backToResults}>
              <KeyboardArrowLeft className="arrow" />
              <Trans id="profile.back_to_project_details">
                Back to project details
              </Trans>
            </div>
          }
          onClick={() => router.back()}
        />
      )}
      <div className={styles.profileHeader}>
        <div className={styles.profileLogo}>
          {props.isCarbonmarkUser ? (
            <Image
              src={userLogo}
              alt="Carbonmark User Logo"
              width={50}
              height={50}
            />
          ) : (
            <PermIdentityOutlinedIcon className="notRegisteredSvg" />
          )}
        </div>
        <div className={styles.profileText}>
          <Text t="h4">{props.userName}</Text>

          {!props.isCarbonmarkUser && (
            <Text t="body1">
              <Trans id="profile.create_your_profile">
                Create your profile on Carbonmark and start selling
              </Trans>
            </Text>
          )}

          {props.isCarbonmarkUser && !props.description && (
            <Text t="body1">
              <Trans id="profile.edit_your_profile">
                Edit your profile to add a description
              </Trans>
            </Text>
          )}

          {props.isCarbonmarkUser && props.description && (
            <Text t="body1">{props.description}</Text>
          )}
        </div>
      </div>
    </>
  );
};
