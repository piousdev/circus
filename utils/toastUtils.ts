import { useToast } from "@/components/ui/use-toast";

interface ToastOptions {
    message: string;
    style?: { backgroundColor: string };
    isError?: boolean;
}

export const ToastSuccess = ({message, style, isError = false} : ToastOptions) => {
    const { toast } = useToast();
    const backgroundColor = isError ? "#f44336" : "#4caf50";

    toast({
        description: message,
        style: { backgroundColor },
    });
};

export const ToastError = ({message, isError = true}: ToastOptions) => {
    if (isError) {
        console.error(message);
    } else {
        console.log(message);
    }
    ToastSuccess({ message, style: { backgroundColor: "" }, isError });
};