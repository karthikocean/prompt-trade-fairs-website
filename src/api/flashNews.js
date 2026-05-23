import apiClient from '../config/apiClient';

/**
 * Get all blogs
 * @returns Promise
 */
export const getFlashNews = async () => {
    return await apiClient.get('/flash-news');
};

/**
 * Get active flash news
 * @returns Promise
 */
export const getActiveFlashNews = async () => {
    return await apiClient.get(`/flash-news/active`);
};

/**
 * Get flash news by ID
 * @param {string} id
 * @returns Promise
 */
export const getFlashNewsById = async (id) => {
    return await apiClient.get(`/flash-news/${id}`);
};
