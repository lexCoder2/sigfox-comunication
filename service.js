const axios = require('axios');
const vars = require('./variables')

const headers = {
  auth: {
    username: vars.username,
    password: vars.password
  },
  withCredentials: true,
};

exports.get = (endpoint, page = '', data = []) => {
  const url = page.length > 0 ? page : vars.url + endpoint;
  return axios.default.get(url, headers)
    .then(httpresponse=> httpresponse.data)
    .then(sigfoxResponse => {
        data = data.concat(sigfoxResponse.data);
        if (sigfoxResponse.paging && sigfoxResponse.paging.next) {
            return wait(() => this.get(endpoint, sigfoxResponse.paging.next, data))
        } else {
        return data;
        }
    })
    .catch(err => console.warn(err));
};
function wait(callback) {
    return new Promise((resolve ) => {
        setTimeout(() => {
         resolve(callback())
        }, 1000)
    });
}
exports.getDevices = () => this.get('devices?deep=true');
exports.getMessagePerDevice = (device, dateUnix) => this.get(`devices/${device}/messages${dateUnix ? '?since=' + dateUnix : ''}`);
