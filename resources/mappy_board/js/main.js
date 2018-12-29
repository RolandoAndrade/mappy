var emptyCollectionOrder;
var aMark;
var viewsManager;

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
	$('.btn-Notifications-area').on('click', function(){
		var NotificationsArea=$('.Notifications-area');
		if(NotificationsArea.css('opacity')=="0"){
			NotificationsArea.addClass('show-Notification-area');
		}else{
			NotificationsArea.removeClass('show-Notification-area');
		}
	});
	$('.btn-search').on('click', function(){
		swal({
		  title: 'En este momento no tienes órdenes de recolección',
		  confirmButtonText: '<i class="zmdi zmdi-check"></i>  Ok',
		  confirmButtonColor: '#03A9F4',
		  showCancelButton: true,
		  cancelButtonColor: '#F44336',
		  cancelButtonText: '<i class="zmdi zmdi-close-circle"></i> Cancel',
		  html: '<div class="form-group label-floating">'+
			  		'<label class="control-label" for="InputSearch">write here</label>'+
			  		'<input class="form-control" id="InputSearch" type="text">'+
				'</div>'
		}).then(function () {
		  swal(
		    'You wrote',
		    ''+$('#InputSearch').val()+'',
		    'success'
		  )
		});
	});

	emptyCollectionOrder=new Dialog($('#Dialog-Help'));

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

