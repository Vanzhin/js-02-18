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