import React, { useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const NavigationGuard = ({
    isEnabled = true,
    message = "You have unsaved changes. Are you sure you want to leave?",
    onConfirm = () => {},
}) => {
    const [showDialog, setShowDialog] = React.useState(false);
    const [pendingUrl, setPendingUrl] = React.useState("");

    useEffect(() => {
        if (!isEnabled) return;

        // Handle beforeunload event (refresh, close tab, etc.)
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = message;
            return message;
        };

        // Handle popstate event (browser back/forward)
        const handlePopState = (e: PopStateEvent) => {
            e.preventDefault();
            setPendingUrl(window.location.href);
            setShowDialog(true);
        };

        // Add event listeners
        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        // Cleanup
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [isEnabled, message]);

    const handleConfirm = () => {
        setShowDialog(false);
        if (pendingUrl) {
            window.location.href = pendingUrl;
        }
        onConfirm();
    };

    const handleCancel = () => {
        setShowDialog(false);
        // Push the current URL back to the history to prevent navigation
        window.history.pushState(null, "", window.location.href);
    };

    return (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Leave this page?</AlertDialogTitle>
                    <AlertDialogDescription>{message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>
                        Stay
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>
                        Leave
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default NavigationGuard;
