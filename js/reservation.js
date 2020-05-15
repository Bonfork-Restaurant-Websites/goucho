if ($('#reservation-form').length) {
    $('#reservation-form').each(function(){
        $(this).validate({
            errorClass: 'error wobble-error',
            submitHandler: function(form){
                $.ajax({
                    type: "POST",
                    url:"./includes/mail.php",
                    data: $(form).serialize(),
                    success: function() {
                        document.querySelector('.alert-success').style.display = 'block';
                        console.log("Success");
                    },

                    error: function(){
                        document.querySelector('.alert-danger').style.display = 'block';
                        console.log("Fail");
                    }
                });
            }
        });
    });
}
