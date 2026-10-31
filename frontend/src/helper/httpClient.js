export default async function httpClient(api, payload) {
  const { method, ...rest } = payload || {};

  const isFormData = rest?.data instanceof FormData;
  const res = await fetch(`${import.meta.env.VITE_API_URL}${api}`, {
    method: method || "GET",
    body: rest?.data
      ? isFormData
        ? rest?.data
        : JSON.stringify({
            ...rest?.data,
          })
      : undefined,
    headers: isFormData
      ? {}
      : {
          "Content-Type": "application/json",
        },
  });
  return res.json();
}
