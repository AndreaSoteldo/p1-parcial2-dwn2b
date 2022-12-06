
let menuToggle;//variable que sirve paras las funciones que tendra el menu
let body;
let nav;
let overlay;
let products;
let searchButton;
let searchContainer;
let btnGoBack;
let shoppingCart;

//variables del checkbox
let searchBoxInput;
let checkboxInput;

//funcion del buscador
function getSearchBoxValue() {
    let searchBoxInputValue = searchBoxInput.value;
    let searchResult = products.search(searchBoxInputValue)
    console.log(searchResult)
    if(searchBoxInputValue.trim() !== ''){
        setSearchKeyRender(searchBoxInputValue, searchResult.length);
        products.listProduct('.row.row4', 'results', searchResult.category);
    }
}

function setSearchKeyRender(key, resultLength) {
    $("#search-result").html(resultLength);
    $("#search-key").html(key);
    $(".container-result").show("slow");
}

/////// Funciones del carrito /////////
function addToCart (id, category) {
    let product = products.getById(id, category);

    if(!product) return;

    shoppingCart.add(product)
}

function deleteItem(id, category) {
    let product = products.getById(id, category);
    shoppingCart.removeProduct(product);
}
function emptyTheCart() {
    shoppingCart.emptyCart();
}

function openModal(id, category) {
    const product = products.getById(id, category);
    products.renderModal(product, '.modal-products')
}

function closeModal() {
    document.querySelector('.modal-products').classList.add('d-none')
}
////////////////////////////////////////

window.onload = function() {

        products = new adidasProducts();
        products.init(data);
        products.listProduct('.row.row1', 'data', 'remera');
        products.listProduct('.row.row2', 'data', 'zapatos');
        products.listProduct('.row.row3', 'data', 'accesorios');

    ////////////////nav/////////////////////////////////
    nav = document.querySelector("nav");
    menuToggle = document.querySelector('.menu-toggle');
    overlay = document.querySelector(".overlay");
    body = document.querySelector("body");
    ////////////////////////////////////////////////////

    //para agregar objetos al carrito
    shoppingCart = new ShoppingCart();
    shoppingCart.init();
    shoppingCart.buildCart('#cart');
    shoppingCart.cartLength('#cart-length')
    //////////////////////////////////////////////////////

     btnGoBack = document.querySelector(".go-back");
     
    /////////////////////search //////////////////////////
    searchBoxInput = document.querySelector("#search-2");
    searchKey = document.querySelector("#search-key");
    searchButton = document.querySelector('#button-1');
    searchContainer = document.querySelector("#search-form");

    ////////////// validacion del form ////////////////
    $("form[name='informacion-compra'").validate({
        rules:{
            fullname: {
                required: true,
                minlength: 3
            },
            street1: {
                required: true,
                minlength: 4
            },
            city: {
                required: true,
                minlength: 4
            },
            zip: {
                required: true,
                minlength: 4,
                maxlength: 7
            }
        },
        submitHandler: function(form){
            $("#btn-buy-2").on('click', () => {
                $(".form").hide();
                $(".form-card").show();
            });
        }
    });

    $("form[name='informacion-pago'").validate({
        rules:{
            cardnumber: {
                required: true,
                creditcard: true
            }
        },
        submitHandler: function(form){
            $("#finish").on('click', () => {
                $(".form-card").hide();
                $(".finish").show();
            });
        }
    });

///////////////funcion para el menu en modo mobile/////////////////

    menuToggle.addEventListener("click", () => {
        body.style.position = "fixed";
        nav.classList.toggle("active");
        overlay.classList.toggle("menu-open");
    });

    nav.addEventListener("click", () => {
        body.style.position = "";
        nav.classList.remove("active");
        overlay.classList.remove("menu-open");

    });
//////////////////////////////////////////////////////////////////

    $(".container-result").hide();
    searchButton.disabled = true
    searchButton.addEventListener('click', function(){
        getSearchBoxValue;
    })

    searchBoxInput.addEventListener('input', function(event){
        if (event.target.value.length > 3) {
            searchButton.disabled = false
        } else {
            searchButton.disabled = true
        }
    })

    searchContainer.addEventListener('submit', function(event){
        event.preventDefault();
        if (!searchButton.disabled) {
            getSearchBoxValue()
        }
    })
/////// funcion para regresar en el buscador
    $(".go-back").on('click', function(event){
        event.preventDefault();
        if(event.target){
            products.listProduct('.row', 'data');
        }
        $(".container-result").hide('slow');
    })

////////////payment methods/////////////////

    $(".form").hide();
    $("#btn-buy").on('click', () => {
        $("#cart").hide();
        $(".modal-footer").hide();
        $(".form").show();
    }); 

    $('#cancel').on('click', () => {
        $(".form").hide();
        $('#cart').show();
        $(".modal-footer").show();
    })
    
    $(".form-card").hide();
    $("#btn-buy-2").on('click', () => {
        $(".form").hide();
        $(".form-card").show();
    })

    $(".finish").hide();
    $("#finish").on('click', () => {
        $(".form-card").hide();
        $(".finish").show();
    })

    $("#back-to-store").on('click', () => {
        $(".finish").hide();
        $('#cart').show();
        $(".modal-footer").show();
    })

    $("#go-back").on('click', () => {
        $(".form-card").hide();
        $(".form").show();
    })

////////////////////////////////////////////
}
