App = Ember.Application.create({
  spreadsheetKey: '0AhVgr8DOJUHsdHE1ajduUEhOaGpuV3VCQTdxV0lCYWc',
  spreadsheetRootUrl: 'https://spreadsheets.google.com/feeds'
});


// ROUTES

App.Router.map(function() {
  // TODO: remove hard-coding and dynamically map routes
  this.route('home');
  this.route('about');
  this.route('contact');
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.MenuItem.find();
  },
  setupController: function(controller, model) {
    this.controllerFor('menu').set('content', model);
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('home');
  }
});


// TODO: remove hard-coding and dynamically extend routes
App.HomeRoute = Ember.Route.extend({
  model: function() {
    return App.Page.find('od6');
  }
});




// CONTROLLERS

App.MenuController = Ember.ArrayController.extend();




// HELPERS

// linkToPage helper accepts a variable for the route name
// ex: {{#each model}} <li>{{#linkToPage name this}} {{name}} {{/linkToPage}}</li> {{/each}}
// helper code adapted from: http://stackoverflow.com/questions/15216356/how-to-make-linkto-dynamic-in-ember

Ember.Handlebars.registerHelper('linkToPage', function(name) {
  var routeName = Ember.Handlebars.get(this, name);
  arguments = [].slice.call(arguments, 2);
  arguments.unshift(routeName);
  return Ember.Handlebars.helpers.linkTo.apply(this, arguments);
});




// MODELS

App.MenuItem = Ember.Model.extend({
  id: Ember.attr(),
  name: Ember.attr()
});

// App.MenuItem.adapter = Ember.FixtureAdapter.create();

// App.MenuItem.FIXTURES = [
//   {id: 'od6', name: 'home'},
//   {id: 'od7', name: 'about'},
//   {id: 'od8', name: 'contact'}
// ];


App.MenuItem.adapter = Ember.Adapter.create({

  findAll: function(klass, records) {
    $.getJSON(App.spreadsheetRootUrl + '/worksheets/' + App.spreadsheetKey + '/public/values?alt=json-in-script&callback=?')
      .then(function(response) {
        var pages = [];

        response.feed.entry.forEach(function (entry) {
          // parse out the sheet id
          var sheetId = entry.id.$t.substring(entry.id.$t.lastIndexOf('/') + 1);
          var page = {
            id: sheetId,
            name: entry.title.$t
          };
          pages.push(page);
        });
       records.load(klass, pages);
    });
  }

});




App.Page = Ember.Model.extend({
  id: Ember.attr(),
  name: Ember.attr(),
  fields: Ember.attr()
});

// App.Page.adapter = Ember.FixtureAdapter.create();

// App.Page.FIXTURES = [
//   {id: 'od6', name: 'home', fields: {test1: 'testaaa data', test2: 'test1 data'}},
//   {id: 'od7', name: 'about', fields: {test1: 'testb data', test2: 'test2 data'}},
//   {id: 'od8', name: 'contact', fields: {test1: 'testc data', test2: 'test3 data'}}
// ];

App.Page.adapter = Ember.Adapter.create({

  find: function(record, id) {
    $.getJSON(App.spreadsheetRootUrl + '/list/' + App.spreadsheetKey + '/' + id + '/public/values?alt=json-in-script&callback=?')
      .then(function(response) {
        var page = {
          id: id,
          name: response.feed.title.$t,
          fields: response.feed.entry[0]
        };

        record.load(id, page);
    });
  }

});
