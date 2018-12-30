var emptyCollectionOrder;
var aMark;
var viewsManager;
var copyModal;
var copyMakeACollectionOrder;
var copyPackageForm;
$(document).ready(function(){
	$('.btn-sideBar-SubMenu').on('click', function(){
		var SubMenu=$(this).next('ul');
		var iconBtn=$(this).children('.zmdi-caret-down');
		if(SubMenu.hasClass('show-sideBar-SubMenu')){
			iconBtn.removeClass('zmdi-hc-rotate-180');
			SubMenu.removeClass('show-sideBar-SubMenu');
		}else{
			iconBtn.addClass('zmdi-hc-rotate-180');
			SubMenu.addClass('show-sideBar-SubMenu');
		}
	});
	$('.btn-exit-system').on('click', function(){exitWindow.show()});

	$('.exitSideBar').on('click', function(){exitWindow.show()});

	$('.btn-menu-dashboard').on('click', function(){
		var body=$('.dashboard-contentPage');
		var sidebar=$('.dashboard-sideBar');
		if(sidebar.css('pointer-events')=='none'){
			body.removeClass('no-paddin-left');
			sidebar.removeClass('hide-sidebar').addClass('show-sidebar');
		}else{
			body.addClass('no-paddin-left');
			sidebar.addClass('hide-sidebar').removeClass('show-sidebar');
		}
	});

	$('.btn-search').on('click', function(){
		swal({
		  title: 'Buscar una ubicación',
		  confirmButtonText: '<i class="zmdi zmdi-search"></i>  Buscar',
		  confirmButtonColor: '#DC8502',
		  showCancelButton: true,
		  cancelButtonColor: '#F44336',
		  cancelButtonText: '<i class="zmdi zmdi-close-circle"></i> Cancel',
		  html: '<div class="form-group label-floating">'+
			  		'<label class="control-label" for="InputSearch">Escribe tu ubicación</label>'+
			  		'<input class="form-control" id="InputSearch" type="text">'+
				'</div>'
		}).then(async function () {
		  await $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+
        $("#InputSearch").val(), function(data){
            if(data.length>0)
            {
                const dir=data[0];
                myMap.setView(new Coordinates(dir.lat,dir.lon));
            }
            else
            {
                new ErrorDialog("No fue encontrada la dirección. Ubique la dirección manualmente en el mapa").show();
            }
        });
		});
	});

	emptyCollectionOrder=new Dialog($('#Dialog-Help'));

	$('.makeACollectionOrder').css("visibility","visible");

	copyMakeACollectionOrder=$('.makeACollectionOrder').clone();
	copyPackageForm=$(".create-container.OfPackage").clone();

	viewsManager=new ViewsManager($('.navbar-text'), $('#mapMain'),$('.makeACollectionOrder'),$('.historyOfCollectionOrders'));



	$('.viewSideBar').on('click', function(){viewsManager.changeToMap()});

	$('.collectionOrderSideBar').on('click', function(){viewsManager.changeToCollectionOrder()});

	$('.historySideBar').on('click', function(){viewsManager.changeToHistory()});

	$('.doOne').on('click', function(){viewsManager.changeToCollectionOrder()});

});
(function($){
	$('.loading').show();
    $(window).on("load",async function(){
        $(".dashboard-sideBar-ct").mCustomScrollbar({
        	theme:"light-thin",
        	scrollbarPosition: "inside",
        	autoHideScrollbar: true,
        	scrollButtons: {enable: true}
        });
        $(".dashboard-contentPage, .Notifications-body").mCustomScrollbar({
        	theme:"dark-thin",
        	scrollbarPosition: "inside",
        	autoHideScrollbar: true,
        	scrollButtons: {enable: true}
        });
        $(".carousel-create").mousewheel(function(event, delta)
		{
      		this.scrollLeft -= (delta * 30);
      		event.preventDefault();
   		});


        await setEmail();
		await getAllCollectionAddresses();
		await getAllDeliveryAddresses();
		await getAllCollectionOrders();
		copyModal=$('.modal-screen').clone();
		copyMakeACollectionOrder=$('.create-form').clone();
		copyMakeACollectionOrder.css("visibility","visible");
		$('.loading').hide();

    });
})(jQuery);

class ViewsManager
{
	constructor(navbar, map, createOrderForm, history)
	{
		this.map=map;
		this.createOrderForm=createOrderForm;
		this.history=history;
		this.navbar=navbar;
		this.changeToMap();
	}

	changeToMap()
	{
		this.navbar.text("ÓRDENES DE RECOLECCIÓN");
		this.createOrderForm.hide(300);
		this.history.hide(300);
		this.map.show(300);
	}

	changeToCollectionOrder()
	{
		this.navbar.text("CREAR ORDEN DE RECOLECCIÓN");
		this.map.hide(300);
		this.history.hide(300);
		this.createOrderForm.show(300);
	}

	changeToHistory()
	{
		this.navbar.text("ÓRDENES EN CURSO");
		this.map.hide(300);
		this.createOrderForm.hide(300);
		this.history.show(300);
	}

}


$(".formCollection").submit(async function()
{
	var form = $(this);
	event.preventDefault();
	event.stopPropagation();
	if (form[0].checkValidity() === false)
	{
		$("input[required]").each(function() {
			console.log("a");
            if(this.value=="")
			{
				this.style.border="solid";
			}
            else
			{
				this.style.border="none";
			}
        });

		const s=new SwalModal(
			"Error",
			"Debes completar algunos campos para continuar",
			"error",
			false,
			"#DC8502",
			null,
			"Ok",
			null,
			null
		);
		s.show();

	}
	else {
		await newCollectionOrder();
		window.location="../"
	}
	form.addClass('was-validated');
});

