"use client";

import { User } from "@/lib/generated/prisma/client";
import { formatDate } from "@/lib/hooks/formatDate";
import { useState } from "react";

type Props = {
  user: User;
};

const UserInfo = ({ user }: Props) => {
  const [editEmail, setEditEmail] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6 bg-white border border-border rounded-lg p-8 shadow-lg relative overflow-auto">
      <h4 className="">Informacje</h4>
      <div className="">
        <label htmlFor="email">Email</label>
        {editEmail ? (
          <input id="email" name="email" type="email" className="" />
        ) : (
          <p className="">{user.email}</p>
        )}
      </div>
      <div className="">
        <label htmlFor="email">Rola</label>
        {editEmail ? (
          <input id="email" name="email" type="email" className="" />
        ) : (
          <p className="">{user.role}</p>
        )}
      </div>
      <div className="">
        <label htmlFor="email">Dołączył</label>
        {editEmail ? (
          <input id="email" name="email" type="email" className="" />
        ) : (
          <p className="">{formatDate(user.createdAt)}</p>
        )}
      </div>
    </div>
  );
};
export default UserInfo;
