import API from "./Api";

/**
 * Get amount of character
 * @returns {Number} amount of character
 */
export async function getCharacterCount() {
  const { data } = await API.get("/character");
  return data ? data.info.count : 0;
}
/**
 *
 * @param {Number | String} page Page to get
 * @returns {object} Response data
 */
export async function getCharacters(page) {
  var query = "";
  if (page) query += `/?page=${page}`;
  const { data } = await API.get(`/character${query}`);
  return data ? data : {};
}
