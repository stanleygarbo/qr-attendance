import {
  AlertDialog as AlertDialogContainer,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AlertDialog = ({
  children,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete this piece of data from our servers.",
  onConfirm,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  onConfirm?: () => void;
}) => {
  return (
    <AlertDialogContainer>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogContainer>
  );
};

export default AlertDialog;
