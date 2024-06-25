"use client";

import Authentication from "@/app/api/user/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { Link } from "@nextui-org/react";
import React from "react";
import { Locale } from "@/i18n.config";
import { InputLoadingBtn } from "@/app/components/user/inputloadingbtn";

interface ApiResponse {
  success: boolean;
  result?: string; // Adjust the type based on the actual data structure
  error?: string;
}

const AuthData = {
  ka: {
    regData: {
      title: "რეგისტრაცია",
      username: "სახელი",
      email: "ელ-ფოსტა",
      password: "პაროლი",
      confirmPassword: "პაროლის დადასტურება",
      button: "რეიგსტრაცია",
    },
    loginData: {
      title: "შესვლა",
      email: "ელ-ფოსტა",
      password: "პაროლი",
      button: "შესვლა",
    },
  },
  en: {
    regData: {
      title: "Sign Up",
      username: "UserName",
      email: "Email",
      password: "Password",
      confirmPassword: "ConfirmPassword",
      button: "Sign Up",
    },
    loginData: {
      title: "Sign in",
      email: "Email",
      password: "Password",
      button: "Sign in",
    },
  },
};

export default function AuthModals({
  isOpen,
  onClose,
  lang,
}: {
  isOpen: boolean;
  onClose: () => void;
  lang: Locale;
}) {
  const { regData, loginData } = AuthData[lang];
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [registrationState, setRegistrationState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [regError, setRegError] = useState("");

  const [regUserNameError, setRegUserNameError] = useState("");
  const [regEmailError, setRegEmailError] = useState("");

  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [regRegPasswordError, setRegPasswordError] = useState("");

  const [Logloader, setLogLoader] = useState(false);

  const [Regusernameloader, setRegusernameLoader] = useState(false);

  const [Regemailloader, setRegemailLoader] = useState(false);

  const [regUserNameHasBlurred, setRegUserNameHasBlurred] = useState(false);

  const [regEmailHasBlurred, setRegEmailHasBlurred] = useState(false);

  const [logEmailHasBlurred, setEmailLogHasBlurred] = useState(false);

  const auth = Authentication();

  const handleLogin = async () => {
    setIsLoading(true);
    if (loginState.email === "") {
      setLoginEmailError(
        lang == "ka"
          ? "შეავსე ელ-ფოსტის ველი"
          : "Please fill in the Email field"
      );
      setIsLoading(false);
      return;
    }
    if (loginState.password === "") {
      setLoginPasswordError(
        lang == "ka"
          ? "შეავსე პაროლის ველი"
          : "Please fill in the Password field"
      );
      setIsLoading(false);
      return;
    }
    const response = (await auth.handleLogin(
      loginState.email,
      loginState.password
    )) as ApiResponse;

    if (!response.success) {
      setLoginError(response.result || "login failed");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      onCloseLogin();
    }
  };

  const handleRegisterOAuth = async (provider: string) => {
    const callbackUrl = "/user/auth/oauth";

    await signIn(provider, { callbackUrl });
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    if (registrationState.username === "") {
      setRegUserNameError(
        lang === "ka"
          ? "შეავსე სახელი ველი"
          : "Please fill in the UserName field"
      );
      setIsLoading(false);
      return;
    }
    if (registrationState.email === "") {
      setRegEmailError(
        lang == "ka" ? "შეავსე ელ-ფოსტა ველი" : "Please fill in the Email field"
      );
      setIsLoading(false);
      return;
    }
    if (registrationState.password === "") {
      setRegError(
        lang == "ka"
          ? "შეავსე პაროლის ველი"
          : "Please fill in the Password field"
      );
      setIsLoading(false);
      return;
    }
    if (registrationState.confirmPassword === "") {
      setConfirmPasswordError(
        lang == "ka"
          ? "შეავსე პაროლის დადასტურების ველი"
          : "Please fill in the ConfirmPassword field"
      );
      setIsLoading(false);
      return;
    }

    var errorMessage = await auth.handleRegistration(
      registrationState.username,
      registrationState.email,
      registrationState.password,
      registrationState.confirmPassword
    );
    if (errorMessage) {
      setRegError("Registartion failed");
      setIsLoading(false);
    } else {
      var cookie = new Cookies();
      cookie.set("regEmail", registrationState.email);
      cookie.set("regUserName", registrationState.username);
      router.push("/user/auth/signup-successful");
      setIsLoading(false);
    }
  };

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const handleLoginEmailExists = async () => {
    setLoginEmailError("");
    const isEmailValid = validateEmail(loginState.email);
    try {
      if (loginState.email === "") {
        setLoginEmailError("");
        setEmailLogHasBlurred(false);
        return;
      }
      if (!isEmailValid) {
        setLoginEmailError(
          lang == "ka"
            ? "შეიყვანეთ ელ-ფოსტა სწორად"
            : "Please enter a valid email"
        );
        setEmailLogHasBlurred(false);
        return;
      }
      setEmailLogHasBlurred(true);
      setLogLoader(true);
      const response = (await auth.checkEmailLogin(
        loginState.email
      )) as ApiResponse;
      if (!response.success) {
        setLoginEmailError(response.result || "Email doesnot exists");
        setEmailLogHasBlurred(false);
      } else {
        setLogLoader(false);
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error:", error);
      // You might want to handle this case accordingly, for example, show an error message.
    }
  };

  const handleRegisterEmailExists = async () => {
    setRegEmailError("");
    const isEmailValid = validateEmail(registrationState.email);
    try {
      if (registrationState.email === "") {
        setRegEmailError("");
        setRegEmailHasBlurred(false);
        return;
      }
      if (!isEmailValid) {
        setRegEmailError(
          lang == "ka"
            ? "შეიყვანეთ ელ-ფოსტა სწორად"
            : "Please enter a valid email"
        );
        setRegEmailHasBlurred(false);
        return;
      }
      setRegEmailHasBlurred(true);
      setRegemailLoader(true);
      const response = (await auth.checkEmailRegister(
        registrationState.email
      )) as ApiResponse;

      if (!response.success) {
        setRegEmailError(response.result || "UserName already exists");
        setRegEmailHasBlurred(false);
      } else {
        setRegemailLoader(false);
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error:", error);
    }
  };

  const handleRegisterUsernameExists = async () => {
    setRegUserNameError("");
    try {
      if (registrationState.username === "") {
        setRegUserNameError("");
        setRegUserNameHasBlurred(false);
        return;
      }

      setRegUserNameHasBlurred(true);
      setRegusernameLoader(true);
      const response = (await auth.checkUserNameRegister(
        registrationState.username
      )) as ApiResponse;

      if (!response.success) {
        setRegUserNameError(response.result || "UserName already exists");
        setRegUserNameHasBlurred(false);
      } else {
        setRegusernameLoader(false);
      }
    } catch (error) {
      // Handle any errors during the API call
      console.error("Error:", error);
    }
  };
  const handleLoginPasswordClear = async () => {
    setLoginPasswordError("");
    setLoginState({ ...loginState, password: "" });
  };

  const handleRegEmailClear = async () => {
    setRegEmailError("");
    setRegistrationState({ ...registrationState, email: "" });
  };

  const handleRegUserNameClear = async () => {
    setRegUserNameError("");
    setRegistrationState({ ...registrationState, username: "" });
  };

  const handleBlurConfirmPassword = () => {
    if (registrationState.confirmPassword === "") return;

    if (registrationState.password !== registrationState.confirmPassword) {
      setConfirmPasswordError(
        lang == "ka" ? "პარლი არემთხვევა" : "Password doesnot match"
      );
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleBlurPassword = () => {
    if (registrationState.password === "") return;

    if (registrationState.password.length < 6) {
      setRegPasswordError(
        lang == "ka"
          ? "პაროლი უნდა იყოს 6 სიმბოლოზე მეტი"
          : "Passwrod must be more Then 8 Symbols"
      );
    } else {
      setRegPasswordError("");
    }
  };

  const handleRegConfirmPasswordClear = async () => {
    setConfirmPasswordError("");
    setRegistrationState({ ...registrationState, confirmPassword: "" });
  };

  const handleRegPasswordClear = async () => {
    setRegPasswordError("");
    setRegistrationState({ ...registrationState, password: "" });
  };

  const handleModeToggle = (mode: string) => {
    console.log("mode", mode);
    if (mode === "login") {
      onOpenLogin();
      onCloseSignup();
      setLoginState({ ...loginState, email: "", password: "" });
      setLoginEmailError("");
      setLoginPasswordError("");
      setLoginError("");
      setIsLoading(false);
      setEmailLogHasBlurred(false);
    } else {
      onOpenSignup();
      onCloseLogin();
      setRegistrationState({
        ...registrationState,
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
      });
      setConfirmPasswordError("");
      setRegPasswordError("");
      setRegUserNameError("");
      setRegEmailError("");
      setIsLoading(false);
      setRegUserNameHasBlurred(false);
      setRegEmailHasBlurred(false);
    }
  };

  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignup,
  } = useDisclosure();

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

  const handleCloseModal = () => {
    onClose();
    onCloseSignup();
    onCloseLogin();
  };

  useEffect(() => {
    if (isOpen) {
      onOpenLogin(); // Ensures the login modal is opened when isOpen is true
    } else {
      onCloseLogin(); // Ensures the login modal is closed when isOpen is false
    }
  }, [isOpen, onOpenLogin, onCloseLogin]);
  return (
    <>
      <header>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </header>
      {/* <Button
        className=" text-white"
        color="warning"
        variant="shadow"
        onClick={() => onOpenLogin()}
      >
        {lang === "en" ? "Start" : "დაწყება"}
      </Button> */}

      <Modal
        isOpen={isOpenLogin}
        className="dark:bg-slate-800"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onClose={handleCloseModal as () => void}
        placement="top-center"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 dark:text-white text-slate-800">
              {loginData.title}
            </ModalHeader>
            <ModalBody>
              <Input
                value={loginState.email}
                type="email"
                label={loginData.email}
                classNames={{
                  input: ["text-[16px] "],
                  inputWrapper: ["dark:bg-slate-700"],
                }}
                onChange={(e) =>
                  setLoginState({ ...loginState, email: e.target.value })
                }
                onBlur={handleLoginEmailExists}
                startContent={
                  <i className="fas fa-envelope dark:text-white text-slate-800"></i>
                }
                endContent={
                  logEmailHasBlurred ? (
                    <InputLoadingBtn loading={Logloader} success={true} />
                  ) : (
                    <></>
                  )
                }
                isInvalid={loginEmailError !== ""}
                errorMessage={loginEmailError}
              />
              <Input
                type="password"
                label={loginData.password}
                classNames={{
                  input: ["text-[16px] "],
                  inputWrapper: ["dark:bg-slate-700"],
                }}
                value={loginState.password}
                onChange={(e) =>
                  setLoginState({ ...loginState, password: e.target.value })
                }
                startContent={
                  <i className="fas fa-lock dark:text-white text-slate-800"></i>
                }
                isClearable
                onClear={handleLoginPasswordClear}
                isInvalid={loginPasswordError !== ""}
                errorMessage={loginPasswordError}
              />
              <div className="flex  px-1 justify-end">
                <Link
                  color="warning"
                  href={`${lang}/user/forgot-password`}
                  size="sm"
                >
                  Forgot password?
                </Link>
              </div>
              {loginError && (
                <div className="text-red-500 text-sm text-center font-mono">
                  {loginError}
                </div>
              )}
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <div className="flex justify-center items-center gap-2">
                <Button
                  onClick={() => handleRegisterOAuth("github")}
                  isIconOnly
                  radius="lg"
                  className="text-2xl"
                >
                  <i className="fab fa-github"></i>
                </Button>
                <Button
                  onClick={() => handleRegisterOAuth("gmail")}
                  isIconOnly
                  radius="lg"
                  className="text-xl"
                >
                  <i className="fab fa-google"></i>
                </Button>
              </div>
              <div className="flex justify-center items-center gap-2">
                <Button
                  color="default"
                  variant="flat"
                  onPress={() => handleModeToggle("Signup")}
                >
                  {regData.title}
                </Button>
                <Button
                  color="warning"
                  className="text-white"
                  isLoading={isLoading}
                  onPress={handleLogin}
                >
                  {loginData.button}
                </Button>
              </div>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenSignup}
        scrollBehavior="inside"
        placement="top-center"
        className="dark:bg-slate-800"
        onClose={handleCloseModal as () => void}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 dark:text-white text-slate-800">
            {regData.title}
          </ModalHeader>
          <ModalBody>
            <Input
              type="text"
              label={regData.username}
              classNames={{
                input: ["text-[16px] "],
                inputWrapper: ["dark:bg-slate-700"],
              }}
              value={registrationState.username}
              onChange={(e) =>
                setRegistrationState({
                  ...registrationState,
                  username: e.target.value,
                })
              }
              onBlur={handleRegisterUsernameExists}
              startContent={
                <i className="fas fa-user dark:text-white text-slate-800"></i>
              }
              endContent={
                regUserNameHasBlurred ? (
                  <InputLoadingBtn loading={Regusernameloader} success={true} />
                ) : (
                  <></>
                )
              }
              isInvalid={regUserNameError !== ""}
              errorMessage={regUserNameError}
            />
            <Input
              type="email"
              label={regData.email}
              classNames={{
                input: ["text-[16px] "],
                inputWrapper: ["dark:bg-slate-700"],
              }}
              value={registrationState.email}
              onChange={(e) =>
                setRegistrationState({
                  ...registrationState,
                  email: e.target.value,
                })
              }
              onBlur={handleRegisterEmailExists}
              startContent={
                <i className="fas fa-envelope dark:text-white text-slate-800"></i>
              }
              endContent={
                regEmailHasBlurred ? (
                  <InputLoadingBtn loading={Regemailloader} success={true} />
                ) : (
                  <></>
                )
              }
              isInvalid={regEmailError !== ""}
              errorMessage={regEmailError}
            />

            <Input
              type="password"
              label={regData.password}
              classNames={{
                input: ["text-[16px] "],
                inputWrapper: ["dark:bg-slate-700"],
              }}
              value={registrationState.password}
              onChange={(e) =>
                setRegistrationState({
                  ...registrationState,
                  password: e.target.value,
                })
              }
              startContent={
                <i className="fas fa-lock dark:text-white text-slate-800"></i>
              }
              isClearable
              onClear={handleRegPasswordClear}
              isInvalid={regRegPasswordError !== ""}
              errorMessage={regRegPasswordError}
              onBlur={handleBlurPassword}
            />
            <Input
              type="password"
              classNames={{
                input: ["text-[16px] "],
                inputWrapper: ["dark:bg-slate-700"],
              }}
              label={regData.confirmPassword}
              value={registrationState.confirmPassword}
              onChange={(e) =>
                setRegistrationState({
                  ...registrationState,
                  confirmPassword: e.target.value,
                })
              }
              onBlur={handleBlurConfirmPassword}
              startContent={
                <i className="fas fa-lock dark:text-white text-slate-800"></i>
              }
              isClearable
              onClear={handleRegConfirmPasswordClear}
              isInvalid={confirmPasswordError !== ""}
              errorMessage={confirmPasswordError}
            />
            {regError && (
              <div className="text-red-500 text-sm text-center font-mono">
                {regError}
              </div>
            )}
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <Button
                onClick={() => handleRegisterOAuth("github")}
                isIconOnly
                radius="lg"
                className="text-2xl"
              >
                <i className="fab fa-github"></i>
              </Button>
              <Button
                onClick={() => handleRegisterOAuth("gmail")}
                isIconOnly
                radius="lg"
                className="text-xl"
              >
                <i className="fab fa-google"></i>
              </Button>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Button
                color="default"
                variant="flat"
                onPress={() => handleModeToggle("login")}
              >
                {loginData.title}
              </Button>
              <Button
                color="warning"
                className="text-white"
                isLoading={isLoading}
                onPress={handleRegistration}
              >
                {regData.button}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
