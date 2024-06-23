"use client";

import React, { useEffect, useState } from "react";
import { UserCard } from "@/app/components/profile/userCard";
import { UserEdit } from "@/app/components/profile/userEdit";
import { UserQuizs } from "@/app/components/profile/userQuizzs";
import { useUser } from "@/app/dbcontext/UserDbContext";

import { useRouter } from "next/navigation";
import UserCardSkeleton from "@/app/components/profile/userCardSkeleton";
import MainSkeleton from "@/app/components/profile/mainSkeleton";
import toast, { Toaster } from "react-hot-toast";
import Authentication from "@/app/api/user/auth";
import ProfileLayout from "@/app/[lang]/layouts/ProfileLayout";
import { Locale } from "@/i18n.config";

export default function ProfilePage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [selectedOption, setSelectedOption] = useState("Main");
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const RefreshUser = Authentication();
  const [generalInfo, setGeneralInfo] = useState({
    userName: user?.userName,
    firstname: user?.firstName,
    lastname: user?.lastName,
    number: user?.phoneNumber,
  });

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!user) {
        router.push("/");
      } else {
        try {
          await RefreshUser.UpdatedUser(user.userId);
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, router, RefreshUser]);

  const handleSelectionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleGeneralInfoChange = (updatedInfo: {
    userName: string;
    firstname: string;
    lastname: string;
    number: string;
  }) => {
    setGeneralInfo(updatedInfo);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <UserCardSkeleton />
          <MainSkeleton />
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Render nothing if the user is not found and redirect is handled by useEffect
  }

  return (
    <ProfileLayout lang={lang}>
      <div className="container mx-auto mt-20">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <UserCard
            username={
              generalInfo.userName ? generalInfo.userName : user.userName
            }
            firstname={
              generalInfo.firstname ? generalInfo.firstname : user.firstName
            }
            lastname={
              generalInfo.lastname ? generalInfo.lastname : user.lastName
            }
            profilepicture={user.picture}
            joinedAt={user.joinedAt}
            onSelectionChange={handleSelectionChange}
          />
          {selectedOption === "Edit" ? (
            <UserEdit
              username={user.userName}
              firstname={user.firstName}
              lastname={user.lastName}
              profilepicture={user.picture}
              phonenumber={user.phoneNumber}
              onGeneralInfoChange={handleGeneralInfoChange}
              email={user.email}
              oauth={user.oauth ? true : false}
              userid={user.userId}
            />
          ) : (
            <UserQuizs lang={lang} />
          )}
          <Toaster position="bottom-left" reverseOrder={false} />
        </div>
      </div>
    </ProfileLayout>
  );
}
