Meteor.methods({
  add: function( data ) {
    data.updated = new Date();
    return Cursors.insert( data );
  },
  update: function( data ) {
    data.pos.updated = new Date();
    return Cursors.update( {_id:data.id}, data.pos );
  },
  cleanup: function( data ) {
    Cursors.remove( {_id:data.id} );
  },
  removedead: function() {
    var now = new Date(),
      dead = new Date( now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()-1 );
    Cursors.remove( {updated:{$lte: dead}} );
  }
});
