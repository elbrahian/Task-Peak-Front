import axios from "axios"

export const GetMyStask = async (id) => {
    try {
        const { data } = await axios.get(`/api/v1/tareaUsuario?iduser=${id}`)
        return data
    } catch (error) {
        console.error('Error al obtener mis tareas:', error);
        throw error;
    }
}