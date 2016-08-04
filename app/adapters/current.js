import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
	findRecord(store, type, id) {
		const url = `${this.host}/latest?base=${id}`;
		return this.ajax(url, 'GET', {});
	}
});
