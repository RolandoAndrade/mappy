var emptyCollectionOrder;
var aMark;
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

	$('.viewSideBar').on('click', changeToMap);

	$('.collectionOrderSideBar').on('click', changeToCollectionOrder);

	$('.historySideBar').on('click', changeToHistory);
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

        await setEmail();
		await getAllCollectionOrders();
		$('.loading').hide();

    });
})(jQuery);

function changeToMap()
{
	$('.navbar-text').text("ÓRDENES DE RECOLECCIÓN");
	$('.makeACollectionOrder').hide(300);
	$('.historyOfCollectionOrders').hide(300);
	$('#mapMain').show(300);
}

function changeToCollectionOrder()
{
	$('.navbar-text').text("CREAR ORDEN DE RECOLECCIÓN");
	$('#mapMain').hide(300);
	$('.historyOfCollectionOrders').hide(300);
	$('.makeACollectionOrder').show(300);
}
function changeToHistory()
{
	$('.navbar-text').text("ÓRDENES EN CURSO");
	$('#mapMain').hide(300);
	$('.makeACollectionOrder').hide(300);
	$('.historyOfCollectionOrders').show(300);
}

$(".formCollection").submit(async function()
{
	var form = $(this);
	event.preventDefault();
	event.stopPropagation();
	if (form[0].checkValidity() === false)
	{
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
window.location="../"
	}
	else {
		await newCollectionOrder();
		window.location="../"
	}
	form.addClass('was-validated');
});

async function findLocation()
{
	$(".mapCoords").show();
	const line1=$("#d_general").val();
	const line2=$("#d_zoom").val();
        await $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+line1+", "+line2, function(data){
            if(data.length>0)
            {
                const dir=data[0];
                $("#latitude").val(dir.lat);
                $("#longitude").val(dir.lon);
                const c=new Coordinates(dir.lat,dir.lon);
                miniMap.addMarker(c);
                miniMap.setView(c);
                const swal=new SwalModal(
                'Confirma las coordenadas',
	            'Revisa la ubicación en el mapa',
	            'warning',
	            false,
                '#DC8502',
	            null,
	            'Ok',
	            null,
                null
                );
                swal.show();
            }
            else
            {
                const swal=new SwalModal(
                'No fue encontrada la dirección',
	            'Ubica la dirección manualmente en el mapa',
	            'error',
	            false,
                '#DC8502',
	            null,
	            'Ok',
	            null,
                null
                );
                swal.show();
            }
        });
}

