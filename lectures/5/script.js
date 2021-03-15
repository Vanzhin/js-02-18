const app = new Vue({
    el: '#app',
    data: {
        foo: 'bar',
        someNumber: 10,
        someArray: [
            10,
            20,
            30,
            40,
            50
        ],
        someObject: {
            param1: 'value1',
            param2: 'value2',
            param3: 'value3',
            param4: 'value4',
            param5: 'value5',
        },
        user: {
            name: 'Geek',
            lastName: 'Brains',
            fatherName: 'Studentovich',
        }
    },
    computed: {
        isFooValid() {
            console.log('isFooValid', this.foo);
            return this.foo.length > 1;
        },
        fullName() {
            return [
                this.user.name, 
                this.user.lastName,
                this.user.fatherName
            ].join(' ');
        }
    },
    methods: {
        checkLength() {
            console.log('foo', this.foo);
            return this.foo.length > 1;
        },
        handleButtonClick(e) {
            console.log('click', e);
        },
    },
    created() {
        console.log('created', this);
    },
    mounted() {
        console.log('mounted', this);
    },
    updated() {
        console.log('updated', this);
    },
});
