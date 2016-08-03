import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		update() {
			var self = this;
			Ember.set(self, 'currentlyLoading', true);
			componentHandler.upgradeElement($('.mdl-spinner')[0]);
			this.model.reload().finally(function () {
				Ember.set(self, 'currentlyLoading', false);
			});
		}
	}
});
