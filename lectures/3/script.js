
const request = (path = '', callback, method = 'GET', body) => {
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            console.log({ response: xhr.responseText });
            callback(xhr.responseText);
        }
    }
    
    xhr.open(method, path);
    
    xhr.send(body);
}

/*
request('https://example.com/1', (data) => {
    request('https://example.com/2', (anotherData) => {
        request('https://example.com/3', (someData) => {
            
        });
    });
});
*/

/* Promise
// pending
// fulfilled
// rejected
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (code !== 200) {
            reject(errorDat);
        }
        resolve(data);
    }, 1000);
});
*/
let sum = 0;
const add = (inc) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if ((sum + inc) > 15) {
                reject('Some Error message');
            } else {
                sum += inc;
                resolve(sum);
            }
        }, 1000);
    });
}

add(5)
    .then(
        (dataFromAdd1) => {
            console.log('first then ', dataFromAdd1);
            return add(7);
        },
        (errorFromAdd1) => {
            console.log('first then error', errorFromAdd1);
        }
    )
    .then((dataFromAdd2) => {
        console.log('second then ', dataFromAdd2);
        return add(10);
    })
    .then((dataFromAdd3) => {
        console.log('third then ', dataFromAdd3);
        return add(7);
    })
    .catch((dataFromReject) => {
        console.log('Catch', dataFromReject);
    });
