import API from "./Api";

/**
 * Get amount of character
 * @returns {Number} amount of character
 */
export async function getCharacterCount() {
  const response = await API.get("/character");
  return response.status === 200
    ? response.data.info.count
    : { error: response.statusText };
}
/**
 *
 * @param {Number | String} page Page to get
 * @returns {object} Response data
 */
export async function getCharacters(page) {
  var query = "";
  if (page) query += `/?page=${page}`;
  const response = await API.get(`/character${query}`);
  return response.status === 200
    ? response.data
    : { error: response.statusText };
}
/**
 *
 * @param {Number | String} id Character ID
 * @returns {object} Character data
 */
export async function getCharacterDetail(id) {
  const response = await API.get(`/character/${id}`);
  return response.status === 200
    ? response.data
    : { error: response.statusText };
}
