import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { usernameRegex } from "server-prod/src/util/text/usernameRegex";
import { useLoginDialog } from "../hooks/useLoginDialog";
import StyledDialog from "./ui/dialog/StyledDialog";
import {
  IconEmail,
  IconUser,
  IconUserToServerArrow,
  IconX,
} from "./ui/icons/Icons";
import ShowPasswordButton from "./ui/ShowPasswordButton";
import { VectorLogo } from "./ui/vectors/VectorLogo";

export default function LoginDialog() {
  const { t } = useTranslation("login-dialog");

  const {
    loginDialog: open,
    setLoginDialog: setOpen,
    createAccount: isCreateAccount,
    setCreateAccount: setCreateAccount,
  } = useLoginDialog();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  });

  const email = watch("email");
  const username = watch("username");
  const usernameOrEmail = watch("usernameOrEmail");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const close = () => {
    reset();
    setOpen(false);
  };

  return (
    <StyledDialog
      buttons={
        <button type="submit" className={`form-button-submit`}>
          <IconUserToServerArrow className="w-5 h-5" />
        </button>
      }
      isOpen={open}
      onClose={close}
      closeOnOverlayClick={false}
      onSubmit={() => {}}
    >
      <div className="rounded-t-lg bg-gradient-to-r from-red-400 to-indigo-600 h-2" />
      <div className="px-5 pt-2 pb-9 text-left">
        <div className="pb-4 flex items-center">
          <div
            onClick={() => {
              if (isCreateAccount) {
                setCreateAccount(false);
                reset();
              }
            }}
            className={`text-sm cursor-pointer mr-3 py-3 border-b-2 inline-flex items-center justify-center px-3 ${
              isCreateAccount
                ? "border-transparent text-secondary"
                : "dark:border-gray-300 text-primary"
            }`}
          >
            {t("login.label")}
          </div>

          <div
            onClick={() => {
              if (!isCreateAccount) {
                setCreateAccount(true);
                reset();
              }
            }}
            className={`text-sm cursor-pointer py-3 border-b-2 inline-flex items-center justify-center px-3 ${
              isCreateAccount
                ? "dark:border-gray-300 text-primary"
                : "border-transparent text-secondary"
            }`}
          >
            {t("createAccount.label")}
          </div>

          <div className="ml-auto">
            <VectorLogo className="h-8 text-secondary" />
          </div>
          <IconX
            className="ml-5 w-5 h-5 text-tertiary highlightable"
            onClick={() => close()}
          />
        </div>

        <div className="space-y-4">
          {isCreateAccount ? (
            <>
              <div>
                <div className="relative">
                  <input
                    id="username"
                    {...register("username", {
                      required: true,
                      pattern: usernameRegex,
                      maxLength: 20,
                      minLength: 3,
                    })}
                    className={`form-input-icon`}
                    placeholder={t("createAccount.name")}
                    minLength={3}
                    maxLength={20}
                  />
                  <IconUser className={`form-input-icon-icon`} />
                </div>
                {errors.username?.type === "minLength" && (
                  <div className={`form-error`}>
                    Username must be between 3 and 20 characters
                  </div>
                )}
                {errors.username?.type === "pattern" && (
                  <div className={`form-error`}>
                    Letters, numbers, dashes, and underscores only
                  </div>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    id="email"
                    {...register("email", {
                      validate: {
                        email: (value) =>
                          !value || isEmail(value) || "Invalid email",
                      },
                    })}
                    className={`form-input-icon`}
                    placeholder={t("createAccount.email")}
                    type="email"
                  />
                  <IconEmail className={`form-input-icon-icon`} />
                </div>
                {errors.email?.type === "email" && (
                  <div className={`form-error`}>{errors.email.message}</div>
                )}
              </div>
            </>
          ) : (
            <input
              id="usernameOrEmail"
              {...register("usernameOrEmail", {
                shouldUnregister: true,
              })}
              className={`form-input`}
              placeholder={t("login.name")}
            />
          )}

          {isCreateAccount ? (
            <>
              <div>
                <div className="relative">
                  <input
                    id="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    className={`form-input-password`}
                    placeholder={t("createAccount.password")}
                    type={showPassword ? "text" : "password"}
                    minLength={6}
                  />
                  <ShowPasswordButton
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
                {errors.password?.type === "minLength" && (
                  <div className={`form-error`}>
                    Password must be at least 6 characters
                  </div>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: true,
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { password } = getValues();
                          return password === value || "Passwords do not match";
                        },
                      },
                    })}
                    className={`form-input-password`}
                    placeholder={t("createAccount.passwordConfirm")}
                    type={showPassword ? "text" : "password"}
                  />
                  <ShowPasswordButton
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
                {!!password &&
                  !!confirmPassword &&
                  password !== confirmPassword && (
                    <div className={`form-error`}>Passwords do not match</div>
                  )}
              </div>
            </>
          ) : (
            <div className="relative">
              <input
                id="password"
                {...register("password", { required: true })}
                className={`form-input`}
                placeholder={t("login.password")}
                type={showPassword ? "text" : "password"}
              />
              <ShowPasswordButton
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          )}
        </div>
      </div>
    </StyledDialog>
  );
}
