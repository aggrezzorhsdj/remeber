const todosRoutes = require('./todos.routes');
module.exports = function (app, db) {
    todosRoutes(app, db);
}
