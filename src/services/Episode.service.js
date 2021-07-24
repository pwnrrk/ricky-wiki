import API from "./Api";

export async function getEpisodeCount() {
  const { data } = await API.get("/episode");
  return data? data.info.count : 0;
}

export async function getEpisodes(page) {
  var query = "";
  if (page) query += `/?page=${page}`;
  const response = await API.get(`/episode${query}`);
  return response.status === 200
    ? response.data
    : { error: response.statusText };
}