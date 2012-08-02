Meteor.methods({
  //  Add cursor to active list
  add: function( data ) {
    data.updated = new Date();
    return Cursors.insert( data );
  },
  //  Update cursor on active list
  update: function( data ) {
    data.pos.updated = new Date();
    return Cursors.update( {_id:data.id}, data.pos );
  },
  //  Remove user's previous cursor from active list
  cleanup: function( data ) {
    Cursors.remove( {_id:data.id} );
  },
  //  Removes dead (not updated for 1+ minutes) cursors from active list
  removedead: function() {
    var now = new Date(),
      dead = new Date( now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()-1 );
    Cursors.remove( {updated:{$lte: dead}} );
  }
});
