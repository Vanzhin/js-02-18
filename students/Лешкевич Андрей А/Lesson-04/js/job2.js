"use strict";
function job2() {
    document.getElementById("result-02").innerHTML = text.replace(/\r\n|\r|\n/gm, "<br />").replace(/\"/gm,`'`).replace(/(?<!\w)'(?!=\w)/gm,`"<span class="hidden">'</span>`);
}
