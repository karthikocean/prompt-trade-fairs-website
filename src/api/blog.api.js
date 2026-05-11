import apiClient from '../config/apiClient';

/**
 * Get all blogs
 * @returns Promise
 */
export const getBlogs = async () => {
    return await apiClient.get('/blog');
};

/**
 * Get blog by ID
 * @param {string} id
 * @returns Promise
 */
export const getBlogById = async (id) => {
    return await apiClient.get(`/blog/${id}`);
};
