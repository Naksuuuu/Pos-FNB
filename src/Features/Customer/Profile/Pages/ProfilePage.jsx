import { memo } from "react";
import { User, AtSign, Smartphone, KeyRound } from "lucide-react";

import { ROUTES } from "@/Constants/RouteConstant";
import CustomerNavbar from "@/Features/Customer/Shared/Components/Navigation/CustomerNavbar";
import useCustomerProfileForm from "@/Features/Customer/Profile/Hooks/useCustomerProfileForm";
import CustomerModalChangePassword from "@/Features/Customer/Profile/Components/Modal/CustomerModalChangePassword";

import { Card } from "@/Components/Elements/Cards/Card";
import { Input } from "@/Components/Elements/Inputs/Input";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Field, FieldError, FieldGroup, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";

import { useNavigate } from "react-router";

const ProfilePage = memo(() => {
  const navigate = useNavigate();
  const {
    register,
    onSubmit,
    errors,
    profile,
    loadingProfile,
    loadingEdit,
    isAuthenticated,
    openModalChangePassword,
    handleOpenModalChangePassword,
    queryParams,
  } = useCustomerProfileForm();

  return (
    <>
      <CustomerNavbar navbarTitle="Edit Profil" backLink={`${ROUTES.PUBLIC.USER}${queryParams}`} />

      <div className="flex-1 w-full p-4 max-w-3xl mx-auto flex flex-col justify-between">
        <div className="w-full flex flex-col gap-4">
          {isAuthenticated && loadingProfile ? (
            <div className="w-full py-12 flex justify-center items-center">
              <Spinner className="size-8" />
            </div>
          ) : isAuthenticated ? (
            <>
              {/* Profile Card Header */}
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-border">
                <div className="flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-slate-800 text-lg truncate">{profile?.name}</h2>
                  <p className="text-sm text-slate-500 truncate">@{profile?.username}</p>
                </div>
              </div>

              {/* Edit Profile Form */}
              <Card className="p-4" outerClassName="border border-border rounded-xl">
                <form onSubmit={onSubmit} className="space-y-4">
                  <FieldSet className="p-0 gap-4">
                    <h3 className="font-bold text-slate-800 text-sm">Informasi Personal</h3>
                    <FieldGroup className="gap-4">
                      <Field>
                        <Label htmlFor="name">
                          Nama Lengkap <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Nama Lengkap"
                          {...register("name")}
                          aria-invalid={!!errors.name}
                          firstAddon={<User className="size-4" />}
                        />
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
                          aria-invalid={!!errors.username}
                          firstAddon={<User className="size-4" />}
                        />
                        {errors.username && <FieldError>{errors.username.message}</FieldError>}
                      </Field>

                      <Field>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          placeholder="Email"
                          {...register("email")}
                          aria-invalid={!!errors.email}
                          firstAddon={<AtSign className="size-4" />}
                        />
                        {errors.email && <FieldError>{errors.email.message}</FieldError>}
                      </Field>

                      <Field>
                        <Label htmlFor="phone">No Handphone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="No Handphone"
                          {...register("phone")}
                          aria-invalid={!!errors.phone}
                          firstAddon={<Smartphone className="size-4" />}
                        />
                        {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
                      </Field>
                    </FieldGroup>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button
                        type="button"
                        onClick={() => handleOpenModalChangePassword(true)}
                        variant="outline"
                        className="flex-1 border-primary text-primary hover:text-primary hover:bg-primary/10 gap-2"
                      >
                        <KeyRound className="size-4" />
                        Ganti Password
                      </Button>
                      <Button type="submit" disabled={loadingEdit} className="flex-1 relative">
                        <span className={loadingEdit ? "invisible" : "visible"}>Simpan Perubahan</span>
                        {loadingEdit && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Spinner className="size-4" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </FieldSet>
                </form>
              </Card>
            </>
          ) : (
            <Card outerClassName="shadow-none" className="text-center flex flex-col items-center justify-center gap-4">
              <div className="p-4 bg-primary/5 text-primary rounded-full border border-border">
                <User className="size-12" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-lg">Anda belum masuk</h3>
                <p className="text-sm text-slate-500 max-w-xs">
                  Silakan masuk terlebih dahulu untuk melihat dan mengelola informasi profil Anda.
                </p>
              </div>
              <Button
                onClick={() => navigate(`${ROUTES.AUTH.LOGIN}?callbackUrl=${ROUTES.PUBLIC.PROFILE}`)}
                className="w-full max-w-xs mt-2"
              >
                Masuk Sekarang
              </Button>
            </Card>
          )}
        </div>
      </div>

      {openModalChangePassword && (
        <CustomerModalChangePassword isOpen={openModalChangePassword} onOpenModal={handleOpenModalChangePassword} />
      )}
    </>
  );
});

ProfilePage.displayName = "ProfilePage";

export default ProfilePage;
