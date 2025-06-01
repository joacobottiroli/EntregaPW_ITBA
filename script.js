
var botones = document.querySelectorAll('.filtro-btn')
var productos = document.querySelectorAll('.col')

for (var i = 0; i < botones.length; i++) {
  botones[i].addEventListener('click', function() {
    var filtro = this.id

    for (var k = 0; k < botones.length; k++) {
        botones[k].classList.remove('active')
    }
    this.classList.add('active')

    
    for (var j = 0; j < productos.length; j++) {
      var producto = productos[j]

      if (filtro === 'todos' || producto.classList.contains(filtro)) {
        producto.style.display = 'block'
      } else {
        producto.style.display = 'none'
      }
    }
  })
}


