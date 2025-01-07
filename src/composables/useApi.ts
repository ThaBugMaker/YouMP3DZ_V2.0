// useApi.ts (composable)

export async function useApi(url: string) {
  const response = await fetch("http://127.0.0.1:5000/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      message: "hi",
      "API-KEY": "ecb6103eef1a6a368c97cd62ee9f9127",
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();
  console.log(data);
}
