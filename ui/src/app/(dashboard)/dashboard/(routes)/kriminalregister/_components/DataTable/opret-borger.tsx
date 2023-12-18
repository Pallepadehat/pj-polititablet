import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

const OpretBorger = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ipad"
            size="ipad"
            className="flex flex-row gap-2 items-center text-md"
          >
            <PlusCircle className="w-5 h-5" /> Opret Borger
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpretBorger;
