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
        const parser = window.document.createElement('a');
        parser.href = url;
        url = parser.protocol === ':' ? `//${url}` : url;
        return new Promise((resolve, reject) => {
            fetch(url).then(this.checkStatus).then(response => {
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
