import React, { FC, useState } from "react";
import { Trans, t } from "@lingui/macro";
import { useForm, SubmitHandler } from "react-hook-form";
import { useWeb3 } from "@klimadao/lib/utils";
import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import { InputField, TextareaField } from "components/Form";
import { loginUser, verifyUser, postUser, putUser } from "../../lib/api";
import { User } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

type Props = {
  user: {
    handle?: string;
    username?: string;
    description?: string;
  } | null;
  onSubmit: (data: User) => void;
};

const defaultValues = {
  handle: "",
  username: "",
  description: "",
};

export const editSignMessage = (nonce: string): string =>
  `Sign to authenticate ownership and edit your Klima Marketplace Profile 💚\n\nSignature nonce: ${nonce}`;

export const EditProfile: FC<Props> = (props) => {
  const isExistingUser = !!props.user?.handle;
  const { address, signer } = useWeb3();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const { register, handleSubmit, formState } = useForm<User>({
    defaultValues: { ...defaultValues, ...props.user, wallet: address },
  });

  const hasError = !isLoading && !!errorMessage;

  const onSubmit: SubmitHandler<User> = async (values: User) => {
    setErrorMessage(null);

    try {
      setIsLoading(true);

      if (!address) return;
      const loginRes = await loginUser(address);

      if (!signer) return;
      const signature = await signer.signMessage(
        editSignMessage(loginRes.nonce)
      );

      const verifyResponse = await verifyUser({
        address,
        signature: signature,
      });

      let response;

      if (isExistingUser) {
        response = await putUser({
          user: values,
          token: verifyResponse.token,
        });
      } else {
        response = await postUser({
          user: values,
          token: verifyResponse.token,
        });
      }

      if (response) {
        props.onSubmit(response);
      } else {
        setIsLoading(false);
        setErrorMessage(
          t({
            id: "marketplace.user.edit.form.error.api_error",
            message:
              "There was an error with the Request API. Please try again",
          })
        );
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      if (error.code === 4001) {
        setErrorMessage(
          t({
            id: "marketplace.user.edit.form.error.user_rejected",
            message: "You chose to reject the transaction",
          })
        );
      } else {
        setErrorMessage(
          t({
            id: "marketplace.user.edit.form.error.general_error",
            message: "Something went wrong. Please try again",
          })
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formContainer}>
        <InputField
          id="wallet"
          inputProps={{
            type: "hidden",
            ...register("wallet"),
          }}
          label={"wallet address"}
          hideLabel
        />
        <InputField
          id="handle"
          inputProps={{
            disabled: !!props.user?.handle,
            placeholder: t({
              id: "marketplace.user.edit.form.input.handle.placeholder",
              message: "Your unique handle",
            }),
            type: "text",
            ...register("handle", { required: true }),
          }}
          label={t({
            id: "marketplace.user.edit.form.input.handle.label",
            message: "Handle (not changeable later! Choose wisely)",
          })}
          errorMessage={formState.errors.handle && "Handle is required"}
        />
        <InputField
          id="username"
          inputProps={{
            disabled: isLoading,
            placeholder: t({
              id: "marketplace.user.edit.form.input.username.placeholder",
              message: "Your display name",
            }),
            type: "text",
            ...register("username", { required: true }),
          }}
          label={t({
            id: "marketplace.user.edit.form.input.username.label",
            message: "Display Name",
          })}
          errorMessage={formState.errors.username && "Display Name is required"}
        />
        <TextareaField
          id="description"
          textareaProps={{
            disabled: isLoading,
            placeholder: t({
              id: "marketplace.user.edit.form.input.description.placeholder",
              message: "Description",
            }),
            ...register("description"),
          }}
          label={t({
            id: "marketplace.user.edit.form.input.description.label",
            message: "About",
          })}
        />
        {isLoading && <Spinner />}
        {hasError && (
          <Text t="caption" className="error">
            There was an error with the API. Please try again
          </Text>
        )}
        {!isLoading && (
          <ButtonPrimary
            label={
              <Trans id="marketplace.profile.edit_modal.submit">
                Save Changes
              </Trans>
            }
            onClick={handleSubmit(onSubmit)}
            disabled={!formState.isDirty}
          />
        )}
      </div>
    </form>
  );
};