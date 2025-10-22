import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClassMutations } from "@/hooks/useClassMutations";
import { PenLine, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type ClassDialogProps = {
  initialData?: { id?: string; name?: string; section?: string };
  mode?: "add" | "edit";
};

const ClassDialog = ({ initialData, mode = "add" }: ClassDialogProps) => {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [open, setOpen] = useState(false);
  const mutations = useClassMutations();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setSection(initialData.section || "");
    } else {
      setName("");
      setSection("");
    }
  }, [initialData, open]);

  const handleSubmit = async () => {
    if (mode === "add") {
      await mutations.add.mutateAsync({ name, section });
    } else if (initialData && initialData.id) {
      await mutations.update.mutateAsync({
        id: initialData.id,
        data: {
          name,
          section,
        },
      });
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>
            {mode === "edit" ? (
              <>
                {" "}
                <PenLine /> Edit Class
              </>
            ) : (
              <>
                <Plus /> Create Class
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Class</DialogTitle>
            <DialogDescription>
              Enter the details for your new class. You can specify a class
              name, section, subject, and room.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Class Name</Label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name-1"
                name="name"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="section">Section</Label>
              <Input
                required
                value={section}
                onChange={(e) => setSection(e.target.value)}
                id="section"
                name="section"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={mutations.add.isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-[124px]"
              disabled={mutations.add.isPending || !name || !section}
              onClick={handleSubmit}
            >
              {mutations.add.isPending ? (
                <img src="/loading.svg" className="invert" />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ClassDialog;
