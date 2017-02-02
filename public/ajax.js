// $.get('/todos', function(data) {
// 	console.log(data);
// });

// $('form').submit(function(e) {
// 	e.preventDefault();
// 	var formData = $(this).serialize();
// 	$.post('/todos', formData, function(data) {
// 		console.log(data);
// 	});
// });

// $('form').submit(function(e) {
// 	e.preventDefault();
// 	var formData = $(this).serialize();
// 	var formAction = $(this).attr('action');
// 	$.ajax({
// 		url: formAction,
// 		data: formData,
// 		type: 'PUT',
// 		success: function(data) {
// 			console.log(data);
// 		}
// 	})
// });

$('form').submit(function(e) {
	e.preventDefault();
	var formAction = $(this).attr('action');
	$.ajax({
		url: formAction,
		type: 'DELETE',
		success: function(data) {
			console.log(data);
		}
	})
});