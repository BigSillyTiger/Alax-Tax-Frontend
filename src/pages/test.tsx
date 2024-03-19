import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function DialogDemo() {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent
                className="min-h-[95vh] min-w-[93vw]"
                onPointerDownOutside={(e) => {
                    console.log("--> click outside");
                    //setOpen(false);
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        test stsring s123123
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                    <Button onClick={() => setOpen(false)}>test close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
