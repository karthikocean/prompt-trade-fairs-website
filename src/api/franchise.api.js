import apiClient from '../config/apiClient';

/**
 * Submit Franchise Interest Form
 * @param {Object} data 
 * @returns Promise
 */
export const submitFranchiseInterest = async (data) => {
    return await apiClient.post('/franchise-enquiry', data);
};
