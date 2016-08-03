import DS from 'ember-data';

export default DS.Model.extend({
	date: DS.attr('date'),
	rates: DS.attr('object')
});
