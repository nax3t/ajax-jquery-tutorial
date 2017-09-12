# Tutorial
## Search functionalty with AJAX
###### by Ian Schoonover

----

### Update view markup
- Open /views/partials/header.ejs
- Replace div with `id="navbar" class="collapse navbar-collapse"` with the following:

```html
<div id="navbar" class="collapse navbar-collapse">
  <form class="navbar-form navbar-left">
    <div class="form-group">
      <input type="text" class="form-control" id="search" placeholder="Search">
    </div>
  </form>
</div><!--/.nav-collapse -->
```

### Update server-side JS
- Open /app.js
- Add the following function before the app.get('/todos', ..) route:

```js
// function to be used in the .get("/todos", ..) route
// this allows us to escape any special characters with a backslash
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
```

- Now update the app.get('/todos', ..) route (see comments in source code to understand what's going on):


```js
app.get("/todos", function(req, res){
  if(req.query.keyword) {   // if there's a query string called keyword then..
    // set the constant (variable) regex equal to a new regular expression created from the keyword 
    // that we pulled from the query string
    const regex = new RegExp(escapeRegex(req.query.keyword), 'gi'); 
    // query the database for Todos with text property that match the regular expression version of the search keyword
    Todo.find({ text: regex }, function(err, todos){
      if(err){
        console.log(err);
      } else {
      	// send back the todos we found as JSON
        res.json(todos);
      }
    });
  } else {
  	// if there wasn't any query string keyword then..
    Todo.find({}, function(err, todos){ // query the db for all todos
      if(err){
        console.log(err);
      } else {
        if(req.xhr) { // if request was made with AJAX then ..
          res.json(todos); // send back all todos as JSON
        } else {
          res.render("index", {todos: todos}); // otherwise render the index view and pass in all todos with EJS
        }
      }
    });
  }
});
```

### Update client-side JS
- Open /public/js/ajax.js (or /src/ajax.js if you're transpiling with gulp & babel)
- Add the following code to the bottom of your ajax.js script:

```js
// Search functionality

$('#search').on('input', function(e) {
	e.preventDefault();
  $.get(`/todos?keyword=${encodeURIComponent(e.target.value)}`, function(data) {
		$('#todo-list').html('');
		data.forEach(function(todo){
			$('#todo-list').append(
				`
				<li class="list-group-item">
					<form action="/todos/${todo._id}" method="POST" class="edit-item-form">
						<div class="form-group">
							<label for="${todo._id}">Item Text</label>
							<input type="text" value="${todo.text}" name="todo[text]" class="form-control" id="${todo._id}">
						</div>
						<button class="btn btn-primary">Update Item</button>
					</form>
					<span class="lead">
						${todo.text}
					</span>
					<div class="pull-right">
						<button class="btn btn-sm btn-warning edit-button">Edit</button>
						<form style="display: inline" method="POST" action="/todos/${todo._id}" class="delete-item-form">
							<button type="submit" class="btn btn-sm btn-danger">Delete</button>
						</form>
					</div>
					<div class="clearfix"></div>
				</li>
				`
				);
		});
	});
});
```
