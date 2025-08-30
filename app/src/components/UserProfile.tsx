import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/store/hook";

export default function UserProfile() {
  const {
    profile: { username, email },
  } = useAppSelector((state) => state.user);

  return (
    <div className="inline-flex items-center space-x-3 cursor-pointer">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>
      <span className="font-medium text-gray-500">{username}</span>
    </div>
  );
}
