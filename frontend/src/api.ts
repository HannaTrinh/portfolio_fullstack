import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getAll(collection: string) {
    const res = await axios.get(`${API_URL}/${collection}`);
    if (res.status !== 200) {
        throw new Error(`Failed to fetch all ${collection}`);
    }
    return res.data;
}

export async function getOne(collection: string, id: string) {
    const res = await axios.get(`${API_URL}/${collection}/${id}`);
    console.log("Fetching one:", `${API_URL}/${collection}/${id}`);
    if (res.status !== 200) {
        throw new Error(`Failed to fetch one ${collection} with id ${id}`);
    }
    return res.data;
}

export async function createOne(collection: string, data: any) {
    const res = await axios.post(`${API_URL}/${collection}`, data);
    if (res.status !== 201) {
        throw new Error(`Failed to create ${collection}`);
    }
    return res.data;
}

export async function updateOne(collection: string, id: string, data: any) {
    const res = await axios.put(`${API_URL}/${collection}/${id}`, data);
    if (res.status !== 200) {
        throw new Error(`Failed to update ${collection} with id ${id}`);
    }
    return res.data;
}

export async function deleteOne(collection: string, id: string) {
    const res = await axios.delete(`${API_URL}/${collection}/${id}`);
    if (res.status !== 204) {
        throw new Error(`Failed to delete ${collection} with id ${id}`);
    }
    return res.data;
}