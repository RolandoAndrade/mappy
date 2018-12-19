function doubleClick(e)
{
    $(".modal-screen").fadeIn(300);
    $(".modal-card").fadeIn(300);
    $('.expandible.a').hide();
    $('.more-modal.a i').removeClass("zmdi-plus");
    $('.more-modal.a i').removeClass("zmdi-minus");
    $('.more-modal.a i').addClass("zmdi-plus");
}
$(".modal-screen").click(function (event)
{
   if(!$(event.target).closest(".modal-card").length && !$(event.target).is(".modal-card"))
   {
       exitModal()
   }
});

function exitModal()
{
    $(".modal-card").fadeOut(300);
    $(".modal-screen").fadeOut(300);
}

$(".close-modal").click(exitModal);

function newForm(form)
{
    if(!$('.expandible.'+form).is(":visible"))
    {
        $('.expandible.'+form).show(300);
        $('.more-modal.'+form+" i").removeClass("zmdi-plus");
        $('.more-modal.'+form+ " i").addClass("zmdi-minus");
    }
    else
    {
        $('.expandible.'+form).hide(300);
        $('.more-modal.'+form+" i").removeClass("zmdi-minus");
        $('.more-modal.'+form+ " i").addClass("zmdi-plus");
    }

}

