// useApi.ts (composable)
interface Res extends Response {
  message: string;
  remainingDownloads: number;
  mp3_file: string;
}
export interface apiRes {
  url: string;
  error?: any;
}
export async function useApi(url: string): Promise<apiRes | undefined> {
  let mp3_file: string;
  let remainingDownloads: number;
  try {
    const response = await fetch(`/api/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-KEY": `${import.meta.env.VITE_API_KEY}`,
        "APP-NAME": `${import.meta.env.VITE_APP_NAME}`,
      },
      body: JSON.stringify({ url }),
    });

    const data = (await response.json()) as Res;
    mp3_file = data.mp3_file;
    remainingDownloads = data.remainingDownloads;
    localStorage.setItem("storedRemaining", remainingDownloads.toString());
    console.info(data);
    return { url: mp3_file };
  } catch (error) {
    console.error(error);
    return;
  }
}
