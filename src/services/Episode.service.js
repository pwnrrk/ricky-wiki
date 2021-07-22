import API from "./Api";

export async function getEpisodeCount() {
  const { data } = await API.get("/episode");
  return data? data.info.count : 0;
}