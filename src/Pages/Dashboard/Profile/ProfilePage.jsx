import { useCallback, useEffect, useState } from "react";
import { User, AtSign, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useProfile from "@/Hooks/Dashboard/Profile/useProfile";
import useEditProfile from "@/Hooks/Dashboard/Profile/useEditProfile";
import { UpdateProfileSchema } from "@/Schema/Profile/ProfileSchema";

import { Card } from "@/Components/Elements/Cards/Card";
import { Input } from "@/Components/Elements/Inputs/Input";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import { Field, FieldError, FieldGroup, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { Badge } from "@/Components/Elements/Shadcn/badge";

import ProfileModalChangePassword from "@/Components/Fragments/Dashboard/Profile/Modal/ProfileModalChangePassword";

const ProfilePage = () => {
  const { profile, loadProfile } = useProfile();
  const { edit, loading: loadingEdit } = useEditProfile();

  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: profile?.name || "",
      username: profile?.username || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    },
  });

  const handleSubmitForm = async (formData) => {
    try {
      const response = await edit(formData);
      toast.success(response.message || "Profile berhasil diupdate");
    } catch (error) {
      if (error?.validationErrors) {
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
        return;
      }
      toast.error(error?.message || "Gagal mengupdate profile");
    }
  };

  const handleOpenModalChangePassword = useCallback((state) => {
    setOpenModalChangePassword(state);
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <Card className="w-full p-0 space-y-4 shadow-sm md:p-0" outerClassName="border border-border rounded-2xl p-0">
          <div className="flex flex-col p-4 pb-4 border-b bg-primary md:p-6 text-background">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold tracking-tight ">Manajemen Profile</h3>
                <Badge variant="secondary">{profile?.role}</Badge>
              </div>
              <p className="text-sm">Detail informasi akun Anda saat ini.</p>
            </div>
          </div>

          <form className="p-4 space-y-4 md:p-6" onSubmit={handleSubmit(handleSubmitForm)}>
            <FieldSet>
              <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
                <Field>
                  <Label htmlFor="name">
                    Nama <span className="text-destructive">*</span>
                  </Label>
                  <Input id="name" name="name" placeholder="Nama" {...register("name")} className="disabled:cursor-not-allowed!" aria-invalid={!!errors.name} firstAddon={<User />} />
                  {errors.name && <FieldError>{errors.name.message}</FieldError>}
                </Field>
                <Field>
                  <Label htmlFor="username">
                    Username <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    {...register("username")}
                    className="disabled:cursor-not-allowed!"
                    aria-invalid={!!errors.username}
                    firstAddon={<User />}
                  />
                  {errors.username && <FieldError>{errors.username.message}</FieldError>}
                </Field>
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="Email" {...register("email")} className="disabled:cursor-not-allowed!" aria-invalid={!!errors.email} firstAddon={<AtSign />} />
                  {errors.email && <FieldError>{errors.email.message}</FieldError>}
                </Field>
                <Field>
                  <Label htmlFor="phone">No Handphone</Label>
                  <Input id="phone" name="phone" placeholder="No Handphone" {...register("phone")} className="disabled:cursor-not-allowed!" aria-invalid={!!errors.phone} firstAddon={<Smartphone />} />
                  {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
                </Field>
              </FieldGroup>
              <FieldGroup className="flex-row items-center justify-end gap-2">
                <Button type="button" onClick={() => handleOpenModalChangePassword(true)} variant="outline" className="border-primary text-primary hover:text-primary hover:bg-primary/10">
                  Ubah Password
                </Button>
                <Button type="submit" className="relative" disabled={loadingEdit}>
                  <span className={loadingEdit ? "invisible" : "visible"}>Simpan</span>
                  {loadingEdit && (
                    <div className="absolute ">
                      <Spinner />
                    </div>
                  )}
                </Button>
              </FieldGroup>
            </FieldSet>
          </form>
        </Card>
      </div>

      {openModalChangePassword && <ProfileModalChangePassword isOpen={openModalChangePassword} onOpenModal={handleOpenModalChangePassword} />}
    </div>
  );
};

export default ProfilePage;
