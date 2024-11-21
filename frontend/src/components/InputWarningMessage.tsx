import { CircleAlert } from "lucide-react";

export default function InputWarningMessage({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <div className="text-red-400 text-sm font-light italic flex items-center gap-1">
      <CircleAlert className="animate-pulse" />
      {errorMessage}
    </div>
  );
}
