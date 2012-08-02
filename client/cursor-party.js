Template.body.get_cursors = function() {
  var max_x = window.innerWidth-14;
  var max_y = window.innerHeight-21;
  return Cursors.find( {_id: {$ne: Session.get( 'id' )}} );
};

Template.body.no_cursors = function() {
  var cursors = Cursors.find( {_id: {$ne: Session.get( 'id' )}} ).count();
  if ( cursors < 1 ) {
    return 'Waiting on other people';
  }
  return '';
};

Meteor.startup(function clientStart() {
  Meteor.subscribe('cursors', function() {
    Meteor.call('add', {
      user_name:'',
      x:0,
      y:0
    }, function( error, result ) {
      if ( result !== undefined ) {
        //  Clean up DB so each user only has one cursor
        if ( amplify.store( 'id' ) !== undefined ) {
          Meteor.call( 'cleanup', {id: amplify.store( 'id' )} );
          amplify.store( 'id', undefined );
        }
        
        amplify.store( 'id', result );
        Session.set( 'id', result );
        
        window.onmousemove = function(e) {
          var x = e.pageX !== undefined ? e.pageX : e.screenX !== undefined ? e.screenX : e.clientX + document.body.scrollLeft;
          var y = e.pageY !== undefined ? e.pageY : e.screenY !== undefined ? e.screenY : e.clientY + document.body.scrollTop;
          
          Meteor.call('update', {
            id:result,
            pos:{
              x:x,
              y:y
            }
          });
        };
      }
    });
  });
});
