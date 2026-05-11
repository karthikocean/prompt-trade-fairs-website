import apiClient from '../config/apiClient';

export const getEvents = () => {
    return apiClient.get('/events');
};

export const getNews = () => {
    return apiClient.get('/news');
};

export const getBanners = () => {
    return apiClient.get('/banner/list');
};

export const getGallery = () => {
    return apiClient.get('/gallery');
};

export const getTestimonials = () => {
    return apiClient.get('/testimonials');
};

export const createContact = (data) => {
    return apiClient.post('/contact/create', data);
};

export const getPresentExpos = () => {
    return apiClient.get('/expos/present');
};

export const getExpoDetails = (id) => {
    return apiClient.get(`/expos/details/${id}`);
};

export const getPastExpos = () => {
    return apiClient.get('/expos/past');
};

export const getPastExpoDetails = (id) => {
    return apiClient.get(`/expos/past?id=${id}`);
};

export const getUpcomingExpos = () => {
    return apiClient.get('/expos/upcoming');
};

// Master Data APIs
export const getCategories = () => {
    return apiClient.get('/master/categories');
};

export const getProducts = (categoryId = '') => {
    let url = '/master/products';
    if (categoryId) url += `?categoryId=${categoryId}`;
    return apiClient.get(url);
};

export const getAvailableStalls = (expoId) => {
    return apiClient.get(`/master/stalls/${expoId}?availableOnly=true`);
};

// Enquiry APIs
export const createStallEnquiry = (data) => {
    return apiClient.post('/enquiry/stall/create', { ...data, source: 'website' });
};

export const createVisitorEnquiry = (data) => {
    return apiClient.post('/enquiry/visitor/create', { ...data, source: 'website' });
};

export const createInterestEnquiry = (data) => {
    return apiClient.post('/enquiry/interest/create', { ...data, source: 'website' });
};

export const createContactEnquiry = (data) => {
    return apiClient.post('/website/contact/create', data);
};
