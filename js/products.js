function adidasProducts() {

    this.data = {};
    this.results = {};

    
    this.init = (data) => this.data = data;

    this.getById = (id, category) => this.data[category]?.find((product) => product.id === id);
    

    this.buildHTMLCard = function(product) {
        return `<div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="products"><h2 class="product-prices">${product.models}</h2></div>
                        <div id="card-img"><img src="${product.img}" class="card-img-top" alt="..."></div>
                        <div class="add-to-cart">
                        <p id="add-cart" onclick="openModal('${product.id}', '${product.category}')">VER MAS</p>
                        </div>
                        <div class="products-price">
                        <h2 class="h2-price">Price:</h2>
                        <p class="p-price">$${product.price}</p>
                        </div>
                    </div>
                </div>`
    }

    this.listProduct = (rowClass, sourceData, category) => {
        let row = document.querySelector(rowClass);
        row.innerHTML = '';
        let html = '';
        this[sourceData][category]?.forEach(product => {
            html += this.buildHTMLCard(product);
        })

        row.innerHTML = html;
    }

    this.search = function (key) {
        this.results = {}
        let category = ''
        let searchAccumulator = []
        this.data.database.forEach((product) => { 
            if(product.models.toLowerCase().includes(key.toLowerCase())){
                category = product.category
                searchAccumulator = [
                    ...searchAccumulator,
                    product
                ]
                this.results = {
                    ...this.results,
                    [product.category]: searchAccumulator
                }
            }
        })

        return {
            length: this.results[category].length,
            category
        };
    }

    this.renderModal = (product, div) => {
        let modal = document.querySelector(div);
        modal.classList.remove('d-none')
        modal.innerHTML = '';
        let html = `
            <div class="modal-product">
                <div class="header-product">
                    <p class="nombre-product">${product.models}</p>
                    <button class="closed-modal" onclick="closeModal()">X</button>
                </div>
                <div class="contenido-modal">
                    <div class="img-modal">
                        <img src="${product.img}" alt="">
                    </div>
                    <div class="detalle-product">
                        <p class="detalle">
                            ${product.info}
                        </p>
                        <span class="precio">
                            ${product.price}
                        </span>
                        <div class="add-to-cart-button">
                        <button id="add-cart" onclick="addToCart('${product.id}', '${product.category}')">ADD TO CART</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.innerHTML = html;
    }

}