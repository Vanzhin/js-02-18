const app = new Vue({
	el: '#app',
	data: {
		name: "Niko",
		names: ['mike', 'spike', 'nike']
	},
	methods: {
		clickHandler() {
			console.log("gopa")
		}
	},
	computed: {
		nameToUpperCase() {
			return this.name.toUpperCase()

		}
	}



});