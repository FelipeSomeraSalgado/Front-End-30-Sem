import axios from "axios";

//define a porta da api
const apiport = "3000"

//define a URL base para a API local, usando a porta definida
const localAPI = `http://localhost:${apiport}`

//define variável para API externa
const externalAPI = null

const api = axios.create({
    baseURL: localAPI
}) 

export default api