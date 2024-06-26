"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import Authentication from "@/app/api/user/auth";
import toast from "react-hot-toast";
import { Card, CardBody } from "@nextui-org/react";

interface GeneralEditProps {
  name_en: string;
  name_ka: string;
  imageUrl: string;
  onChange: (updatedInfo: {
    name_en: string;
    name_ka: string;
    imageUrl: string;
  }) => void;
}

function EditQuizGeneralData({
  name_en,
  name_ka,
  imageUrl,
  onChange,
}: GeneralEditProps) {
  const [GeneralProps, setGeneralProps] = useState({
    name_en: name_en,
    name_ka: name_ka,
    imageUrl: imageUrl,
  });

  const [error, setError] = useState({
    userNameError: "",
  });

  const pass_API = Authentication();

  const [isLoading, setIsLoading] = useState(false);

  const handelChangeGeneral = async () => {
    if (GeneralProps.name_en === "") {
      setError({
        userNameError: "აუცილებელი ველი",
      });
      return;
    }

    if (GeneralProps.userName.length < 4 || GeneralProps.userName.length > 50) {
      setError({
        userNameError: "Username must be between 4 and 50 characters",
      });
    } else {
      setError({
        userNameError: "",
      });
    }

    setIsLoading(true);
    setError({
      userNameError: "",
    });

    var errorMessage = await pass_API.handleChangeGeneral(
      userid,
      GeneralProps.userName,
      GeneralProps.firstname,
      GeneralProps.lastname,
      GeneralProps.number
    );
    if (errorMessage) {
      setError({ ...error, userNameError: "ასეთი სახელი უკვე არსებობს" });
      toast.error("ასეთი სახელი უკვე არსებობს");

      setIsLoading(false);
    } else {
      setError({
        userNameError: "",
      });
      onChange({
        userName: GeneralProps.userName,
        firstname: GeneralProps.firstname,
        lastname: GeneralProps.lastname,
        number: GeneralProps.number,
      });
      toast.success("წარმატებით შეიცვალა");
      setIsLoading(false);
    }
  };

  return (
    <Card
      isBlurred
      className="border-none  bg-background/60 dark:bg-default-100/50 shadow-2xl max-w-[680px] justify-center items-center "
      shadow="sm"
    >
      <CardBody>
        <div className="flex items-center flex-col justify-center w-full ">
          <h1 className="text-xl text-start font-semibold  mb-6">
            General information
          </h1>

          <div className="flex flex-col gap-4 w-full">
            <div>
              <Input
                type="text"
                isClearable
                className="w-full"
                label="Username"
                value={GeneralProps.userName}
                classNames={{
                  input: ["text-[16px] "],
                }}
                isInvalid={error.userNameError ? true : false}
                onClear={() =>
                  setGeneralProps({ ...GeneralProps, userName: "" })
                }
                errorMessage={error.userNameError ? error.userNameError : null}
                onChange={(e) =>
                  setGeneralProps({
                    ...GeneralProps,
                    userName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Input
                type="text"
                className="w-full"
                isClearable
                label="First name"
                classNames={{
                  input: ["text-[16px] "],
                }}
                value={GeneralProps.firstname}
                onClear={() =>
                  setGeneralProps({ ...GeneralProps, firstname: "" })
                }
                onChange={(e) =>
                  setGeneralProps({
                    ...GeneralProps,
                    firstname: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Input
                type="text"
                className="w-full"
                isClearable
                label="Last name"
                classNames={{
                  input: ["text-[16px] "],
                }}
                value={GeneralProps.lastname}
                onClear={() =>
                  setGeneralProps({ ...GeneralProps, lastname: "" })
                }
                onChange={(e) =>
                  setGeneralProps({
                    ...GeneralProps,
                    lastname: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                className="w-full"
                isClearable
                classNames={{
                  input: ["text-[16px] "],
                }}
                label="Phone Number"
                value={GeneralProps.number}
                onClear={() => setGeneralProps({ ...GeneralProps, number: "" })}
                onChange={(e) =>
                  setGeneralProps({
                    ...GeneralProps,
                    number: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="text-start w-full">
            <Button
              color="warning"
              className="text-white"
              variant="shadow"
              size="sm"
              onClick={() => handelChangeGeneral()}
              isLoading={isLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default EditQuizGeneralData;