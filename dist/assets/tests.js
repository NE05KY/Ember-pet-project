define('ember-pet-project/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('ember-pet-project/tests/adapters/current.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/current.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/current.js should pass jshint.');
  });
});
define('ember-pet-project/tests/adapters/history.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/history.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/history.js should pass jshint.');
  });
});
define('ember-pet-project/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('ember-pet-project/tests/controllers/current.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/current.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/current.js should pass jshint.');
  });
});
define('ember-pet-project/tests/controllers/history.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/history.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/history.js should pass jshint.');
  });
});
define('ember-pet-project/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('ember-pet-project/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('ember-pet-project/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'ember-pet-project/tests/helpers/start-app', 'ember-pet-project/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _emberPetProjectTestsHelpersStartApp, _emberPetProjectTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _emberPetProjectTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _emberPetProjectTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('ember-pet-project/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('ember-pet-project/tests/helpers/resolver', ['exports', 'ember-pet-project/resolver', 'ember-pet-project/config/environment'], function (exports, _emberPetProjectResolver, _emberPetProjectConfigEnvironment) {

  var resolver = _emberPetProjectResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _emberPetProjectConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emberPetProjectConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('ember-pet-project/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('ember-pet-project/tests/helpers/start-app', ['exports', 'ember', 'ember-pet-project/app', 'ember-pet-project/config/environment'], function (exports, _ember, _emberPetProjectApp, _emberPetProjectConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _emberPetProjectConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _emberPetProjectApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('ember-pet-project/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('ember-pet-project/tests/models/current.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/current.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/current.js should pass jshint.');
  });
});
define('ember-pet-project/tests/models/history.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/history.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/history.js should pass jshint.');
  });
});
define('ember-pet-project/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('ember-pet-project/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('ember-pet-project/tests/routes/current.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/current.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/current.js should pass jshint.');
  });
});
define('ember-pet-project/tests/routes/history.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/history.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/history.js should pass jshint.');
  });
});
define('ember-pet-project/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('ember-pet-project/tests/serializers/current.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | serializers/current.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/current.js should pass jshint.');
  });
});
define('ember-pet-project/tests/test-helper', ['exports', 'ember-pet-project/tests/helpers/resolver', 'ember-qunit'], function (exports, _emberPetProjectTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_emberPetProjectTestsHelpersResolver['default']);
});
define('ember-pet-project/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('ember-pet-project/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('ember-pet-project/tests/unit/adapters/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/adapters/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.');
  });
});
define('ember-pet-project/tests/unit/adapters/current-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:current', 'Unit | Adapter | current', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('ember-pet-project/tests/unit/adapters/current-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/adapters/current-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/current-test.js should pass jshint.');
  });
});
define('ember-pet-project/tests/unit/adapters/history-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:history', 'Unit | Adapter | history', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('ember-pet-project/tests/unit/adapters/history-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/adapters/history-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/history-test.js should pass jshint.');
  });
});
define('ember-pet-project/tests/unit/controllers/current-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:current', 'Unit | Controller | current', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ember-pet-project/tests/unit/controllers/current-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/current-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/current-test.js should pass jshint.');
  });
});
define('ember-pet-project/tests/unit/controllers/history-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:history', 'Unit | Controller | history', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('ember-pet-project/tests/unit/controllers/history-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/history-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/history-test.js should pass jshint.');
  });
});
define('ember-pet-project/tests/unit/models/current-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('current', 'Unit | Model | current', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ember-pet-project/tests/unit/models/current-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/current-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/current-test.js should pass jshint.');
  });
});
define('ember-pet-project/tests/unit/models/history-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('history', 'Unit | Model | history', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('ember-pet-project/tests/unit/models/history-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/history-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/history-test.js should pass jshint.');
  });
});
define('ember-pet-project/tests/unit/routes/current-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:current', 'Unit | Route | current', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ember-pet-project/tests/unit/routes/current-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/current-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/current-test.js should pass jshint.');
  });
});
define('ember-pet-project/tests/unit/routes/history-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:history', 'Unit | Route | history', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ember-pet-project/tests/unit/routes/history-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/history-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/history-test.js should pass jshint.');
  });
});
define('ember-pet-project/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('ember-pet-project/tests/unit/routes/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define('ember-pet-project/tests/unit/serializers/current-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('current', 'Unit | Serializer | current', {
    // Specify the other units that are required for this test.
    needs: ['serializer:current']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('ember-pet-project/tests/unit/serializers/current-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/serializers/current-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/current-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('ember-pet-project/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map