import { ButtonPrimary, Spinner } from "@klimadao/lib/components";
import { Trans } from "@lingui/macro";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  isLoading: boolean;
  onLogin: () => void;
}

export const LoginCard: FC<Props> = (props) => {
  return (
    <Card>
      <div className={styles.login}>
        <Text t="h3" className={styles.title}>
          <LoginOutlinedIcon />
          <Trans id="user.login.title">
            Please login or connect your wallet
          </Trans>
        </Text>
        <Text t="body1">
          <Trans id="user.login.description">
            This feature is available only to users who are logged in. You can
            log in or create an account via the button below.
          </Trans>
        </Text>
        {props.isLoading && (
          <div className={styles.fullWidth}>
            <Spinner />
            <Text className={styles.redirecting}>
              <Trans>Loading...</Trans>
            </Text>
          </div>
        )}
        {!props.isLoading && (
          <ButtonPrimary
            label={<Trans>Login / Connect</Trans>}
            onClick={props.onLogin}
          />
        )}
      </div>
    </Card>
  );
};
