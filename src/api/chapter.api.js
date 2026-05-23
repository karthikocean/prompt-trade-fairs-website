import apiClient from '../config/apiClient';

export const getChaptersList = (page = 0, limit = 50, search = '') => {
    return apiClient.get('/chapters', {
        params: {
            page,
            limit,
            search
        }
    });
};

export const getChapterById = (id) => {
    return apiClient.get(`/chapters/${id}`);
};

export const getChapterRolesAndEdRd = (id) => {
    return apiClient.get(`/chapters/chapter/roles-and-ed-rd/${id}`);
};
