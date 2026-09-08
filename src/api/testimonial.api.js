import apiClient from '../config/apiClient';

/**
 * Get active testimonials for website
 * @returns Promise
 */
export const getWebsiteTestimonials = async () => {
    return await apiClient.get('/testimonials');
};
