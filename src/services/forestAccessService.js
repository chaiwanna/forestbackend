// import _ from 'lodash';
import axios from 'axios';
import configService from '@/services/configService';
// import utils from '@/helper/utils';

export default {
    async getAll() {
        const url = `${configService.get('apiUrl')}/forest_access`;
        return axios
            .get(url, {})
            .then(response => {
                return response.data;
            })
            .catch(e => {
                throw e;
            });
    }

    ,

    async getPaginate(data = {}) {
        const url = `${configService.get('apiUrl')}/forest_access`;
        return axios
            .post(url, data)
            .then(response => {
                return response.data;
            })
            .catch(e => {
                throw e;
            });
    },
    async deleteById(id) {
        const url = `${configService.get('apiUrl')}/forest_access/${id}`;
        return axios
            .delete(url)
            .then(response => {
                return response.data;
            })
            .catch(e => {
                throw e;
            });
    },
    async updateById(id, data) {
        const url = `${configService.get('apiUrl')}/forest_access/${id}`;
        return axios
            .put(url, data)
            .then(response => {
                return response.data;
            })
            .catch(e => {
                throw e;
            });
    }
};