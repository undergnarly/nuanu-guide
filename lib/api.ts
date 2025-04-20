import axios from 'axios';
import { IEvent, ICategory } from './api-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventsApi = {
  getEvents: async (category?: string) => {
    const params = category && category !== 'all' ? { category } : {};
    const response = await api.get<IEvent[]>('/events/', { params });
    return response.data;
  },

  getFeaturedEvents: async () => {
    const response = await api.get<IEvent[]>('/events/featured/');
    return response.data;
  },

  getTrendingEvents: async () => {
    const response = await api.get<IEvent[]>('/events/trending/');
    return response.data;
  },

  getEvent: async (id: number) => {
    const response = await api.get<IEvent>(`/events/${id}/`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get<ICategory[]>('/categories/');
    return response.data;
  },

  likeEvent: async (id: number) => {
    const response = await api.post(`/events/${id}/like/`);
    return response.data;
  },

  unlikeEvent: async (id: number) => {
    const response = await api.delete(`/events/${id}/like/`);
    return response.data;
  },

  bookmarkEvent: async (id: number) => {
    const response = await api.post(`/events/${id}/bookmark/`);
    return response.data;
  },

  unbookmarkEvent: async (id: number) => {
    const response = await api.delete(`/events/${id}/bookmark/`);
    return response.data;
  },
}; 