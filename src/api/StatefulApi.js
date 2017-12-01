import 'whatwg-fetch';

class StatefulApi {
    static getVersion(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(response => {
                return response.json();
            }).then(results => {
                resolve(results);
            }).catch(error => {
                reject(error);
            });
        });
    }

    static getState(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(response => {
                return response.json();
            }).then(results => {
                resolve(results);
            }).catch(error => {
                reject(error);
            });
        });
    }

    static setState(url, data) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                return response.json();
            }).then(results => {
                resolve(results);
            }).catch(error => {
                reject(error);
            });
        });
    }
}
export default StatefulApi;
