Vue.component('v-header', {
    template: `<div>
                    <v-logo>
                        <template v-slot:image>
                            logo-image slot
                        </template>
                        <template v-slot:text>
                            logo-text slot
                        </template>
                    </v-logo>
                    
                    <h1>Hello, student!</h1>
                </div>`
});

Vue.component('v-logo', {
    template: `<div class="logo">
                    <p class="logo-image">
                        <slot name="image"></slot>
                    </p>
                    <p class="logo-text">
                        <slot name="text"></slot>
                    </p>
                </div>`
});

const app = new Vue({
    el: "#app",
    data: {

    },
    computed: {

    },
    methods: {

    }
});