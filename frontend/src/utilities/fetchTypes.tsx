import { Axios } from "axios";
import { Type } from "../interfaces/PokemonInterfaces";

export async function fetchTypes(axiosInstance: Axios): Promise<any> {
  try {
    const response = await axiosInstance.get("/type");
    const data: Type[] = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
