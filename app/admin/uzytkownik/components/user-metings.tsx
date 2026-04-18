"use client";

import { useEffect, useState, useTransition } from "react";
import Pagination from "@/components/Pagination/Pagination";
import { PrimaryButton } from "@/components/Buttons";
import MeetingTable from "./meeting-table";
import {
  getPaginatedMeetings,
  PaginatedResult,
} from "../actions/getPaginatedMeetigns";
import MeetingAddModal from "./meeting-add-modal";
import MeetingEditModal from "./meeting-edit-modal";
import { Meeting, User } from "@prisma/client";

type Props = {
  user: User;
  latestMeeting: Meeting | null;
};

const UserMeetings = ({ user, latestMeeting }: Props) => {
  const [data, setData] = useState<PaginatedResult<Meeting> | null>(null);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getPaginatedMeetings({
        userId: user.id,
        page: page,
        limit: 10,
      });
      setData(result);
    });
  }, [page, user]);

  const [slectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null,
  );

  const handleMeetingSelect = (meetingId: string) => {
    setSelectedPaymentId(meetingId);
  };

  const handleMeetingDeselect = () => {
    setSelectedPaymentId(null);
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleHideAddModal = () => {
    setShowAddModal(false);
  };

  if (!data && isPending) return <p>Ładowanie...</p>;

  if (!data) return <div className="">Brak</div>;

  const changePage = (page: number) => {
    if (page < 1 || page > data.totalPages) return;
    setPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="w-full flex flex-col gap-6 bg-white border border-border rounded-lg p-8 shadow-lg relative overflow-auto">
        <div className="flex gap-3 justify-between items-center">
          <h4 className="">Spotkania</h4>
          <PrimaryButton className="w-fit!" onClick={handleShowAddModal}>
            Dodaj spotkanie
          </PrimaryButton>
        </div>
        <div style={{ opacity: isPending ? 0.5 : 1 }}>
          <MeetingTable
            data={data.meetings}
            onMeetingSelect={handleMeetingSelect}
          />
        </div>
      </div>
      {data.meetings.length >= 1 && (
        <Pagination
          totalPages={data.totalPages}
          pageParam={data.page}
          isPending={isPending}
          onPageChange={changePage}
        />
      )}
      {showAddModal && (
        <MeetingAddModal
          user={user}
          onClose={handleHideAddModal}
          latestMeeting={latestMeeting}
        />
      )}
      {slectedPaymentId && (
        <MeetingEditModal
          user={user}
          meetings={data.meetings}
          meetingId={slectedPaymentId}
          onClose={handleMeetingDeselect}
        />
      )}
    </div>
  );
};
export default UserMeetings;
