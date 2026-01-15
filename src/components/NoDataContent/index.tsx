import { Button } from "../Button";
import { Plus } from "lucide-react";

interface INoDataContent {
  title: string;
  handleAction: () => void;
}

const NoDataContent = ({ title, handleAction }: INoDataContent) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2.5 rounded-[4px] mt-[4rem]">
      <h2 className="text-[0.9rem] md:text-[1.2rem] font-semibold">{title}</h2>
      <div>
        <Button
          onClick={handleAction}
          className="flex gap-1.5 items-center p-[0.8rem] text-[0.8rem] md:text-[1rem]"
        >
          {" "}
          <Plus size={20} />
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default NoDataContent;
