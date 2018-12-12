class CollectionOrderCard
{
    constructor(collectionOrder)
    {
        const img="\"/static/mappy_board/assets/img/user.png\"";
        const description=this.getPackages(collectionOrder);
        $(".noHistory").remove();
        $(".collectionHistory").append('<div class="cd-timeline-block">' +
            '<div class="cd-timeline-img">\n' +
            '<img src='+img+' alt="user-picture">' +
            '</div>' +
            '<div class="cd-timeline-content">\n' +
            '<h4 class="packageDescription text-center text-titles">\n'+
            description+
            '</h4>\n' +
            '<p class="text-center">\n' +
            '<i class="zmdi zmdi-account zmdi-hc-fw"></i>' +
            'Para: <em>'+collectionOrder.recipientsName+' '+
            collectionOrder.recipientsSurname+'</em><br>' +
            '<i class="zmdi zmdi-pin zmdi-hc-fw"></i>\n' +
            'Sitio de recolección: <em>'+collectionOrder.collectionAddress.line1+'</em><br>\n' +
            '<button type="button" class="deleteOrderInfo">' +
            '<i class="zmdi zmdi-delete zmdi-hc-fw"></i>' +
            'Eliminar' +
            '</button>' +
            '</p>\n' +
            '<span class="deliveryAddress cd-date"><i class="zmdi zmdi-pin zmdi-hc-fw"></i>' +
            this.getText(collectionOrder.deliveryAddress.line1)+
            this.getText(", "+collectionOrder.deliveryAddress.line2)+
            '. '+ collectionOrder.deliveryAddress.city+', '+collectionOrder.deliveryAddress.country+
            '</span>\n' +
            '</div>\n' +
            '</div>');
    }

    getText(text)
    {
        if(text==", null")
            return "";
        else
            return text;
    }

    getPackages(collectionOrder)
    {
        let description="";
        for(let i=0;i<collectionOrder.packages.length;i++)
        {
            description+='<h4 class="packageDescription text-center text-titles">' +
            '<i class="zmdi zmdi-money-box zmdi-hc-fw"></i>' +
            collectionOrder.packages[i].description+
            '</h4>';
        }
        return description;
    }

    clear()
    {
        $(".collectionHistory").clean();
    }
}