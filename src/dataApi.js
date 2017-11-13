import 'whatwg-fetch';

class DataApi {
    static fetchData(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(response => {
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
