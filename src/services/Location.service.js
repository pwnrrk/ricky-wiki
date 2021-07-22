import API from "./Api";

export async function getLocationCount() {
  const { data } = await API.get("/location");
  return data? data.info.count : 0;
}