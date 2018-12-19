function doubleClick(e)
{
    $(".modal-screen").show();
    $(".modal-card").show();
    $('.expandible.a').hide();
    $('.more-modal.a i').removeClass("zmdi-plus");
    $('.more-modal.a i').removeClass("zmdi-minus");
    $('.more-modal.a i').addClass("zmdi-plus");
}
$(".modal-screen").click(function (event)
{
   if(!$(event.target).closest(".modal-card").length && !$(event.target).is(".modal-card"))
   {
     $(".modal-card").hide(100);
    $(".modal-screen").hide(100);
   }
});

$(".close-modal").click(function () {
    $(".modal-card").hide(100);
    $(".modal-screen").hide(100);
});

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

function hideForm(form)
{
    $('.expandible.'+form).hide(300);
    $('.more-modal.'+form).show();
}