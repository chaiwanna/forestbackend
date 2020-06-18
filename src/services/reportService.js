// import _ from 'lodash';
import axios from 'axios';
import configService from '@/services/configService';
// import utils from '@/helper/utils';

export default {
    async getReport(data) {
        let url = `${configService.get('apiUrl')}/report/dash_board`;
        if (data) {
            url = `${configService.get('apiUrl')}/report/dash_board?param=${data}`;
        }
        return axios
            .get(url, {})
            .then(response => {
                return response.data;
            })
            .catch(e => {
                throw e;
            });
    },

    async getExcel(data = '') {
        const url = `${configService.get('apiUrl')}/report/create_excel?param=${data}`;
        return url
    },

    async getGraph(data) {
        const url = `${configService.get('apiUrl')}/report/get_graph`;
        return axios
            .post(url, data)
            .then(response => {
                return response.data;
            })
            .catch(e => {
                throw e;
            });
    },
    async getMapDetail(data) {
        const url = `${configService.get('apiUrl')}/report/get_map_detail`;
        return axios
            .post(url, data)
            .then(response => {
                return response.data;
            })
            .catch(e => {
                throw e;
            });
    },
    async getGraphObj(data) {
        const url = `${configService.get('apiUrl')}/report/get_graph_obj`;
        return axios
            .post(url, data)
            .then(response => {
                return response.data;
            })
            .catch(e => {
                throw e;
            });
    },
    async getExcelGraph(data = '') {
        const url = `${configService.get('apiUrl')}/report/get_graph/excel?param=${data}`;
        return url
    },
    async getExcelObj(data = '') {
        const url = `${configService.get('apiUrl')}/report/get_graph_obj/excel?param=${data}`;
        return url
    }

};