import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
	findRecord(store, type, id, snapshot) {
		const url = `${this.host}/latest?base=${id}`;
		return this.ajax(url, 'GET', {});
	}
});
