function float2str(int, fract = 2) {
    let arr = int.toString().split('.');
    if (arr[1] === undefined) {
        arr[1] = '0';
    }
    arr[1] = arr[1].substring(0, fract).padStart(fract, '0');
    return arr.join('.');
}

function startGen(star) {
    let ret = '';
    for (i = 0; i < Math.floor(star); i++) {
        ret += '<i class="fa fa-star"></i>';
    }
    if (0 < Math.floor(star * 10 - Math.floor(star) * 10)) {

        ret += '<i class="fa fa-star-half-o" aria-hidden="true"></i>';
    }
    return ret;
}
function httpGet(url) {

    return new Promise(function(resolve, reject) {
  
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        if (this.status == 200) {
          resolve(this.response);
        } else {
          var error = new Error(this.statusText);
          error.code = this.status;
          console.log(`url error: ${url}`);
          console.log(error);
          reject(error);
        }
      };
  
      xhr.onerror = function() {
        console.log(`url error: ${url}`);
        console.log("Network Error");
        reject(new Error("Network Error"));
      };
  
      xhr.send();
    });
  
  }