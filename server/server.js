Meteor.startup(function serverStart() {
  _.each( ['cursors'], function( collection ) {
    _.each( ['insert', 'update', 'remove'], function( method ) {
      Meteor.default_server.method_handlers[ '/'+collection+'/'+method ] = function(){};
    } );
  } );
  
  Cursors.remove({});
  
  Meteor.publish('cursors', function() {
    return Cursors.find();
  });
  
  Meteor.setInterval( function() {
    Meteor.call( 'removedead' );
  }, 1000 );
});