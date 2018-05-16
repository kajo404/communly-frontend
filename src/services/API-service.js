export default class APIService {
  static setHeaders() {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    return new Headers(headersConfig);
  }

  static post(url, data, onSuccess, onError) {
    // let token = window.localStorage['jwtToken'];
    const header = this.setHeaders();
    fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(data)
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        // else if (this.checkIfUnauthorized(resp)) {
        //     window.location = "/#login";
        // }
        else {
          resp.json().then(json => {
            onError(json.error);
          });
        }
      })
      .then(resp => {
        // if (resp.hasOwnProperty('token')) {
        //     window.localStorage['jwtToken'] = resp.token;
        // }
        onSuccess(resp);
      })
      .catch(e => {
        console.log('rejected');
        onError(e.message);
      });
  }
}
