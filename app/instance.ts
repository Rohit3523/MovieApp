import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.tvmaze.com/",
    headers: {
        "Content-Type": "application/json"
    }
});

export function listMovies() {
    return instance.get("/shows");
}

export function searchMovies(query: string) {
    return instance.get(`/search/shows?q=${query}`);
}