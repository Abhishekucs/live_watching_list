"use client";
import React, { ReactNode, useActionState, useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { addAnimeToDb } from "@/actions";
import { useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

export default function DialogBox({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(addAnimeToDb, initialState);

  // Close dialog when submission is successful
  useEffect(() => {
    if (state.message === "Added successfully") {
      setOpen(false); // Close the dialog
    }
  }, [state]);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      // Reset state when dialog opens
      state.message = "";
    }
    setOpen(isOpen);
  };

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <div
        style={{
          display: "flex",
          marginTop: 25,
          justifyContent: "flex-end",
        }}
      >
        <button type="submit" aria-disabled={pending}>
          {pending ? "Adding..." : "Add"}
        </button>
      </div>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add Anime </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Add anime name here. Please check if anime you are going to enter is
            already in the list.
          </Dialog.Description>
          <form action={formAction}>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="name">
                Name
              </label>
              <input
                required
                className="Input"
                id="name"
                name="name"
                type="text"
              />
            </fieldset>
            <SubmitButton />
            <p
              aria-live="polite"
              role="status"
              className={`mt-2 text-sm ${
                state?.message.includes("Error")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {state?.message}
            </p>
          </form>

          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
