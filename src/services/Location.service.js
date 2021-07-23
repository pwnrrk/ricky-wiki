import API from "./Api";

export async function getLocationCount() {
  const { data } = await API.get("/location");
  return data ? data.info.count : 0;
}
/**
 *
 * @param {Number | String} page Page to get
 * @returns {object} Response data
 */
export async function getLocations(page) {
  var query = "";
  if (page) query += `/?page=${page}`;
  const response = await API.get(`/location${query}`);
  return response.status === 200
    ? response.data
    : { error: response.statusText };
}
