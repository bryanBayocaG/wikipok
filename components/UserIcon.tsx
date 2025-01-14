import { useAuthStore } from "@/app/store";
import { auth } from "@/utils/firebase";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    User,
} from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";





export default function UserIcon() {
    const currentOff = useAuthStore((state) => state.currentOff)
    const userImg = useAuthStore((state) => state.currentAuthImg)
    const userEmail = useAuthStore((state) => state.currentAuthEmail)
    const userName = useAuthStore((state) => state.currentAuthDisplayName)
    const HandleSignOut = async () => {
        try {
            await signOut(auth).then(() => {
                toast.success("Signed out successfully");
            });
            currentOff()


        } catch (error) {
            console.error("Sign-out failed:", error);
        }
    }
    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <div>
                        <User
                            as="button"
                            avatarProps={{
                                isBordered: true,
                                src: `${userImg}`,
                            }}
                            className="hidden md:flex transition-transform"
                            description={
                                <div className="truncate w-28">
                                    {userEmail}
                                </div>
                            }
                            name={userName}
                        />
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform md:hidden "
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
                    <DropdownItem key="logout" color="danger" onPress={HandleSignOut}>
                        Log Ou
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
