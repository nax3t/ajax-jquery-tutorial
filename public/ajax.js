$('#new-todo-form').submit(function(e) {
	e.preventDefault();

	var toDoItem = $(this).serialize();

	$.post('/todos', toDoItem, function(data) {
		$('#todo-list').append(
			`
			<li class="list-group-item">
				<span class="lead">
					${data.text}
				</span>
				<div class="pull-right">
					<a href="/todos/${data._id}/edit" class="btn btn-sm btn-warning">Edit</a>
					<form style="display: inline" method="POST" action="/todos/${data._id}">
						<button type="submit" class="btn btn-sm btn-danger">Delete</button>
					</form>
				</div>
				<div class="clearfix"></div>
			</li>
			`
			)
		$('#new-todo-form').find('.form-control').val('');
	});
});

$('#todo-list').on('click', '.edit-button', function() {
	$(this).parent().siblings('.edit-item-form').toggle();
});