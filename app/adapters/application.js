import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
	host: 'http://api.fixer.io'
});
