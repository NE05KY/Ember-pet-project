import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
	primaryKey: 'base',

	normalizeFindRecordResponse(store, type, payload) {
		return {
			data: {
				id: payload.base,
				type: type.modelName,
				attributes: {
					date: payload.date,
					rates: payload.rates
				}
			}
		}
	}
});
