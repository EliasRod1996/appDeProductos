class Product{
    constructor(name, price, year){
        this._name = name;
        this._price = price;
        this._year = year;
    }

    addProduct(){



    }
}


class UI {//user interface
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4" >
                <div class="card-body">
                     <strong>Nombre</strong>: ${product._name}
                     <strong>Precio</strong>: ${product._price}
                     <strong>Año</strong>: ${product._year}
                     <a href="#" class="btn btn-danger" name="delete">ELiminar</a>

                </div>
            </div>
        `;
        productList.appendChild(element)
        
    }

    resetForm(){//resetea desde el formulario
        document.getElementById('product-form').reset();//para resetear el cuadro
    }

    deleteProduct(element){

        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();//se usan varios parentelement para subir de nivel hasta el q abarca toda la tarjeta
            this.showMessage('Producto eliminado satifactoriamente', 'danger')
        }

    }
    showMessage(message, cssClass){//primer parametro un mensaje,  segundo una clase de bootsrap - los nombre son referenciales , pueden cambiarse
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //mostrando en el DOM
        const container = document.querySelector('.container');
        const app=document.querySelector('#app');
        container.insertBefore(div, app); //para insertarlo antes de todo 
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 4000);
    }
}

//DOm events - eventos de html

document.getElementById('product-form')
.addEventListener('submit', function(e){
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;


    const product = new Product(name, price, year);

    const ui = new UI();

    if(name === '' || price === '' ||year === '' ){
        ui.showMessage('Camplete los campos', 'warning')
        return // para q no siga leyendo el restos de ui's
    }
    ui.addProduct(product); 
    ui.resetForm();
    ui.showMessage('Producto agregado satisfactoriamente', 'success');



    e.preventDefault();//para que la consola no se refresque sola
    

});

document.getElementById('product-list')
.addEventListener('click', function(e){
   const ui =  new UI();
   ui.deleteProduct(e.target)
});







