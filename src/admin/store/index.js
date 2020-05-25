import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		field_settings: window.base_plugin.field_settings,
		panel_sections: window.base_plugin.panel_sections,
		form_fields: []
	},

	getters: {
		field_settings(state) {
			return state.field_settings;
		},
		panel_sections(state) {
			return state.panel_sections;
		},
		form_fields(state) {
			return state.form_fields;
		}
	},

	mutations: {
		add_field(state, payload) {
			return state.form_fields.push( state.field_settings[payload]);
		}
	},
	actions: {
		add_field(context, payload) {
			context.commit('add_field', payload);
		},
	}
});

export default store;
