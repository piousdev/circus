import { toast } from "@/components/ui/use-toast";

interface ToastOptions {
  message: string;
  style?: { backgroundColor: string };
  isError?: boolean;
}

const defaultStyles = {
  success: { backgroundColor: "#4caf50" },
  error: { backgroundColor: "#f44336" },
};

/**
 * Displays a toast message.
 * @param toast - The toast function to display the message.
 * @param options - The options for the toast message.
 * @param options.message - The message to display in the toast.
 * @param options.style - The style object for the toast. Defaults based on isError.
 * @param options.isError - Indicates whether the toast is an error message. (default: false).
 * @returns The object containing the toast ID, dismiss, and update functions.
 */
export const showToast = ({
  message,
  style,
  isError = false,
}: ToastOptions): ReturnType<typeof toast> => {
  const effectiveStyle =
    style ?? (isError ? defaultStyles.error : defaultStyles.success);

  isError && console.error(message);

  return toast({
    title: isError ? "Error" : "Success",
    description: message,
    style: effectiveStyle,
  });
};
