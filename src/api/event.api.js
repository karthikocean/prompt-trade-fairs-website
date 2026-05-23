import apiClient from '../config/apiClient';

export const getUpcomingEvents = (page = 0, limit = 4, search = '') => {
    return apiClient.get('/event-enquiry/events', {
        params: {
            page,
            limit,
            search
        }
    });
};

export const getEventById = (id) => {
    return apiClient.get(`/event-enquiry/events/${id}`);
};

export const createEventEnquiry = (enquiryData) => {
    return apiClient.post('/event-enquiry', enquiryData);
};
