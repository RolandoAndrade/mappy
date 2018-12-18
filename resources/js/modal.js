function doubleClick(e)
{
    $(".modal-screen").show(100);
    $(".modal-card").show(100);
}
$(".modal-screen").click(function (event)
{
   if(!$(event.target).closest(".modal-card").length && !$(event.target).is(".modal-card"))
   {
     $(".modal-card").hide(100);
    $(".modal-screen").hide(100);
   }
});