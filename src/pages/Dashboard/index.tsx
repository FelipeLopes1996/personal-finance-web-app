import { api } from "@/api/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { IChartExpense } from "@/types/IChartExpense";
import Chart from "react-apexcharts";
import { currencyMask } from "@/utils/formatCurrency";
import { Skeleton } from "@/components/Skeleton";

const Dashboard = () => {
  const { data: dataChartsExpenses, isLoading: IsLoadingChartsExpenses } =
    useQuery({
      queryKey: ["expenses"],
      queryFn: async () => {
        const response = await api.get<IChartExpense[] | []>(
          `/charts/expenses`,
        );
        return response.data;
      },
      placeholderData: keepPreviousData,
    });

  const totalExpense = currencyMask(
    String(
      dataChartsExpenses?.reduce((sum, d) => sum + d?.value, 0).toFixed(2),
    ),
  );

  return (
    <div className="flex flex-col ">
      <h1 className="text-[2rem] mb-[1rem]">Dashboard</h1>
      {IsLoadingChartsExpenses ? (
        <>
          <Skeleton className="h-[20rem] w-full mt-[2rem]" />
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <h2 className="mt-[1rem] mb-[2rem] text-[1.2rem]">
                Resumo por categoria
              </h2>
              {!IsLoadingChartsExpenses && dataChartsExpenses?.length ? (
                <Chart
                  type="donut"
                  series={dataChartsExpenses?.map((d) => d.percentage)}
                  options={{
                    labels: dataChartsExpenses?.map((d) => d.category),
                    legend: { position: "bottom" },
                    plotOptions: {
                      pie: {
                        donut: {
                          labels: {
                            show: true,
                            total: {
                              show: true,
                              label: "Total",
                              formatter: () => totalExpense,
                            },
                          },
                        },
                      },
                    },
                  }}
                  height={320}
                />
              ) : null}
            </div>
            <div className="flex-1">
              <h2 className="mt-[2rem] md:mt-[1rem] mb-[1rem] text-[1.2rem]">
                Valores por categoria
              </h2>
              {!IsLoadingChartsExpenses && dataChartsExpenses?.length ? (
                <Chart
                  type="bar"
                  height={350}
                  series={[
                    {
                      name: "Gastos",
                      data: dataChartsExpenses.map((d) => d.value),
                    },
                  ]}
                  options={{
                    dataLabels: {
                      enabled: true,

                      offsetX: 8,
                      offsetY: -13,
                      style: {
                        fontSize: "12px",
                        colors: ["#fff"],
                        fontWeight: 500,
                      },
                      formatter: (value, opts) => {
                        const label =
                          opts.w.globals.labels[opts.dataPointIndex];

                        const formattedValue = value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        });

                        return [`${label}`, `${formattedValue}`];
                        // const category = opts.w.globals.labels[opts.dataPointIndex];

                        // return `${category} • ${value.toLocaleString("pt-BR", {
                        //   style: "currency",
                        //   currency: "BRL",
                        // })}`;
                      },
                    },
                    plotOptions: {
                      bar: {
                        horizontal: true,
                        borderRadius: 6,
                      },
                    },
                    xaxis: {
                      categories: dataChartsExpenses.map(
                        ({ category }) => category,
                      ),
                      labels: {
                        show: false, // 👈 remove valores embaixo
                      },
                    },
                    yaxis: {
                      labels: { show: false },
                    },
                    tooltip: {
                      y: {
                        formatter: (val: number) =>
                          val.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }),
                      },
                    },
                  }}
                />
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
