import { memo, useCallback } from "react";
import { LockKeyhole } from "lucide-react";

import useChangeCustomerPassword from "@/Features/Customer/Profile/Hooks/useChangeCustomerPassword";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/Components/Elements/Shadcn/dialog";
import { Field, FieldError, FieldGroup, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { InputPassword } from "@/Components/Elements/Inputs/Input";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const CustomerModalChangePassword = memo(({ isOpen, onOpenModal }) => {
  const handleSuccess = useCallback(() => {
    onOpenModal(false);
  }, [onOpenModal]);

  const { onSubmit, register, errors, loading } = useChangeCustomerPassword(handleSuccess);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center size-9 rounded-md bg-primary/10 text-primary">
              <LockKeyhole className="size-5" />
            </div>
            <DialogTitle className="text-lg font-bold">Ganti Password</DialogTitle>
          </div>
          <DialogDescription>
            Masukkan password lama dan password baru Anda di bawah ini untuk memperbarui keamanan akun.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 pt-2">
          <FieldSet className="p-0 gap-4">
            <FieldGroup className="gap-4">
              <Field>
                <Label htmlFor="current_password">
                  Password Sekarang <span className="text-destructive">*</span>
                </Label>
                <InputPassword
                  id="current_password"
                  name="current_password"
                  placeholder="Password Sekarang"
                  {...register("current_password")}
                  aria-invalid={!!errors.current_password}
                />
                {errors.current_password && <FieldError>{errors.current_password.message}</FieldError>}
              </Field>

              <Field>
                <Label htmlFor="password">
                  Password Baru <span className="text-destructive">*</span>
                </Label>
                <InputPassword
                  id="password"
                  name="password"
                  placeholder="Password Baru"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
                {errors.password && <FieldError>{errors.password.message}</FieldError>}
              </Field>

              <Field>
                <Label htmlFor="password_confirmation">
                  Konfirmasi Password Baru <span className="text-destructive">*</span>
                </Label>
                <InputPassword
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="Konfirmasi Password Baru"
                  {...register("password_confirmation")}
                  aria-invalid={!!errors.password_confirmation}
                />
                {errors.password_confirmation && <FieldError>{errors.password_confirmation.message}</FieldError>}
              </Field>
            </FieldGroup>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenModal(false)} disabled={loading}>
                Batal
              </Button>
              <Button type="submit" disabled={loading} className="relative min-w-24">
                <span className={loading ? "invisible" : "visible"}>Simpan</span>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner className="size-4" />
                  </div>
                )}
              </Button>
            </div>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
});

CustomerModalChangePassword.displayName = "CustomerModalChangePassword";

export default CustomerModalChangePassword;
