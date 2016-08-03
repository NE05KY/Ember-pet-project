import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return this.get('store').findRecord('current', 'USD');
	},
	actions: {
		loading(transition, originRoute) {
			let controller = this.controllerFor('current');
			controller.set('currentlyLoading', true);
			transition.promise.finally(function () {
				controller.set('currentlyLoading', false);
			});
		}
	}
});