import ModalPayments from "./modal-payments";
import { UserWithPayments } from "../actions/getPaginatedUsers";
import { DefaultLink } from "@/components/Links";

type Props = {
  user: UserWithPayments;
  onClose: () => void;
};

const UserModal = ({ user, onClose }: Props) => {
  return (
    <div
      onClick={() => onClose()}
      className="absolute inset-0 w-full h-full bg-black/30 flex items-center justify-center p-8"
    >
      <div
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="">
          <h4 className="">
            {user.name} {user.lastName}
          </h4>
          <p className="text-sm">{user.email}</p>
        </div>
        <ModalPayments payments={user.payments} userId={user.id} />
        <div className="flex items-center justify-center mt-12">
          <DefaultLink href={`/admin/uzytkownik/${user.id}`}>
            szczegóły
          </DefaultLink>
        </div>
      </div>
    </div>
  );
};
export default UserModal;
