import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const NICKNAME_REGEX = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;

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
  const nickname = watch("nickname");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const close = () => {
    reset();
    setOpen(false);
  };

  const disabled = !(isCreateAccount
    ? !!nickname &&
      nickname.length >= 2 &&
      nickname.length <= 16 &&
      NICKNAME_REGEX.test(nickname) &&
      (!email || (!!email && EMAIL_REGEX.test(email))) &&
      !!password &&
      password.length >= 8 &&
      !!confirmPassword &&
      confirmPassword === password
    : (!email || (!!email && EMAIL_REGEX.test(email))) &&
      !!password &&
      password.length >= 8);

  return (
    <StyledDialog
      buttons={
        <button
          type="submit"
          className={`form-button-submit`}
          disabled={disabled}
        >
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
            {t("register.label")}
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
                    id="email"
                    {...register("email", {
                      required: true,
                      pattern: EMAIL_REGEX,
                    })}
                    className={`form-input-icon`}
                    placeholder={t("register.email")}
                    type="email"
                  />
                  <IconEmail className={`form-input-icon-icon`} />
                </div>
                {errors.email?.type === "pattern" && (
                  <div className={`form-error`}>Email is not valid</div>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    id="nickname"
                    {...register("nickname", {
                      required: true,
                      pattern: NICKNAME_REGEX,
                      maxLength: 20,
                      minLength: 2,
                    })}
                    className={`form-input-icon`}
                    placeholder={t("register.nickname")}
                    minLength={2}
                    maxLength={16}
                  />
                  <IconUser className={`form-input-icon-icon`} />
                </div>
                {errors.nickname?.type === "minLength" && (
                  <div className={`form-error`}>
                    Username must be between 2 and 16 characters
                  </div>
                )}
                {errors.nickname?.type === "pattern" && (
                  <div className={`form-error`}>
                    Letters, numbers, dashes, and underscores only
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>
              <div className="relative">
                <input
                  id="email"
                  {...register("email", {
                    required: true,
                    pattern: EMAIL_REGEX,
                  })}
                  className={`form-input-icon`}
                  placeholder={t("login.email")}
                  type="email"
                />
                <IconEmail className={`form-input-icon-icon`} />
              </div>
              {errors.email?.type === "pattern" && (
                <div className={`form-error`}>Email is not valid</div>
              )}
            </div>
          )}

          {isCreateAccount ? (
            <>
              <div>
                <div className="relative">
                  <input
                    id="password"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                    className={`form-input-password`}
                    placeholder={t("register.password")}
                    type={showPassword ? "text" : "password"}
                    minLength={8}
                  />
                  <ShowPasswordButton
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
                {errors.password?.type === "minLength" && (
                  <div className={`form-error`}>
                    Password must be at least 8 characters
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
                    placeholder={t("register.passwordConfirm")}
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
