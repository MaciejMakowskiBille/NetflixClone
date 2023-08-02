import axios from "axios";
const url = "http://localhost:1337/api/"

export const getFilms = async () => {
    axios.get(url + "films?populate=*").then((response) => {
        console.log(response.data);
      });
}