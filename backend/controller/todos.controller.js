const todosModel = require('../model/todos.model');

exports.index = (req,res) => {
    todosModel.find(function(err, todos){
        if(err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Get a Todos List",
            data: todos,
        })
    })
};

exports.add = (req,res) => {
    let todo = new todosModel();
    todo.title = req.body.title;
    if(req.body.date){
        todo.date = req.body.date;
    }
    todo.completed = req.body.completed || false;

    todo.save((err) => {
        if (err)
            res.json({
                status: "error",
                message: err
            })
        res.json({
            status: "success",
            message: "Added new todo",
            data: todo
        })
    })
}
exports.view = (req,res) => {
    todosModel.findById(req.params.id, (err, todo) => {
        if (err)
            res.json({
                status: "error",
                message: err,
            })
        res.json({
            status: "success",
            message: "Todo Details",
            data: todo
        })
    })
}
exports.update = (req,res) => {
    todosModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        date: req.body.date,
        completed: req.body.completed,
    }, {new: true}, (err, todo) => {
        if (err)
            res.json({
                status: "error",
                message: err
            })
        res.json({
            status: "success",
            message: "Updated Todo",
            data: todo
        })
    })
}
exports.delete = (req,res) => {
    todosModel.deleteOne({
        _id: req.params.id
    }, (err) => {
        if (err)
            res.json({
                status: "error",
                message: err,
            })
        res.json({
            status: "succes",
            message: "Deleted Todo with id " + req.params.id
        })
    });
}
