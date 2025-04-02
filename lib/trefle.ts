import axios from 'axios';

const API_TOKEN = 'mtziKEFKAdB7c4XNajueIyq6fOt2InxWhOBkB-xb6fc';
const BASE_URL = 'https://trefle.io/api/v1';


export async function getPlants(page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/plants`, {
      params: {
        token: API_TOKEN,
        page: page,
        per_page: 10,
      },
    });
    return response.data.data; 
  } catch (error) {
    console.error('Ошибка загрузки растений:', error);
    return [];
  }
}


export async function getPlantDetails(id: number | string) {
    try {
      const response = await fetch(`https://trefle.io/api/v1/plants/${id}?token=mtziKEFKAdB7c4XNajueIyq6fOt2InxWhOBkB-xb6fc`);
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Ошибка:', error);
      return null;
    }
  }
  
