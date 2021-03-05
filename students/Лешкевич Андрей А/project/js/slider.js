"use strict";
class CSliderHTML {
    html = null;
    items = {};
    index = 0;
    width = "100%";
    height = "100%";
    constructor(obj, init = {}) {
        if (null !== obj) {
            this.html = obj;
            this.items = init;
            this.index = Math.floor(this.items.length / 2);
            this.clear();
            this.setSizes();
            this.listFillByItems();
            this.visible(this.index);
        } else {
            return null;
        }
    }
    clear() {
        this.html.getElementsByClassName("top-slider-wrap")[0].innerHTML = '';
    }

    listFillByItems() {
        let list = this.html.getElementsByClassName("top-slider-wrap")[0];
        this.items.forEach(function (entry) {
            list.insertAdjacentHTML('beforeend', this.itemGen(entry));
        }, this);
    }

    itemGen(_href) {
        return `
            <div class="top-slider-image top-slider-hidden">
                <a href="${_href}" class="progressive replace">
                    <img src="img/tiny.a1.21.jpg" class="preview" alt="image" style="width: ${this.width}; height: ${this.height}" />
                </a>
            </div>`;
    }

    setSizes() {
        this.width = this.html.getAttribute("data-width");
        this.height = this.html.getAttribute("data-height");
        let list = this.html.getElementsByClassName("top-slider-wrap")[0];
        if (Boolean(this.width)) {
            list.style.width = this.width;
        } else {
            this.width = "100%";
        }
        if (Boolean(this.height)) {
            list.style.height = this.height;
        } else {
            this.height = "100%";
        }
    }
    visible(_id) {

        let list = this.html.getElementsByClassName("top-slider-image")[_id];
        Array.from(this.html.getElementsByClassName("top-slider-image")).forEach(function (element, key) {
            if (key == _id) {
                element.classList.remove("top-slider-hidden");
            } else {
                element.classList.add("top-slider-hidden");
            }
        });
    }
    left() {
        if (0 < this.index) {
            this.index--;
            this.visible(this.index);
            return true;
        }
        return false;
    }
    right() {
        if (this.index < (this.items.length - 1)) {
            this.index++;
            this.visible(this.index);
            return true;
        }
        return false;
    }
}
