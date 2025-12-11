import type { ReactNode } from "react";

export type InfoCardProps = {
  title?: string;
  infoText?: string;
  isInComing?: boolean;
  icon?: ReactNode;
};

const InfoCard = ({
  icon: Icon,
  title,
  infoText,
  isInComing,
}: InfoCardProps) => {
  return (
    <div className=" p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
      <div className="flex items-center justify-center text-teal-600 bg-teal-200 rounded-full h-16 w-16 mx-auto mb-4">
        {Icon || "..."}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center text-gray-800 ">
        {isInComing ? "Em Breve..." : title}
      </h3>
      <p className="text-muted-foreground dark:text-gray-400 text-center text-sm leading-relaxed">
        {isInComing ? "Mais conteúdo" : infoText}
      </p>
    </div>
  );
};

export default InfoCard;
