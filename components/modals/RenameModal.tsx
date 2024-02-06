"use client";

import { FormEventHandler, useEffect, useState } from "react";

import { api } from "@/convex/_generated/api";

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/useRenameModal";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";

interface RenameModalProps {}

const RenameModal = ({}: RenameModalProps) => {
  const { mutate, pending } = useApiMutation(api.board.update);
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await mutate({ id: initialValues.id, title });
      toast.success("Board renamed");
      onClose();
    } catch (err) {
      toast.error("Failed to rename board");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            required
            value={title}
            maxLength={60}
            disabled={pending}
            placeholder="Board title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
