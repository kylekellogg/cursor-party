Cursor Party
============

It's a party for your cursor! This is just a simple web app to test multiple user connections' performance and implementation with Meteor.

Client
------

Clientside javascript subscribes to and renders a &lt;div&gt; for each active cursor. The first time the app is accessed, the user's cursor is added to the list of active cursors. When users move their cursors, these active cursors are updated. If their cursor is not currently active, it will be made so.

Server
------

Serverside javascript on first run starts publishing all active cursors as well as a task to clean up "dead" cursors every second. Cursors become "dead" when they are not moved for more than a minute. Contains all database operations for security.