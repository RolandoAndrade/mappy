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
		}).then(this.action).catch(swal.noop);
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

class InfoOfMarker extends SwalModal
{
    constructor(order)
    {
        let Cline2=order.collectionAddress.line2===""?".":
            ", "+order.collectionAddress.line2+".";
        let Dline2=order.deliveryAddress.line2===""?".":
            ", "+order.deliveryAddress.line2+".";
        let quote=order.deliveryAddress.description===""?"":"<br>\"<em>"+
            order.deliveryAddress.description+"\"</em><br>"
        super(
                order.getPackagesResume(),
                "<b>Para:</b> <em>"+order.recipientsName+" "+order.recipientsSurname+"</em><br>" +
                "<b>Dirección de recoleción: </b><em>"+
            order.collectionAddress.line1+Cline2+"<br></em>"+
                "<b>Dirección de envío: </b><em>"+order.deliveryAddress.line1+Dline2+"</em><br>"+
                "<b>Peso total: </b><em>"+order.getWeight()+" kg</em><br>"+
                order.deliveryAddress.zipCode+" "+
                order.deliveryAddress.city+", "+order.deliveryAddress.country+"<br>"+
                quote,
                "info",
                true,
                "#ff4837",
                "#DC8502",
                "Borrar",
                "Ok",
                async function () {
                    await deleteOrder(order);
                }

            );
    }
}
class ErrorDialog

{
    constructor(message)
    {
        this.dialog=new SwalModal(
			"Error",
			message,
			"error",
			false,
			"#DC8502",
			null,
			"Ok",
			null,
			null
		);
    }
    show()
    {
        this.dialog.show();
    }
}
