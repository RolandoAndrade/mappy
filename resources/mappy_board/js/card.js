class CollectionOrderCard
{
    constructor(collectionOrder)
    {
        const img="\"/static/mappy_board/assets/img/user.png\"";

        $(".noHistory").remove();
        $(".collectionHistory").append('<div class="cd-timeline-block">' +
            '<div class="cd-timeline-img">\n' +
            '<img src='+img+' alt="user-picture">' +
            '</div>' +
            '<div class="cd-timeline-content">\n' +
             this.thePackageText(collectionOrder)+
            '<p class="text-center">\n' +
            '<i class="zmdi zmdi-account zmdi-hc-fw"></i>' +
             this.theRecipientsText(collectionOrder)+
            '<i class="zmdi zmdi-pin zmdi-hc-fw"></i>\n' +
             this.theCollectionAddressText(collectionOrder)+
            '<button type="button" class="deleteOrderInfo" id="deleteOrderInfo'+
            collectionOrder.id+'">' +
            '<i class="zmdi zmdi-delete zmdi-hc-fw"></i>' +
            'Eliminar' +
            '</button>' +
            '</p>\n' +
            '<span class="deliveryAddress cd-date"><i class="zmdi zmdi-pin zmdi-hc-fw"></i>' +
            this.theDeliveryAddressText(collectionOrder)+
            '</span>\n' +
            '</div>\n' +
            '</div>');
        
            $("#deleteOrderInfo"+collectionOrder.id).on("click",async function ()
            {
                console.log(await collectionOrder.delete());
            })
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
            collectionOrder.packages[i].description+" ("+
                collectionOrder.packages[i].weight.substr(0, collectionOrder.packages[i].weight.indexOf(".")+2)+" kg)"+
            '</h4>';
        }
        return description;
    }


    thePackageText(order)
    {
        return '<h4 class="packageDescription text-center text-titles">'+
            this.getPackages(order)+
            '</h4>';
    }

    theRecipientsText(order)
    {
        return 'Para: <em>'+order.recipientsName+' '+
            order.recipientsSurname+'</em><br>';
    }
    theCollectionAddressText(order)
    {
        return 'Sitio de recolección: <em>'+order.collectionAddress.line1+'</em><br>\n';
    }
    theDeliveryAddressText(order)
    {
        return this.getText(order.deliveryAddress.line1)+
            this.getText(", "+order.deliveryAddress.line2)+
            '.<br>'+ order.deliveryAddress.zipCode+" "+order.deliveryAddress.city+
            ', '+order.deliveryAddress.country;
    }
    clear()
    {
        $(".collectionHistory").clean();
    }
}