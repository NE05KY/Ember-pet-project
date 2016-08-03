import DS from 'ember-data';

export default DS.Model.extend({
	date: DS.attr('date'),
	rates: DS.attr('object'),
	chunkedRates: function () {
		var arrays = [[],[],[]];

		this.get('rates').forEach(function (item, index) {
			arrays[index % 3].push(item);
		});

		return arrays;
	}.property('rates')
});
