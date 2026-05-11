import apiClient from '../config/apiClient';

/**
 * Submit Membership Application Form
 * @param {Object} data 
 * @returns Promise
 */
export const submitMembershipApplication = async (data) => {
    return await apiClient.post('/membership-application', data);
};
