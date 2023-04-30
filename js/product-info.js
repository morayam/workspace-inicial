let productInfo;
let currentImagesArray = [];
let currentRelatedArray = [];
let currentCommentsArray = [];
let newComment = [{
    "score": '5', 
    "description": 'Un comentario.', 
    "user": localStorage.getItem('email'), 
    "dateTime": 'Pendiente.'
}];

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//Tomamos el id que extraemos del localStorage
document.addEventListener("DOMContentLoaded", function (e) {
    let getProd = localStorage.getItem('ProdID');
    let product_Info_URL = PRODUCT_INFO_URL + getProd.toString() + EXT_TYPE;
    let product_Com_URL = PRODUCT_INFO_COMMENTS_URL + getProd.toString() + EXT_TYPE;
    
    getJSONData(product_Info_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            currentImagesArray = productInfo.images;
            currentRelatedArray = productInfo.relatedProducts;
            showProductsInfoList(productInfo);
        }
    });
    
    getJSONData(product_Com_URL).then(function (resultObj) {

        if (resultObj.status === "ok") {
            currentCommentsArray = resultObj.data;            
            showComments(currentCommentsArray);
        }

        document.getElementById("btnComment").addEventListener("click", function () {
            console.log(currentCommentsArray, newComment);
            document.getElementById('comment').innerHTML = showComments(currentCommentsArray) && showComments(newComment);
        });
    
    });

    document.getElementById("navCerrarSesion").addEventListener("click", function () {
        localStorage.clear();
        window.location = "login.html"
    });
    
    //Carga el nombre del usuario a la barra superior.
    let email = localStorage.getItem('email');
    if (email == null)  {
        window.location = 'login.html';
    } else {
        document.getElementById('mail-usuario').innerHTML = email;
    }

    //Cuando se da click en comentar toma el nombre de usuario

    function calification(puntos){
        let estrellas='';

        for(let i = 1; i <= 5; i ++) {
            if (i<=puntos){
               // estrellas+="*";
            estrellas += '<i class="fas fa-star checked" ></i>'; //icono estrella llena
            }else{
               // estrellas+= "-";
                 estrellas += '<i class="far fa-star checked"></i>';//icono contorno estrella
            }
        }
        
        document.getElementById('calif').innerHTML=estrellas;
    };
//En desarrollo.
//    document.getElementById('puntaje').addEventListener('change',function(){
 //       calification(document.getElementById('puntaje').value);
 //       let value = document.getElementById('puntaje').value;
 //       console.log(value);
//        if (value == 1) {
//            document.getElementById('btnComment').addEventListener(click, ()=>
//            document.getElementById('puntaje') + 'class=valueOne');
        //    document.getElementById('valor').innerHTML='5'
//        }
//    }) ; //Espero que cambie el valor del select
});


function showProductsInfoList(producto) {
    let htmlImagesToAppend = "";
    let htmlRelatedImagesToAppend = "";

    document.getElementById("named").innerHTML = producto.name;
    document.getElementById("description").innerHTML = producto.description;
    document.getElementById("cost").innerHTML = producto.cost;
    document.getElementById("currency").innerHTML = producto.currency;
    document.getElementById("soldCount").innerHTML = producto.soldCount;
    document.getElementById("categoryFocus").innerHTML = producto.category;
            
    for (let i = 0; i < currentImagesArray.length; i++) {
        let images = currentImagesArray[i];

        htmlImagesToAppend += `
        <div class="text-center p-4"> <img src='${images}' width="200" /> </div>
          `
    }

    document.getElementById('images').innerHTML= htmlImagesToAppend;

    for (let i = 0; i < currentRelatedArray.length; i++) {
        let related = currentRelatedArray[i];

        htmlRelatedImagesToAppend += `
        <div class="text-center p-4">
        <a href="product-info.html">
        <h5>${related.name}</h5>
        <a>
        <img src='${related.image}' width="200" />
        </div>
          `
    }

    document.getElementById('relatedProducts').innerHTML= htmlRelatedImagesToAppend;

};

// En htmlCommentsToAppend, luego del "div class= media" <img class="mr-3 rounded-circle" alt="Bootstrap Media Preview" src="https://i.imgur.com/stD0Q19.jpg" />
function showComments(array) {
    let htmlCommentsToAppend = "";
    
    for (let i = 0; i < array.length; i++) {
        let comments = array[i];

        htmlCommentsToAppend += `
    <div class="col-md-12">
    <div class="media">
      <div class="media-body">
       <div class="row">
        <div class="col-8 d-flex">
           <h5>${comments.user}</h5>
           </br>
           <p>${comments.dateTime}</p> 
           </div>
           <div class="col-4">
           <div class="pull-right reply">
            <a href="#"><span><i class="fa fa-reply"></i> Responder</span></a>
          </div>
        </div>
      </div>		
    ${comments.description}<br>
    <p>Calificación: ${comments.score}</p>
    </div>
   </div>
   <div class="media mt-4">
   `
   
   document.getElementById("comment").innerHTML = htmlCommentsToAppend;

}

//function showNewComment(array) {

//};

}



      //<div class="thumbnail text-center"> <img onclick="change_image(this)" src="${images[i]}" width="70"> <img onclick="change_image(this)" src="${images[i]}" width="70"> </div>
                //PRIMERA IMAGEN: img/prod50741_1.jpg
    //            document.addEventListener(click, function(e) {
      //              change_image(producto.image);
        //        });


        //function change_image(image){
    //    let container = document.getElementById("main-image");
    
    //    container.src = image.src;
//}
