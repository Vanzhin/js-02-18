// // const async = (a, callback) => {
// //     setTimeout(() => {
// //         const b = a + 1;
// //         callback(b);
// //     }, 200);
// // }

// // async(5, (b) => {console.log(b)});

// function async (a) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if(a) {
//                 const b = a + 1;
//                 resolve(b);
//             } else {
//                 reject('error!');
//             }
//         }, 2000);
//     });
// }

// async(5).then((b) => {
//     console.log(b)
// }, (error) => {
//     console.log(error)
// });

// async().then((b) => {
//     console.log(b)
// }, (error) => {
//     console.log(error)
// });



const promise1 = new Promise ((res, rej) => {
    res('Promise1 выполнен');
});

const promise2 = new Promise ((res, rej) => {
    res('Promise2 выполнен');
});

const promise3 = new Promise ((res, rej) => {
    rej('Promise3 отклонен');
});

promise1.then(
    (data) => {
        console.log(data);
        return promise2;
    })
    .then((data) => {
        console.log(data);
        return promise3;
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });



