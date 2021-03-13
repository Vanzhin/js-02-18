"use strict";

function job1() {
    document.getElementById("result-01").innerHTML = text.replace(/\r\n|\r|\n/gm, "<br />").replace(/\"/gm,`'`).replace(/\'/gm,`"<span class="hidden">'</span>`);
}
