$(document).ready(function() {
	$('.callback form').submit(function(e) {
		e.preventDefault();
		var formID = $(this).attr('id');
		alert(formID);
	});
});


