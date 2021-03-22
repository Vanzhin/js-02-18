Vue.component('v-header', {
    template: `<div>
        Foo is {{ foo }}

        <v-logo>
            <template v-slot:image>
                Logo image slot 1
            </template>

            <template v-slot:text>
                Logo text slot 1
            </template>

            logo default slot
        </v-logo>

        V-body:
        <v-body v-bind:content="inputValue" v-on:change="handleInput" />
    </div>`,
    data() {
        return {
            foo: 'bar',
            inputValue: 'default value'
        };
    },
    methods: {
        handleInput(value) {
            this.inputValue = value;
        }
    }
});

Vue.component('v-logo', {
    template: `<div class="logo">
        <div class="logo-image"><slot name="image" /></div>
        <div class="logo-text"><slot name="text" /></div>
        <div class="logo-other"><slot /></div>
    </div>`
});

Vue.component('v-body', {
    props: ['content'],
    template: `
        <div>
            <div>{{ content }}</div>
            <input type="text" v-bind:value="content" v-on:input="handleInput" />
        </div>
    `,
    methods: {
        handleInput(e) {
            this.$emit('change', e.target.value);
        }
    }
});

const app = new Vue({
    el: '#app',
    data: {
       
    },
    computed: {

    },
    methods: {

    }
});
