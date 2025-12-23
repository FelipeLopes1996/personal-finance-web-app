import clsx from "clsx";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

interface IToast {
  title?: string;
  description?: string;
  status: keyof typeof BG_COLOR_STATUS;
}

const BG_COLOR_STATUS = {
  success: {
    bg: "bg-[#81DC96]",
    icon: (
      <div className="w-[3rem] h-6 bg-white flex items-center justify-center rounded-full">
        <Check className="w-3 h-3 text-[#81DC96]" />
      </div>
    ),
  },
  info: {
    bg: "bg-blue-600",
    icon: (
      <div className="w-[3rem] h-6 bg-white flex items-center justify-center rounded-full">
        <Check className="w-3 h-3 text-blue-600" />
      </div>
    ),
  },
  error: {
    bg: "bg-[#DC818C]",
    icon: (
      <div className="w-[3rem] h-6 bg-[#C42D3F] text-[13px] font-bold text-white  flex items-center justify-center rounded-full">
        !
      </div>
    ),
  },
  warning: {
    bg: "bg-[#DCC481]",
    icon: (
      <div className="w-[3rem] h-6 bg-[#C49C2D] text-[13px] font-bold text-white  flex items-center justify-center rounded-full">
        !
      </div>
    ),
  },
} as const;

export default function CustomToast({ title, description, status }: IToast) {
  return toast.custom(
    (t) => (
      <div
        className={clsx(
          "flex",
          "items-start",
          "justify-between",
          "rounded-md",
          `${BG_COLOR_STATUS[status].bg}`,
          "text-white",
          "shadow-lg",
          "p-4"
        )}
      >
        <div className="flex items-start gap-3">
          {BG_COLOR_STATUS[status].icon}
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm">{description}</p>
          </div>
        </div>

        <button
          onClick={() => toast.dismiss(t)}
          className="ml-4 text-white/80 hover:text-white hover:cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ),
    {
      position: "top-center",
    }
  );
}
