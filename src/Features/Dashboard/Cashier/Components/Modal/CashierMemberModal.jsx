import { useState } from "react";
import { Users, UserPlus, ArrowLeft } from "lucide-react";

import useCashierMembers from "@/Features/Dashboard/Cashier/Hooks/useCashierMembers";
import useCreateCashierMember from "@/Features/Dashboard/Cashier/Hooks/useCreateCashierMember";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/Components/Elements/Shadcn/dialog";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Input, InputPassword } from "@/Components/Elements/Inputs/Input";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/Components/Elements/Shadcn/field";
import { Spinner } from "@/Components/Elements/Shadcn/spinner";

const CashierMemberModal = ({ isOpen, onOpenModal }) => {
  const [view, setView] = useState("list"); // "list" | "register"
  const { members, loading: loadingMembers, optimisticSearch, handleSearchChange } = useCashierMembers(isOpen);

  const {
    register,
    handleSubmit,
    onSubmitForm,
    reset,
    errors,
    loading: registering,
  } = useCreateCashierMember(() => {
    setView("list");
  });

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenModal(false)}>
      <DialogContent showCloseButton={false} className="w-full md:max-w-3xl! min-h-[400px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              {view === "list" ? <Users className="size-6" /> : <UserPlus className="size-6" />}
            </div>
            <span className="font-semibold text-lg">{view === "list" ? "Kelola Member" : "Daftar Member Baru"}</span>
          </DialogTitle>
        </DialogHeader>

        {view === "list" ? (
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 max-w-sm">
                <InputSearch
                  id="search-member"
                  name="search"
                  onSearchChange={handleSearchChange}
                  value={optimisticSearch}
                  placeholder="Cari member..."
                />
              </div>
              <Button type="button" onClick={() => setView("register")}>
                <UserPlus className="size-4" /> Daftar Member
              </Button>
            </div>

            <div className="flex-1 border rounded-lg overflow-y-auto max-h-[300px] no-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>No HP</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingMembers && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <Spinner className="mx-auto" />
                      </TableCell>
                    </TableRow>
                  )}
                  {!loadingMembers && members.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        Tidak ada member ditemukan
                      </TableCell>
                    </TableRow>
                  )}
                  {!loadingMembers &&
                    members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-semibold">{member.name}</TableCell>
                        <TableCell>{member.username || "-"}</TableCell>
                        <TableCell>{member.phone || "-"}</TableCell>
                        <TableCell>{member.email || "-"}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end gap-2 mt-auto">
              <DialogClose
                render={(props) => (
                  <Button {...props} variant="outline">
                    Tutup
                  </Button>
                )}
              />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitForm)} className="flex-1 flex flex-col gap-4 justify-between">
            <FieldSet>
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="name">
                    Nama Lengkap <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="off"
                    placeholder="Nama Lengkap"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <FieldError>{errors.name.message}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="username">
                    Username <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="username"
                    name="username"
                    autoComplete="off"
                    placeholder="Username"
                    {...register("username")}
                    aria-invalid={!!errors.username}
                  />
                  {errors.username && <FieldError>{errors.username.message}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">No Handphone</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    autoComplete="off"
                    placeholder="contoh: 0812345678"
                    {...register("phone")}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <FieldError>{errors.email.message}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">
                    Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <InputPassword
                    id="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Password"
                    {...register("password")}
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && <FieldError>{errors.password.message}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password_confirmation">
                    Konfirmasi Password <span className="text-destructive">*</span>
                  </FieldLabel>
                  <InputPassword
                    id="password_confirmation"
                    name="password_confirmation"
                    autoComplete="off"
                    placeholder="Konfirmasi Password"
                    {...register("password_confirmation")}
                    aria-invalid={!!errors.password_confirmation}
                  />
                  {errors.password_confirmation && <FieldError>{errors.password_confirmation.message}</FieldError>}
                </Field>
              </FieldGroup>
            </FieldSet>

            <div className="flex justify-end gap-2 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setView("list");
                  reset();
                }}
              >
                <ArrowLeft className="size-4" /> Kembali
              </Button>
              <Button type="submit" disabled={registering} className="relative">
                <span className={registering ? "invisible" : "visible"}>Daftarkan</span>
                {registering && (
                  <div className="absolute">
                    <Spinner />
                  </div>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CashierMemberModal;
