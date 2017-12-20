import 'whatwg-fetch';
import * as _ from 'lodash';

class DataApi {
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }

    static fetchData(url) {
        let options = {};
        if (!_.startsWith(url, 'http')) {
            options.protocol = window.location.protocol;
        }
        return new Promise((resolve, reject) => {
            fetch(url, options).then(this.checkStatus).then(response => {
                return response.json();
            }).then(data => {
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    }
}
export default DataApi;
