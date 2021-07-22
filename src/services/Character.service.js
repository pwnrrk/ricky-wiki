import API from "./Api";

export async function getCharacterCount() {
  const { data } = await API.get("/character");
  return data? data.info.count : 0;
}