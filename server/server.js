Meteor.startup(function serverStart() {
  //  Lock down DB so it's not accessible clientside
  _.each( ['cursors'], function( collection ) {
    _.each( ['insert', 'update', 'remove'], function( method ) {
      Meteor.default_server.method_handlers[ '/'+collection+'/'+method ] = function(){};
    } );
  } );
  
  //  Clear DB
  Cursors.remove({});
  
  //  Publish all cursors
  Meteor.publish('cursors', function() {
    return Cursors.find();
  });
  
  //  Remove dead (not active for 1+ minutes) cursors every second
  Meteor.setInterval( function() {
    Meteor.call( 'removedead' );
  }, 1000 );
});