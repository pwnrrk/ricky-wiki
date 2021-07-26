import API from "./Api";
export async function searchCharacter(input) {
  try {
    const response = await API.get(`/character/?name=${input}`);
    return response.status === 200
      ? response.data
      : { error: response.statusText };
  } catch (error) {
    return { error: error };
  }
}
