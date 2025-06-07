var carrito = [];

document.addEventListener("DOMContentLoaded", function(){
  eventListeners()
  activarSeleccionUnicaTalles()
  activarFiltroProductos()
  recuperarCarrito()
  var modalCarrito = document.getElementById('modalCarrito');

  modalCarrito.addEventListener('shown.bs.modal', function () {
    mostrarCarritoEnModal()
  })

  document.getElementById("newsletter").addEventListener("click", function(){
    alert("Te suscribiste de manera exitosa a nuestro newsletter!")
  })
})

function eventListeners(){
  let listaProductos=document.getElementById("seccionProductos")
  listaProductos.addEventListener("click", dataElemento)
}

function dataElemento(e){
  if(e.target.classList.contains('btnAgregar')){
    const elementoHtml = e.target.parentElement.parentElement.parentElement
    const ID = e.target.id
    seleccionData(elementoHtml, ID)
  }
}

function seleccionData(producto, id){
  const talleSeleccionado = producto.querySelector(".tallePrenda.active")
  if (!talleSeleccionado) {
    alert('Seleccioná un talle antes de agregar al carrito')
    return
  }

  const prodObj = {
    img: producto.querySelector('img').src,
    titulo: producto.querySelector('h5').textContent,
    precio: parseFloat(producto.querySelector('.precio').textContent.replace('$','')),
    talle: talleSeleccionado.textContent.trim(),
    id: parseInt(id,10),
    cantidad: 1
  }

  let productoExistente = false

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === prodObj.id && carrito[i].talle === prodObj.talle) {
      carrito[i].cantidad += 1 
      productoExistente = true
      break
    }
  }

  if (!productoExistente) {
    carrito.push(prodObj)
  }
  console.log(carrito)
  actualizarCarritoNavbar()
  guardarCarrito()

}

function activarSeleccionUnicaTalles() {
  var botonesTalle = document.querySelectorAll('.tallePrenda')

  for (var i = 0; i < botonesTalle.length; i++) {
    botonesTalle[i].addEventListener('click', function() {
      var contenedor = this.parentElement
      var botonesGrupo = contenedor.querySelectorAll('.tallePrenda')

      for (var j = 0; j < botonesGrupo.length; j++) {
        botonesGrupo[j].classList.remove('active')
      }

      this.classList.add('active')
    })
  }
}

function activarFiltroProductos() {
  let filtroBotones = document.querySelectorAll('.filtro-btn')
  let productos = document.querySelectorAll('.producto')

  for (let i = 0; i < filtroBotones.length; i++) {
    filtroBotones[i].addEventListener('click', function () {
      let filtro = this.id

      for (let k = 0; k < filtroBotones.length; k++) {
        filtroBotones[k].classList.remove('active')
      }
      this.classList.add('active')

      for (let j = 0; j < productos.length; j++) {
        let producto = productos[j]

        if (filtro === 'todos' || producto.classList.contains(filtro)) {
          producto.style.display = 'block'
        } else {
          producto.style.display = 'none'
        }
      }
    })
  }
}

function actualizarCarritoNavbar() {
  var total = 0;
  var cantidad = 0;

  for (var i = 0; i < carrito.length; i++) {
    total += carrito[i].precio * carrito[i].cantidad;
    cantidad += carrito[i].cantidad;
  }

  var carritoTexto = "🛒 (" + cantidad + ") - $" + total;
  var elementoCarrito = document.getElementById("carritoNavbar");
  if (elementoCarrito) {
    elementoCarrito.textContent = carritoTexto;
  }
}

function mostrarCarritoEnModal() {
  var contenedor = document.getElementById("modalCarritoContenido");

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p class='text-muted'>El carrito está vacío.</p>";
    return;
  }

  var html = "<ul class='list-group'>";

for (var i = 0; i < carrito.length; i++) {
  var producto = carrito[i];

  html += "<li class='list-group-item d-flex align-items-center justify-content-between'>"
  html += "<div class='d-flex align-items-center'>"
  html += "<img src='" + producto.img + "' class='imgCarrito'>"
  html += "<span>" + producto.titulo + " - " + producto.talle + "</span>"
  html += "</div>"

  html += "<div>"
  html += "<button class='btn btn-sm btn-outline-dark' onclick='modificarCantidad(" + i + ", -1)'>-</button> "
  html += "<span class='mx-2'>" + producto.cantidad + "</span>"
  html += "<button class='btn btn-sm btn-outline-dark' onclick='modificarCantidad(" + i + ", 1)'>+</button> "
  html += "<button class='btn btn-sm btn-outline-dark' onclick='eliminarProducto("+i+",1)'>🗑️</button>"
  html += "<span class='ms-2'>$" + (producto.precio * producto.cantidad) + "</span>"
  html += "</div>"

  html += "</li>"
}

html += "</ul>"

  contenedor.innerHTML = html;
}

function modificarCantidad(indice, cambio) {
  if (carrito[indice]) {
    carrito[indice].cantidad += cambio;

    if (carrito[indice].cantidad <= 0) {
      carrito.splice(indice, 1); 
    }

    actualizarCarritoNavbar()
    mostrarCarritoEnModal()
    guardarCarrito()

  }
}

function eliminarProducto(indice) {
  carrito.splice(indice, 1)
  actualizarCarritoNavbar()
  mostrarCarritoEnModal()
  guardarCarrito()

}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert("¡Gracias por tu compra!");

  carrito = [];

  actualizarCarritoNavbar()
  mostrarCarritoEnModal()
  guardarCarrito()

}

function guardarCarrito() {
  localStorage.setItem("carritoPrimates", JSON.stringify(carrito));
}

function recuperarCarrito() {
  var carritoGuardado = localStorage.getItem("carritoPrimates");

  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarritoNavbar();
  }
}
