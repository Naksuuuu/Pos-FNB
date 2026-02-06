import { Button } from "@/Components/Elements/Shadcn/Button/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/Elements/Shadcn/Dialog/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/Components/Elements/Shadcn/Field/field";
import { Input } from "@/Components/Elements/Shadcn/Input/input";
import { memo } from "react";

const MenuEditModal = ({ selectedProduct, onOpenModal }) => {
  return (
    <Dialog open={selectedProduct !== null} onOpenChange={() => onOpenModal(null)}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{`Are you sure you want to edit ${selectedProduct?.name}?`}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your product and remove your data from our
            servers. hahahahahahahha
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <form action="">
            <FieldSet>
              <FieldLegend>Profile</FieldLegend>
              <FieldDescription>This appears on invoices and emails.</FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full name</FieldLabel>
                  <Input id="name" autoComplete="off" placeholder="Evil Rabbit" value={selectedProduct?.name} />
                  <FieldDescription>This appears on invoices and emails.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input id="username" autoComplete="off" aria-invalid />
                  <FieldError>Choose another username.</FieldError>
                </Field>
                <Field orientation="horizontal">
                  {/* <Switch id="newsletter" /> */}
                  {/* <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel> */}
                </Field>
                <Field orientation="vertical">
                  <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      className="cursor-pointer bg-emerald-500 hover:bg-emerald-600"
                      onClick={() => console.log(`Deleting ${selectedProduct?.id}`)}
                    >
                      Edit
                    </Button>
                  </DialogClose>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};
export default MenuEditModal;
