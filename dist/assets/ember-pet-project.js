"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('ember-pet-project/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].JSONAPIAdapter.extend({
		host: 'https://api.fixer.io'
	});
});
define('ember-pet-project/adapters/current', ['exports', 'ember-pet-project/adapters/application'], function (exports, _emberPetProjectAdaptersApplication) {
	exports['default'] = _emberPetProjectAdaptersApplication['default'].extend({
		findRecord: function findRecord(store, type, id) {
			var url = this.host + '/latest?base=' + id;
			return this.ajax(url, 'GET', {});
		}
	});
});
define('ember-pet-project/adapters/history', ['exports', 'ember-pet-project/adapters/application'], function (exports, _emberPetProjectAdaptersApplication) {
  exports['default'] = _emberPetProjectAdaptersApplication['default'].extend({});
});
define('ember-pet-project/app', ['exports', 'ember', 'ember-pet-project/resolver', 'ember-load-initializers', 'ember-pet-project/config/environment'], function (exports, _ember, _emberPetProjectResolver, _emberLoadInitializers, _emberPetProjectConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _emberPetProjectConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emberPetProjectConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberPetProjectResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _emberPetProjectConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ember-pet-project/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'ember-pet-project/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _emberPetProjectConfigEnvironment) {

  var name = _emberPetProjectConfigEnvironment['default'].APP.name;
  var version = _emberPetProjectConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('ember-pet-project/controllers/current', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		actions: {
			update: function update() {
				var self = this;
				_ember['default'].set(self, 'currentlyLoading', true);
				// componentHandler.upgradeElement($('.mdl-spinner')[0]);
				this.model.reload()['finally'](function () {
					_ember['default'].set(self, 'currentlyLoading', false);
				});
			}
		}
	});
});
define('ember-pet-project/controllers/history', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('ember-pet-project/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ember-pet-project/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('ember-pet-project/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-pet-project/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _emberPetProjectConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_emberPetProjectConfigEnvironment['default'].APP.name, _emberPetProjectConfigEnvironment['default'].APP.version)
  };
});
define('ember-pet-project/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-pet-project/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ember-pet-project/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ember-pet-project/initializers/export-application-global', ['exports', 'ember', 'ember-pet-project/config/environment'], function (exports, _ember, _emberPetProjectConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_emberPetProjectConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _emberPetProjectConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_emberPetProjectConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-pet-project/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('ember-pet-project/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('ember-pet-project/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("ember-pet-project/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ember-pet-project/models/current', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		date: _emberData['default'].attr('date'),
		rates: _emberData['default'].attr(),
		chunkedRates: (function () {
			var arrays = [[], [], []];

			this.get('rates').forEach(function (item, index) {
				arrays[index % 3].push(item);
			});

			return arrays;
		}).property('rates')
	});
});
define('ember-pet-project/models/history', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({});
});
define('ember-pet-project/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ember-pet-project/router', ['exports', 'ember', 'ember-pet-project/config/environment'], function (exports, _ember, _emberPetProjectConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _emberPetProjectConfigEnvironment['default'].locationType,
    rootURL: _emberPetProjectConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('current');
    this.route('history');
  });

  exports['default'] = Router;
});
define('ember-pet-project/routes/current', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return this.get('store').findRecord('current', 'USD');
		},
		actions: {
			loading: function loading(transition) {
				var controller = this.controllerFor('current');
				controller.set('currentlyLoading', true);
				transition.promise['finally'](function () {
					controller.set('currentlyLoading', false);
				});
			}
		}
	});
});
define('ember-pet-project/routes/history', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ember-pet-project/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ember-pet-project/serializers/current', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].JSONAPISerializer.extend({
		primaryKey: 'base',

		normalizeFindRecordResponse: function normalizeFindRecordResponse(store, type, payload) {
			return {
				data: {
					id: payload.base,
					type: type.modelName,
					attributes: {
						date: payload.date,
						rates: (function () {
							var array = [];

							for (var item in payload.rates) {
								array.push({ base: item, currency: payload.rates[item] });
							}

							return array;
						})()
					}
				}
			};
		}
	});
});
define('ember-pet-project/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("ember-pet-project/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.7.0",
          "loc": {
            "source": null,
            "start": {
              "line": 43,
              "column": 3
            },
            "end": {
              "line": 46,
              "column": 3
            }
          },
          "moduleName": "ember-pet-project/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el1, "role", "presentation");
          var el2 = dom.createTextNode("home");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n				Home\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.7.0",
          "loc": {
            "source": null,
            "start": {
              "line": 47,
              "column": 3
            },
            "end": {
              "line": 50,
              "column": 3
            }
          },
          "moduleName": "ember-pet-project/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el1, "role", "presentation");
          var el2 = dom.createTextNode("report");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n				Current\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.7.0",
          "loc": {
            "source": null,
            "start": {
              "line": 51,
              "column": 3
            },
            "end": {
              "line": 54,
              "column": 3
            }
          },
          "moduleName": "ember-pet-project/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "mdl-color-text--blue-grey-400 material-icons");
          dom.setAttribute(el1, "role", "presentation");
          var el2 = dom.createTextNode("flag");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n				History\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.7.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 62,
            "column": 6
          }
        },
        "moduleName": "ember-pet-project/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("header");
        dom.setAttribute(el2, "class", "demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-layout__header-row");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "mdl-layout-title");
        var el5 = dom.createTextNode("Currency application");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "mdl-layout-spacer");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "mdl-textfield mdl-js-textfield mdl-textfield--expandable");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "class", "mdl-button mdl-js-button mdl-button--icon");
        dom.setAttribute(el5, "for", "search");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "material-icons");
        var el7 = dom.createTextNode("search");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "mdl-textfield__expandable-holder");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("input");
        dom.setAttribute(el6, "class", "mdl-textfield__input");
        dom.setAttribute(el6, "type", "text");
        dom.setAttribute(el6, "id", "search");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "class", "mdl-textfield__label");
        dom.setAttribute(el6, "for", "search");
        var el7 = dom.createTextNode("Enter your query...");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "class", "mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon");
        dom.setAttribute(el4, "id", "hdrbtn");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "material-icons");
        var el6 = dom.createTextNode("more_vert");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4, "class", "mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right");
        dom.setAttribute(el4, "for", "hdrbtn");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5, "class", "mdl-menu__item");
        var el6 = dom.createTextNode("About");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5, "class", "mdl-menu__item");
        var el6 = dom.createTextNode("Contact");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        dom.setAttribute(el5, "class", "mdl-menu__item");
        var el6 = dom.createTextNode("Legal information");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("header");
        dom.setAttribute(el3, "class", "demo-drawer-header");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4, "src", "images/user.jpg");
        dom.setAttribute(el4, "class", "demo-avatar");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "demo-avatar-dropdown");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        var el6 = dom.createTextNode("hello@example.com");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "mdl-layout-spacer");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "id", "accbtn");
        dom.setAttribute(el5, "class", "mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("i");
        dom.setAttribute(el6, "class", "material-icons");
        dom.setAttribute(el6, "role", "presentation");
        var el7 = dom.createTextNode("arrow_drop_down");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "class", "visuallyhidden");
        var el7 = dom.createTextNode("Accounts");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("ul");
        dom.setAttribute(el5, "class", "mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect");
        dom.setAttribute(el5, "for", "accbtn");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "class", "mdl-menu__item");
        var el7 = dom.createTextNode("hello@example.com");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "class", "mdl-menu__item");
        var el7 = dom.createTextNode("info@example.com");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("li");
        dom.setAttribute(el6, "class", "mdl-menu__item");
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "material-icons");
        var el8 = dom.createTextNode("add");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("Add another account...");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("nav");
        dom.setAttribute(el3, "class", "demo-navigation mdl-navigation mdl-color--blue-grey-800");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("main");
        dom.setAttribute(el2, "class", "mdl-layout__content mdl-color--grey-100");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-grid demo-content");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3, 3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createMorphAt(element1, 2, 2);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [5, 1]), 1, 1);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], ["class", "mdl-navigation__link"], 0, null, ["loc", [null, [43, 3], [46, 15]]]], ["block", "link-to", ["current"], ["class", "mdl-navigation__link"], 1, null, ["loc", [null, [47, 3], [50, 15]]]], ["block", "link-to", ["history"], ["class", "mdl-navigation__link"], 2, null, ["loc", [null, [51, 3], [54, 15]]]], ["content", "outlet", ["loc", [null, [59, 3], [59, 13]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("ember-pet-project/templates/current", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.7.0",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 1
            },
            "end": {
              "line": 10,
              "column": 1
            }
          },
          "moduleName": "ember-pet-project/templates/current.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "mdl-spinner mdl-js-spinner is-active");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.7.0",
            "loc": {
              "source": null,
              "start": {
                "line": 21,
                "column": 3
              },
              "end": {
                "line": 26,
                "column": 3
              }
            },
            "moduleName": "ember-pet-project/templates/current.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("				");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("tr");
            var el2 = dom.createTextNode("\n					");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            dom.setAttribute(el2, "class", "mdl-data-table__cell--non-numeric");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n					");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("td");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n				");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
            morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
            return morphs;
          },
          statements: [["content", "rate.base", ["loc", [null, [23, 51], [23, 64]]], 0, 0, 0, 0], ["content", "rate.currency", ["loc", [null, [24, 9], [24, 26]]], 0, 0, 0, 0]],
          locals: ["rate"],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.7.0",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 1
            },
            "end": {
              "line": 29,
              "column": 1
            }
          },
          "moduleName": "ember-pet-project/templates/current.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1, "class", "mdl-data-table mdl-js-data-table");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n			");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n				");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "class", "mdl-data-table__cell--non-numeric");
          var el5 = dom.createTextNode("Currency");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n				");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          var el5 = dom.createTextNode("Rate");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n			");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n			");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("			");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "chunk", ["loc", [null, [21, 11], [21, 16]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [21, 3], [26, 12]]]]],
        locals: ["chunk"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.7.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 31,
            "column": 0
          }
        },
        "moduleName": "ember-pet-project/templates/current.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "mdl-cell mdl-cell--12-col current-page");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "class", "mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--fab mdl-color--accent");
        dom.setAttribute(el2, "data-upgraded", ",MaterialButton,MaterialRipple");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("i");
        dom.setAttribute(el3, "class", "material-icons mdl-color-text--white");
        dom.setAttribute(el3, "role", "presentation");
        var el4 = dom.createTextNode("autorenew");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "visuallyhidden");
        var el4 = dom.createTextNode("autorenew");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "mdl-button__ripple-container");
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "mdl-ripple");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var element2 = dom.childAt(element1, [1]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element2);
        morphs[1] = dom.createMorphAt(element1, 3, 3);
        morphs[2] = dom.createMorphAt(element1, 5, 5);
        return morphs;
      },
      statements: [["element", "action", ["update"], [], ["loc", [null, [2, 9], [2, 28]]], 0, 0], ["block", "if", [["get", "currentlyLoading", ["loc", [null, [8, 7], [8, 23]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [8, 1], [10, 8]]]], ["block", "each", [["get", "model.chunkedRates", ["loc", [null, [12, 9], [12, 27]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [12, 1], [29, 10]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("ember-pet-project/templates/history", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.7.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 160,
            "column": 6
          }
        },
        "moduleName": "ember-pet-project/templates/history.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el2 = dom.createElement("svg");
        dom.setAttribute(el2, "fill", "currentColor");
        dom.setAttribute(el2, "width", "200px");
        dom.setAttribute(el2, "height", "200px");
        dom.setAttribute(el2, "viewBox", "0 0 1 1");
        dom.setAttribute(el2, "class", "demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("use");
        dom.setAttribute(el3, "xmlns:xlink", "http://www.w3.org/1999/xlink");
        dom.setAttributeNS(el3, "http://www.w3.org/1999/xlink", "xlink:href", "#piechart");
        dom.setAttribute(el3, "mask", "url(#piemask)");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("text");
        dom.setAttribute(el3, "x", "0.5");
        dom.setAttribute(el3, "y", "0.5");
        dom.setAttribute(el3, "font-family", "Roboto");
        dom.setAttribute(el3, "font-size", "0.3");
        dom.setAttribute(el3, "fill", "#888");
        dom.setAttribute(el3, "text-anchor", "middle");
        dom.setAttribute(el3, "dy", "0.1");
        var el4 = dom.createTextNode("82\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tspan");
        dom.setAttribute(el4, "font-size", "0.2");
        dom.setAttribute(el4, "dy", "-0.07");
        var el5 = dom.createTextNode("%");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("svg");
        dom.setAttribute(el2, "fill", "currentColor");
        dom.setAttribute(el2, "width", "200px");
        dom.setAttribute(el2, "height", "200px");
        dom.setAttribute(el2, "viewBox", "0 0 1 1");
        dom.setAttribute(el2, "class", "demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("use");
        dom.setAttribute(el3, "xmlns:xlink", "http://www.w3.org/1999/xlink");
        dom.setAttributeNS(el3, "http://www.w3.org/1999/xlink", "xlink:href", "#piechart");
        dom.setAttribute(el3, "mask", "url(#piemask)");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("text");
        dom.setAttribute(el3, "x", "0.5");
        dom.setAttribute(el3, "y", "0.5");
        dom.setAttribute(el3, "font-family", "Roboto");
        dom.setAttribute(el3, "font-size", "0.3");
        dom.setAttribute(el3, "fill", "#888");
        dom.setAttribute(el3, "text-anchor", "middle");
        dom.setAttribute(el3, "dy", "0.1");
        var el4 = dom.createTextNode("82\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tspan");
        dom.setAttribute(el4, "dy", "-0.07");
        dom.setAttribute(el4, "font-size", "0.2");
        var el5 = dom.createTextNode("%");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("svg");
        dom.setAttribute(el2, "fill", "currentColor");
        dom.setAttribute(el2, "width", "200px");
        dom.setAttribute(el2, "height", "200px");
        dom.setAttribute(el2, "viewBox", "0 0 1 1");
        dom.setAttribute(el2, "class", "demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("use");
        dom.setAttribute(el3, "xmlns:xlink", "http://www.w3.org/1999/xlink");
        dom.setAttributeNS(el3, "http://www.w3.org/1999/xlink", "xlink:href", "#piechart");
        dom.setAttribute(el3, "mask", "url(#piemask)");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("text");
        dom.setAttribute(el3, "x", "0.5");
        dom.setAttribute(el3, "y", "0.5");
        dom.setAttribute(el3, "font-family", "Roboto");
        dom.setAttribute(el3, "font-size", "0.3");
        dom.setAttribute(el3, "fill", "#888");
        dom.setAttribute(el3, "text-anchor", "middle");
        dom.setAttribute(el3, "dy", "0.1");
        var el4 = dom.createTextNode("82\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tspan");
        dom.setAttribute(el4, "dy", "-0.07");
        dom.setAttribute(el4, "font-size", "0.2");
        var el5 = dom.createTextNode("%");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("svg");
        dom.setAttribute(el2, "fill", "currentColor");
        dom.setAttribute(el2, "width", "200px");
        dom.setAttribute(el2, "height", "200px");
        dom.setAttribute(el2, "viewBox", "0 0 1 1");
        dom.setAttribute(el2, "class", "demo-chart mdl-cell mdl-cell--4-col mdl-cell--3-col-desktop");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("use");
        dom.setAttribute(el3, "xmlns:xlink", "http://www.w3.org/1999/xlink");
        dom.setAttributeNS(el3, "http://www.w3.org/1999/xlink", "xlink:href", "#piechart");
        dom.setAttribute(el3, "mask", "url(#piemask)");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("text");
        dom.setAttribute(el3, "x", "0.5");
        dom.setAttribute(el3, "y", "0.5");
        dom.setAttribute(el3, "font-family", "Roboto");
        dom.setAttribute(el3, "font-size", "0.3");
        dom.setAttribute(el3, "fill", "#888");
        dom.setAttribute(el3, "text-anchor", "middle");
        dom.setAttribute(el3, "dy", "0.1");
        var el4 = dom.createTextNode("82\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tspan");
        dom.setAttribute(el4, "dy", "-0.07");
        dom.setAttribute(el4, "font-size", "0.2");
        var el5 = dom.createTextNode("%");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        dom.setNamespace(null);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el2 = dom.createElement("svg");
        dom.setAttribute(el2, "fill", "currentColor");
        dom.setAttribute(el2, "viewBox", "0 0 500 250");
        dom.setAttribute(el2, "class", "demo-graph");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("use");
        dom.setAttributeNS(el3, "http://www.w3.org/1999/xlink", "xlink:href", "#chart");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("svg");
        dom.setAttribute(el2, "fill", "currentColor");
        dom.setAttribute(el2, "viewBox", "0 0 500 250");
        dom.setAttribute(el2, "class", "demo-graph");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("use");
        dom.setAttributeNS(el3, "http://www.w3.org/1999/xlink", "xlink:href", "#chart");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        dom.setNamespace(null);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-card__title mdl-card--expand mdl-color--teal-300");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        dom.setAttribute(el4, "class", "mdl-card__title-text");
        var el5 = dom.createTextNode("Updates");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-card__supporting-text mdl-color-text--grey-600");
        var el4 = dom.createTextNode("\n			Non dolore elit adipisicing ea reprehenderit consectetur culpa.\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-card__actions mdl-card--border");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "#");
        dom.setAttribute(el4, "class", "mdl-button mdl-js-button mdl-js-ripple-effect");
        var el5 = dom.createTextNode("Read More");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "demo-separator mdl-cell--1-col");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "demo-options mdl-card mdl-color--deep-purple-500 mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-card__supporting-text mdl-color-text--blue-grey-50");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        var el5 = dom.createTextNode("View options");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "chkbox1");
        dom.setAttribute(el6, "class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("input");
        dom.setAttribute(el7, "type", "checkbox");
        dom.setAttribute(el7, "id", "chkbox1");
        dom.setAttribute(el7, "class", "mdl-checkbox__input");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "mdl-checkbox__label");
        var el8 = dom.createTextNode("Click per object");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "chkbox2");
        dom.setAttribute(el6, "class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("input");
        dom.setAttribute(el7, "type", "checkbox");
        dom.setAttribute(el7, "id", "chkbox2");
        dom.setAttribute(el7, "class", "mdl-checkbox__input");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "mdl-checkbox__label");
        var el8 = dom.createTextNode("Views per object");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "chkbox3");
        dom.setAttribute(el6, "class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("input");
        dom.setAttribute(el7, "type", "checkbox");
        dom.setAttribute(el7, "id", "chkbox3");
        dom.setAttribute(el7, "class", "mdl-checkbox__input");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "mdl-checkbox__label");
        var el8 = dom.createTextNode("Objects selected");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createTextNode("\n					");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        dom.setAttribute(el6, "for", "chkbox4");
        dom.setAttribute(el6, "class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect");
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("input");
        dom.setAttribute(el7, "type", "checkbox");
        dom.setAttribute(el7, "id", "chkbox4");
        dom.setAttribute(el7, "class", "mdl-checkbox__input");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n						");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("span");
        dom.setAttribute(el7, "class", "mdl-checkbox__label");
        var el8 = dom.createTextNode("Objects viewed");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n					");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "mdl-card__actions mdl-card--border");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "href", "#");
        dom.setAttribute(el4, "class", "mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--blue-grey-50");
        var el5 = dom.createTextNode("Change\n				location");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "mdl-layout-spacer");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "material-icons");
        var el5 = dom.createTextNode("location_on");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        dom.setNamespace("http://www.w3.org/2000/svg");
        var el1 = dom.createElement("svg");
        dom.setAttribute(el1, "xmlns", "http://www.w3.org/2000/svg");
        dom.setAttribute(el1, "xmlns:xlink", "http://www.w3.org/1999/xlink");
        dom.setAttribute(el1, "version", "1.1");
        dom.setAttribute(el1, "style", "position: fixed; left: -1000px; height: -1000px;");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("defs");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("mask");
        dom.setAttribute(el3, "id", "piemask");
        dom.setAttribute(el3, "maskContentUnits", "objectBoundingBox");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("circle");
        dom.setAttribute(el4, "cx", "0.5");
        dom.setAttribute(el4, "cy", "0.5");
        dom.setAttribute(el4, "r", "0.49");
        dom.setAttribute(el4, "fill", "white");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("circle");
        dom.setAttribute(el4, "cx", "0.5");
        dom.setAttribute(el4, "cy", "0.5");
        dom.setAttribute(el4, "r", "0.40");
        dom.setAttribute(el4, "fill", "black");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("g");
        dom.setAttribute(el3, "id", "piechart");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("circle");
        dom.setAttribute(el4, "cx", "0.5");
        dom.setAttribute(el4, "cy", "0.5");
        dom.setAttribute(el4, "r", "0.5");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("path");
        dom.setAttribute(el4, "d", "M 0.5 0.5 0.5 0 A 0.5 0.5 0 0 1 0.95 0.28 z");
        dom.setAttribute(el4, "stroke", "none");
        dom.setAttribute(el4, "fill", "rgba(255, 255, 255, 0.75)");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("svg");
        dom.setAttribute(el1, "version", "1.1");
        dom.setAttribute(el1, "xmlns", "http://www.w3.org/2000/svg");
        dom.setAttribute(el1, "xmlns:xlink", "http://www.w3.org/1999/xlink");
        dom.setAttribute(el1, "viewBox", "0 0 500 250");
        dom.setAttribute(el1, "style", "position: fixed; left: -1000px; height: -1000px;");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("defs");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("g");
        dom.setAttribute(el3, "id", "chart");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("g");
        dom.setAttribute(el4, "id", "Gridlines");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("line");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "stroke", "#888888");
        dom.setAttribute(el5, "stroke-miterlimit", "10");
        dom.setAttribute(el5, "x1", "0");
        dom.setAttribute(el5, "y1", "27.3");
        dom.setAttribute(el5, "x2", "468.3");
        dom.setAttribute(el5, "y2", "27.3");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("line");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "stroke", "#888888");
        dom.setAttribute(el5, "stroke-miterlimit", "10");
        dom.setAttribute(el5, "x1", "0");
        dom.setAttribute(el5, "y1", "66.7");
        dom.setAttribute(el5, "x2", "468.3");
        dom.setAttribute(el5, "y2", "66.7");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("line");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "stroke", "#888888");
        dom.setAttribute(el5, "stroke-miterlimit", "10");
        dom.setAttribute(el5, "x1", "0");
        dom.setAttribute(el5, "y1", "105.3");
        dom.setAttribute(el5, "x2", "468.3");
        dom.setAttribute(el5, "y2", "105.3");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("line");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "stroke", "#888888");
        dom.setAttribute(el5, "stroke-miterlimit", "10");
        dom.setAttribute(el5, "x1", "0");
        dom.setAttribute(el5, "y1", "144.7");
        dom.setAttribute(el5, "x2", "468.3");
        dom.setAttribute(el5, "y2", "144.7");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("line");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "stroke", "#888888");
        dom.setAttribute(el5, "stroke-miterlimit", "10");
        dom.setAttribute(el5, "x1", "0");
        dom.setAttribute(el5, "y1", "184.3");
        dom.setAttribute(el5, "x2", "468.3");
        dom.setAttribute(el5, "y2", "184.3");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("g");
        dom.setAttribute(el4, "id", "Numbers");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 485 29.3333)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("500\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 485 69)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("400");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 485 109.3333)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("300\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 485 149)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("200");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 485 188.3333)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("100\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 0 249.0003)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("1\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 78 249.0003)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("2\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 154.6667 249.0003)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("\n					3\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 232.1667 249.0003)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("\n					4\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 309 249.0003)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("5\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 386.6667 249.0003)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("\n					6\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("text");
        dom.setAttribute(el5, "transform", "matrix(1 0 0 1 464.3333 249.0003)");
        dom.setAttribute(el5, "fill", "#888888");
        dom.setAttribute(el5, "font-family", "'Roboto'");
        dom.setAttribute(el5, "font-size", "9");
        var el6 = dom.createTextNode("\n					7\n				");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("g");
        dom.setAttribute(el4, "id", "Layer_5");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("polygon");
        dom.setAttribute(el5, "opacity", "0.36");
        dom.setAttribute(el5, "stroke-miterlimit", "10");
        dom.setAttribute(el5, "points", "0,223.3 48,138.5 154.7,169 211,88.5\n              294.5,80.5 380,165.2 437,75.5 469.5,223.3 	");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("g");
        dom.setAttribute(el4, "id", "Layer_4");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("polygon");
        dom.setAttribute(el5, "stroke-miterlimit", "10");
        dom.setAttribute(el5, "points", "469.3,222.7 1,222.7 48.7,166.7 155.7,188.3 212,132.7\n              296.7,128 380.7,184.3 436.7,125 	");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("ember-pet-project/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.7.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 19
          }
        },
        "moduleName": "ember-pet-project/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Index page");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('ember-pet-project/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-pet-project';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("ember-pet-project/app")["default"].create({"name":"ember-pet-project","version":"0.0.0+6f016697"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-pet-project.map