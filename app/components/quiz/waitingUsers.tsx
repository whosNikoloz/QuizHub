"use client";

import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Reveal } from "../RevealFramer";

interface User {
  id: string;
  userName: string;
  role: string;
}

interface WaitingUsersProps {
  users: User[];
}

const WaitingUsers: React.FC<WaitingUsersProps> = ({ users }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {users.map((user) => (
        <Reveal direction="left" key={user.id} once={true}>
          <Card className="w-full bg-white/5 shadow-lg hover:bg-white/10 ">
            <CardBody>
              <div className="flex h-full w-full items-start justify-between   px-3  transition-all duration-150">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center">
                    <img
                      className="h-full w-full rounded-xl object-cover"
                      src={
                        user.role === "teacher"
                          ? "https://i.guim.co.uk/img/media/fbb1974c1ebbb6bf4c4beae0bb3d9cb93901953c/10_7_2380_1428/master/2380.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=223c0e9582e77253911be07c8cad564f"
                          : "https://i.guim.co.uk/img/media/c8c00617b792d1d53f2d2b318820d5758dc61551/231_0_2968_1782/master/2968.jpg?width=1200&quality=85&auto=format&fit=max&s=99459057199a54c97181e29b0947b5fb"
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-base font-bold text-navy-700 dark:text-white">
                      {user.userName}
                      {user.role === "teacher" ? "  Teacher" : "  Student"}
                    </h5>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Reveal>
      ))}
    </div>
  );
};

export default WaitingUsers;
