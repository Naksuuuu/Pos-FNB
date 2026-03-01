import { useCallback, useEffect, useState } from "react";
import { User, Shield, AtSign } from "lucide-react";

import useProfile from "@/Hooks/Dashboard/Profile/useProfile";

import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import ProfileModalChangePassword from "@/Components/Fragments/Dashboard/Profile/Modal/ProfileModalChangePassword";
import ProfileModalEdit from "@/Components/Fragments/Dashboard/Profile/Modal/ProfileModalEdit";

const ProfilePage = () => {
  const { profile, loadProfile } = useProfile();
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleOpenModalChangePassword = useCallback((state) => {
    setOpenModalChangePassword(state);
  }, []);

  const handleOpenModalEdit = useCallback((state) => {
    setOpenModalEdit(state);
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Card className="w-full shadow-sm" outerClassName="border border-border rounded-2xl">
          <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2 border-b pb-4">
              <h3 className="font-semibold text-2xl tracking-tight">Profile Information</h3>
              <p className="text-sm text-muted-foreground">Detail informasi akun Anda saat ini.</p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <User className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Name</p>
                  <p className="text-lg font-semibold">{profile?.name || "-"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <AtSign className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Username</p>
                  <p className="text-lg font-semibold">{profile?.username || "-"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Shield className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Role</p>
                  <p className="text-lg font-semibold capitalize">{profile?.role || "-"}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button onClick={() => handleOpenModalEdit(true)}>Edit Profile</Button>
              <Button onClick={() => handleOpenModalChangePassword(true)}>Ubah Password</Button>
            </div>
          </div>
        </Card>
      </div>

      {openModalChangePassword && (
        <ProfileModalChangePassword isOpen={openModalChangePassword} onOpenModal={handleOpenModalChangePassword} />
      )}
      {openModalEdit && <ProfileModalEdit isOpen={openModalEdit} onOpenModal={handleOpenModalEdit} profile={profile} />}
    </div>
  );
};

export default ProfilePage;
