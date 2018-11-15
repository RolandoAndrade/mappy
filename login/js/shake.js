$(document).ready(function(){
  $('#form1').validate({
    rules: {
      email: {
        required:  {
          depends:function(){
              $(this).val($.trim($(this).val()));
              return true;
          }   
        },
        emailValidate: true
      },
      password: {
        minlength: 5,
        required: true
      },
      payment: {
        required: true
      }
    },
    highlight: function(element) {
      $(element).closest('.form-group').removeClass('has-success').addClass('has-error')
      $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    unhighlight: function(element) {
      $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
    }
  });

  $('#form1').formAnimation({ animatedClass: 'jello' });

  $.validator.addMethod("emailValidate", 
    function(value, element) {
        return /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,3}\b$/i.test(value);
    }, 
    "Ingrese una dirección de correo valida"
  );

  // $('#form1').on('invalid-form.validate', function(e) {
  //   $(this).addClass('animated jello');
  // });
  //
  // $('.submit input').click(function() {
  //   $('#form1.animated').removeClass('animated jello');
  // });
});
