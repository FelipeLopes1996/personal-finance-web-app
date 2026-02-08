import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../Button";

interface IPaginationData {
  first: boolean;
  last: boolean;
  number: number;
  totalPages: number;
}

interface IPaginationTableProps {
  data?: IPaginationData;
  page: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
}

export const PaginationTable: React.FC<IPaginationTableProps> = ({
  data,
  page,
  loading = false,
  onPageChange,
}) => {
  if (!data) return null;

  return (
    <>
      {/* Paginação Desktop */}
      <div className="hidden md:flex justify-end items-center gap-4 p-4 px-[1rem]">
        <Button
          disabled={data.first || loading}
          onClick={() => onPageChange(page - 1)}
          className="!w-auto !p-[0.5rem] disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <span>
          Página {data.number + 1} de {data.totalPages}
        </span>

        <Button
          disabled={data.last || loading}
          onClick={() => onPageChange(page + 1)}
          className="!w-auto !p-[0.5rem] disabled:opacity-50"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Paginação Mobile */}
      <div className="flex md:hidden justify-between items-center mt-4">
        <Button
          disabled={data.first || loading}
          onClick={() => onPageChange(page - 1)}
          className="!w-auto !p-[0.5rem] disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <span className="text-sm">
          {data.number + 1} / {data.totalPages}
        </span>

        <Button
          disabled={data.last || loading}
          onClick={() => onPageChange(page + 1)}
          className="!w-auto !p-[0.5rem] disabled:opacity-50"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </>
  );
};
