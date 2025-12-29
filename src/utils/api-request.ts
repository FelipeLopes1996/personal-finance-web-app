type ApiRequestError = {
  errors: string[];
  success: false;
  status: number;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
  status: number;
};

export type ApiRequest<T> = ApiRequestError | ApiRequestSuccess<T>;

export const apiUrl = import.meta.env.VITE_API_URL;

export async function apiRequest<T>(
  path: string,
  options?: RequestInit
): Promise<ApiRequest<T>> {
  const url = `${apiUrl}${path}`;

  try {
    const res = await fetch(url, options);
    // const json = await res.json().catch(() => null);

    // testando login

    const contentType = res.headers.get("content-type") || "";

    //  lê o body apenas uma vez
    const rawBody = await res.text();

    const data = contentType.includes("application/json")
      ? rawBody
        ? JSON.parse(rawBody)
        : null
      : rawBody;

    if (!res.ok) {
      const errors = Array.isArray(data?.message)
        ? data.message
        : [data?.error || "Erro inesperado"];

      return {
        errors,
        success: false,
        status: res.status,
      };
    }

    return {
      success: true,
      data: data,
      status: res.status,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return {
      errors: ["Falha ao conectar-se ao servidor"],
      success: false,
      status: 500,
    };
  }
}
