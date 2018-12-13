class Dialog
{
    constructor(modal)
    {
        this.modal=modal;
    }

    setToAButton(button)
    {
        button.on('click', function()
        {
		    this.modal.modal('show');
        });
    }

    show()
    {
        this.modal.modal('show');
    }

    hide()
    {
        this.modal.hide();
    }

}

class SwalModal
{
    constructor(title,text,type,showCancelButton, confirmButtonColor,
                cancelButtonColor, confirmButtonText, cancelButtonText, action)
    {
        this.title= title;
        this.text= text;
        this.type=type;
        this.showCancelButton= showCancelButton;
        this.confirmButtonColor= confirmButtonColor;
        this.cancelButtonColor= cancelButtonColor;
        this.confirmButtonText=confirmButtonText;
        this.cancelButtonText= cancelButtonText;
        this.action=action;
    }
    show()
    {
        swal({
		  	title: this.title,
		  	text: this.text,
		  	type: this.type,
		  	showCancelButton: this.showCancelButton,
		  	confirmButtonColor: this.confirmButtonColor,
		  	cancelButtonColor: this.cancelButtonColor,
		  	confirmButtonText: this.confirmButtonText,
		  	cancelButtonText: this.cancelButtonText
		}).then(this.action);
    }
}

var exitWindow=new SwalModal(
    '¿Estás seguro?',
	'La sesión actual será cerrada',
	'warning',
	true,
	'#DC8502',
	'#F44336',
	'Sí, ¡quiero salir!',
	'No, cancelar!',
    function () {
			window.location="api/v/logout";
	}
);

var informationWindow=new SwalModal(
    'Maleta',
	'02:23 PM\tNo R interpreter defined: Many R related features like completion, code checking and help won\'t be available. You can set an interpreter under Preferences->Languages->R\n ',
	'info',
	true,
	'#DC8502',
	'#F44336',
	'Sí, ¡quiero salir!',
	'No, cancelar!',
    function () {
			window.location="api/v/logout";
	}
);

class InfoOfMarker extends SwalModal
{
    constructor(order)
    {
        super(
                order.getPackagesResume(),
                "<b>Para:</b> <em>"+order.recipientsName+" "+order.recipientsSurname+"</em><br>" +
                "<b>Dirección de recoleción: </b><em>"+order.collectionAddress.line1+"<br></em>"+
                "<b>Dirección de envío: </b><em>"+order.deliveryAddress.line1+"</em><br>"+
                "<b>Peso total: </b><em>"+order.getWeight()+" kg</em><br>"+
                order.deliveryAddress.zipCode+" "+
                order.deliveryAddress.city+", "+order.deliveryAddress.country+"<br>",
                "info",
                false,
                "#DC8502",
                null,
                "Ok",
                null,
                null

            );
    }
}