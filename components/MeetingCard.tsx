"use client";

import { Prisma } from "@/lib/generated/prisma/client";
import { useEffect } from "react";

const MeetingCard = ({ data }: { data: any }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>Meetings</div>;
};
export default MeetingCard;
