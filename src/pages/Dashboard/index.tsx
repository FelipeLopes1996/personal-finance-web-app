import { api } from "@/api/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { IChartExpense } from "@/types/IChartExpense";
import Chart from "react-apexcharts";
import { currencyMask } from "@/utils/formatCurrency";
import { Skeleton } from "@/components/Skeleton";
import { DateRangeField } from "@/components/DateRangeField";
import { useForm } from "react-hook-form";
import NoDataContent from "@/components/NoDataContent";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({});
  const navigate = useNavigate();

  const [selectedSliceIndex, setSelectedSliceIndex] = useState<number | null>(
    null,
  );

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const {
    data: dataChartsExpenses,
    isLoading: IsLoadingChartsExpenses,
    isFetching,
  } = useQuery({
    queryKey: ["expenses", startDate, endDate],
    queryFn: async () => {
      const response = await api.get<IChartExpense[] | []>(`/charts/expenses`, {
        params: {
          startDate,
          endDate,
        },
      });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  const totalExpense = currencyMask(
    String(
      dataChartsExpenses?.reduce((sum, d) => sum + d?.value, 0).toFixed(2),
    ),
  );

  const handleGoToExpenseScreen = () => {
    navigate("/expense");
  };

  const selectedValue =
    selectedSliceIndex !== null && dataChartsExpenses
      ? currencyMask(
          String(dataChartsExpenses[selectedSliceIndex]?.value.toFixed(2)),
        )
      : totalExpense;

  console.log("selectedValue", selectedValue);

  return (
    <div className="flex flex-col ">
      <h1 className="text-[2rem] mb-[1rem]">Dashboard</h1>
      {IsLoadingChartsExpenses || (isFetching && !startDate && !endDate) ? (
        <>
          <Skeleton className="h-[20rem] w-full mt-[2rem]" />
        </>
      ) : (
        <>
          {(!startDate && !endDate && dataChartsExpenses?.length) ||
          startDate ||
          endDate ? (
            <>
              <h2 className="mb-[0.5rem] mt-[0.5rem] text-[1.2rem]">
                Filtrar Por
              </h2>
              <form className="flex flex-col md:flex-row md:items-center gap-5.5 mb-[1.5rem] ">
                <DateRangeField
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  dirtyFields={dirtyFields}
                />
              </form>
              {isFetching && startDate && endDate ? (
                <Skeleton className="h-[20rem] w-full mt-[2rem]" />
              ) : (
                <>
                  {dataChartsExpenses?.length && !isFetching ? (
                    <div className="flex flex-col md:flex-row gap-[1rem] mt-[1rem]">
                      <div className="flex-1 border-[1px] border-[#CCC] solid p-[1rem] rounded-[4px]">
                        <h2 className=" mb-[2rem] text-[1.2rem]">
                          Resumo por categoria
                        </h2>
                        <Chart
                          key={selectedSliceIndex}
                          type="donut"
                          series={dataChartsExpenses?.map((d) => d.percentage)}
                          options={{
                            labels: dataChartsExpenses?.map((d) => d.category),
                            legend: { position: "bottom" },

                            dataLabels: {
                              enabled: true,
                              formatter: (val) => `${Number(val).toFixed(2)}%`,
                            },
                            tooltip: {
                              y: {
                                formatter: (_, { seriesIndex }) => {
                                  return currencyMask(
                                    String(
                                      dataChartsExpenses[
                                        seriesIndex
                                      ]?.value.toFixed(2),
                                    ),
                                  );
                                },
                              },
                            },
                            plotOptions: {
                              pie: {
                                donut: {
                                  labels: {
                                    show: true,

                                    name: {
                                      show: true,
                                      formatter: () =>
                                        selectedSliceIndex !== null
                                          ? dataChartsExpenses[
                                              selectedSliceIndex
                                            ]?.category
                                          : "Total",
                                    },

                                    value: {
                                      show: true,
                                      formatter: () => {
                                        if (
                                          selectedSliceIndex !== null &&
                                          dataChartsExpenses[selectedSliceIndex]
                                        ) {
                                          return currencyMask(
                                            String(
                                              dataChartsExpenses[
                                                selectedSliceIndex
                                              ].value.toFixed(2),
                                            ),
                                          );
                                        }

                                        return totalExpense;
                                      },
                                    },

                                    total: {
                                      show: true,
                                      label: "Total",
                                      formatter: () => selectedValue,
                                    },
                                  },
                                },
                              },
                            },
                            chart: {
                              events: {
                                dataPointSelection: (
                                  _,
                                  _chartContext,
                                  config,
                                ) => {
                                  if (config.dataPointIndex >= 0) {
                                    setSelectedSliceIndex((prev) =>
                                      prev === config.dataPointIndex
                                        ? null
                                        : config.dataPointIndex,
                                    );
                                  }
                                },
                              },
                            },
                          }}
                          height={320}
                        />
                      </div>
                      <div className="flex-1 border-[1px] border-[#CCC] solid p-[1rem] rounded-[4px]">
                        <h2 className="mt-[2rem] md:mt-[1rem] mb-[1rem] text-[1.2rem]">
                          Valores por categoria
                        </h2>
                        <Chart
                          type="bar"
                          height={350}
                          series={[
                            {
                              name: "Gastos",
                              data: dataChartsExpenses?.map((d) => d.value) || [
                                0,
                              ],
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

                                const formattedValue = value.toLocaleString(
                                  "pt-BR",
                                  {
                                    style: "currency",
                                    currency: "BRL",
                                  },
                                );

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
                              categories: dataChartsExpenses?.map(
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
                      </div>
                    </div>
                  ) : (
                    <NoDataContent
                      isbutton={false}
                      handleAction={handleGoToExpenseScreen}
                      title="Você não tem gastos neste período de datas para gerar um gráfico"
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <NoDataContent
              handleAction={handleGoToExpenseScreen}
              title="Você ainda não tem gastos para gerar um gráfico"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
