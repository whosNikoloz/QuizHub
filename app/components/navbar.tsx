"use client";

import React, { ChangeEvent, ReactNode, useState } from "react";
import { Link, Button, Avatar, Select, SelectItem } from "@nextui-org/react";
import { useEffect } from "react";
import { useUser } from "@/app/dbcontext/UserDbContext";
import NDropdown from "@/app/components/navdropdown";
import { usePathname, useRouter } from "next/navigation";
import UDropdown from "./Userdropdown";
import AuthModals from "./user/auth";
import { QuizHub } from "./QuizHubLogo";
import {
  MoonFilledIcon,
  SunFilledIcon,
  SystemIcon,
  Settingicon,
} from "./icons";
import { useTheme } from "next-themes";

export const Navbar = ({
  lng,
  NotMain,
  onOpenSignupModal,
}: {
  lng: string;
  NotMain: boolean;
  onOpenSignupModal: () => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useUser();

  const [isScrolled, setIsScrolled] = useState(false);

  const [lngstartCon, setLngstartCon] = useState<ReactNode>(null);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const isScrolled = scrollY > 50; // Adjust the scroll threshold as needed

    setIsScrolled(isScrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathName = usePathname();
  const router = useRouter();

  const handleLanguageChange = (selectedLanguage: string) => {
    if (!pathName) return "/";

    // Check if the path already contains the selected language
    if (pathName.startsWith("/" + selectedLanguage + "/")) return pathName;

    // Find the index of the second occurrence of "/"
    const secondSlashIndex = pathName.indexOf("/", 1);

    if (secondSlashIndex !== -1) {
      // Replace the language segment with the selected language
      const newPath =
        "/" + selectedLanguage + pathName.substring(secondSlashIndex);
      router.push(newPath);
      return newPath;
    }

    // If there's no second occurrence of "/", just append the selected language
    const newPath = "/" + selectedLanguage;
    router.push(newPath);
    return newPath;
  };
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    switch (lng) {
      case "ka":
        setLngstartCon(
          <Avatar
            alt="Georgia"
            className="w-5 h-5 bg-transparent"
            src="https://flagsapi.com/GE/flat/64.png"
          />
        );
        break;
      case "en":
        setLngstartCon(
          <Avatar
            alt="English"
            className="w-5 h-5 bg-transparent"
            src="https://flagsapi.com/US/flat/64.png"
          />
        );
        break;
    }
  }, [lng]);

  const { resolvedTheme, theme, setTheme } = useTheme();

  const [startCon, setStartCon] = useState<ReactNode>(null);

  useEffect(() => {
    switch (theme) {
      case "dark":
        setStartCon(<MoonFilledIcon size={20} height={20} width={20} />);
        break;
      case "light":
        setStartCon(<SunFilledIcon size={20} height={20} width={20} />);
        break;
      case "system":
        setStartCon(<SystemIcon size={20} height={20} width={20} />);
        break;
      default:
        setStartCon(<Settingicon size={20} height={20} width={20} />);
        break;
    }
  }, [theme]);

  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;

    switch (selectedTheme) {
      case "dark":
        setTheme("dark");
        break;
      case "light":
        setTheme("light");
        break;
      case "system":
        setTheme("system");
        break;
      default:
        console.log("Invalid theme");
        break;
    }
  };

  const handleLogout = () => {
    logout();
  };
  if (NotMain) {
    return (
      <>
        <nav
          className={`z-50 fixed w-full top-0 transition-colors ${
            isScrolled
              ? "dark:backdrop-blur-lg dark:bg-slate-800 bg-white shadow-md"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center ">
                <Button
                  className="relative inline-flex transition-colors items-center justify-center rounded-md p-2 bg-transparent  "
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  isIconOnly
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={`/${lng}`}>
                    <QuizHub />
                  </Link>
                  <Link
                    href={`/${lng}`}
                    className={`font-bold text-inherit dark:text-white text-black`}
                  >
                    {" "}
                    QuizHub
                  </Link>
                </div>
                <div className="hidden  sm:ml-6 sm:block ">
                  <div className="flex space-x-4">
                    {/* <Link
                      href={`/${lng}/social`}
                      className={`p-0 bg-transparent data-[hover=true]:bg-transparent font-bold text-md dark:text-yellow-300 text-yellow-600`}
                    >
                      {lng === "en" ? "PAGE1" : "PAGE1ქარ"}
                    </Link>
                    <Link
                      href={`/${lng}/compiler/csharp`}
                      className={`p-0 bg-transparent data-[hover=true]:bg-transparent font-bold text-md dark:text-white text-black `}
                    >
                      PAGE2
                    </Link> */}

                    <Select
                      className={`w-[150px] mb-1 dark:text-white text-black`}
                      size="sm"
                      onChange={handleThemeChange}
                      aria-label="Select theme"
                      labelPlacement="outside"
                      defaultSelectedKeys={[theme || "system"]}
                      startContent={startCon}
                    >
                      <SelectItem
                        key="dark"
                        className="text-black dark:text-white"
                        value={"dark"}
                        startContent={
                          <MoonFilledIcon size={20} height={20} width={20} />
                        }
                      >
                        Dark
                      </SelectItem>
                      <SelectItem
                        key="light"
                        value={"light"}
                        className="text-black dark:text-white"
                        startContent={
                          <SunFilledIcon size={20} height={20} width={20} />
                        }
                      >
                        Light
                      </SelectItem>
                      <SelectItem
                        key="system"
                        className="text-black dark:text-white"
                        value={"system"}
                        startContent={
                          <SystemIcon size={20} height={20} width={20} />
                        }
                      >
                        System
                      </SelectItem>
                    </Select>

                    <Select
                      className={`w-[150px] mb-1 `}
                      size="sm"
                      onChange={(event: { target: { value: string } }) =>
                        handleLanguageChange(event.target.value)
                      }
                      aria-label="Select Language"
                      labelPlacement="outside"
                      defaultSelectedKeys={[lng || `ka`]}
                      startContent={lngstartCon}
                    >
                      <SelectItem
                        key="ka"
                        value={"georgia"}
                        startContent={
                          <Avatar
                            alt="Georgia"
                            className="w-5 h-5 bg-transparent"
                            src="https://flagsapi.com/GE/flat/64.png"
                          />
                        }
                      >
                        {lng === "ka" ? "ქართული" : "Georgian"}
                      </SelectItem>
                      <SelectItem
                        key="en"
                        value={"english"}
                        onClick={() => handleLanguageChange("en")}
                        startContent={
                          <Avatar
                            alt="English"
                            className="w-5 h-5 bg-transparent"
                            src="https://flagsapi.com/US/flat/64.png"
                          />
                        }
                      >
                        {lng === "en" ? "English" : "ინგლისური"}
                      </SelectItem>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="pr-2 absolute inset-y-0 right-0 flex items-center   sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user ? (
                  <>
                    <UDropdown
                      username={user.userName}
                      avatar={user.picture}
                      email={user.email}
                      logout={handleLogout}
                      lng={lng}
                    />
                  </>
                ) : (
                  // Render this content if user is null
                  <>
                    <div className="relative ml-3">
                      <Button
                        className=" text-white"
                        color="warning"
                        variant="shadow"
                        onClick={() => onOpenSignupModal()}
                      >
                        {lng === "en" ? "Start" : "დაწყება"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <NDropdown
            Open={isMenuOpen}
            lng={lng as "en" | "ka"}
            onClose={() => setIsMenuOpen(false)}
          />
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav
          className={`z-50 fixed w-full top-0 transition-colors ${
            isScrolled
              ? "dark:backdrop-blur-lg dark:bg-black/10 bg-white shadow-md"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center ">
                <Button
                  className="relative inline-flex transition-colors items-center justify-center rounded-md p-2 bg-transparent  "
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  isIconOnly
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={`/${lng}`}>
                    <QuizHub />
                  </Link>
                  <Link
                    href={`/${lng}`}
                    className={`font-bold text-inherit  ${
                      isScrolled
                        ? "dark:text-white text-black"
                        : "dark:text-white text-white"
                    }`}
                  >
                    {" "}
                    QuizHub
                  </Link>
                </div>
                <div className="hidden  sm:ml-6 sm:block ">
                  <div className="flex space-x-4">
                    <Link
                      href={`/${lng}/social`}
                      className={`p-0 bg-transparent data-[hover=true]:bg-transparent transition-colors font-bold text-md ${
                        isScrolled
                          ? "dark:text-yellow-300 text-yellow-600"
                          : "dark:text-yellow-300 text-yellow-300"
                      }`}
                    >
                      {lng === "en" ? "PAGE1" : "PAGE1ქარ"}
                    </Link>
                    <Link
                      href={`/${lng}/compiler/csharp`}
                      className={`p-0 bg-transparent data-[hover=true]:bg-transparent font-bold text-md  ${
                        isScrolled
                          ? "dark:text-white text-black"
                          : "dark:text-white text-white "
                      }`}
                    >
                      PAGE2
                    </Link>
                    <Select
                      className={`w-[150px] mb-1${
                        isScrolled ? "" : " text-white"
                      }`}
                      size="sm"
                      onChange={(event: { target: { value: string } }) =>
                        handleLanguageChange(event.target.value)
                      }
                      aria-label="Select Language"
                      variant="bordered"
                      color="warning"
                      labelPlacement="outside"
                      defaultSelectedKeys={[lng || `ka`]}
                      startContent={lngstartCon}
                    >
                      <SelectItem
                        key="ka"
                        value={"georgia"}
                        startContent={
                          <Avatar
                            alt="Georgia"
                            className="w-5 h-5 bg-transparent"
                            src="https://flagsapi.com/GE/flat/64.png"
                          />
                        }
                      >
                        {lng === "ka" ? "ქართული" : "Georgian"}
                      </SelectItem>
                      <SelectItem
                        key="en"
                        value={"english"}
                        onClick={() => handleLanguageChange("en")}
                        startContent={
                          <Avatar
                            alt="English"
                            className="w-5 h-5 bg-transparent"
                            src="https://flagsapi.com/US/flat/64.png"
                          />
                        }
                      >
                        {lng === "en" ? "English" : "ინგლისური"}
                      </SelectItem>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="pr-2 absolute inset-y-0 right-0 flex  items-center  sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user ? (
                  <>
                    <UDropdown
                      username={user.userName}
                      avatar={user.picture}
                      email={user.email}
                      logout={handleLogout}
                      lng={lng}
                    />
                  </>
                ) : (
                  <>
                    <div className="relative ml-3">
                      <Button
                        className=" text-white"
                        color="warning"
                        variant="shadow"
                        onClick={() => onOpenSignupModal()}
                      >
                        {lng === "en" ? "Start" : "დაწყება"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <NDropdown
            Open={isMenuOpen}
            lng={lng as "en" | "ka"}
            onClose={() => setIsMenuOpen(false)}
          />
        </nav>
      </>
    );
  }
};
