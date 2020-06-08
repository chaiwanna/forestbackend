// import _ from 'lodash';
import axios from 'axios';
import configService from '@/services/configService';
// import utils from '@/helper/utils';

export default {
    async getReport() {
        const url = `${configService.get('apiUrl')}/report/dash_board`;
        return axios
            .get(url, {})
            .then(response => {
                return response.data;
            })
            .catch(e => {
                throw e;
            });
    }
};