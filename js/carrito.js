function miCarrito(event) {

  // Obtener la card padre del botón
  var card = event.target.closest('.card, .item_desayuno_merienda, .item_desayuno_merienda_large');

  // Obtener el h3 y el input dentro de la card
  var h3 = card.querySelector('h3');
  var input = card.querySelector('input');

  // Obtener los valores de los elementos
  var titulo = h3.textContent;
  var cantidad = input.value;

  // Mostrar los valores en la consola
  console.log("Título: " + titulo);
  console.log("Cantidad: " + cantidad);

  // Definir el objeto producto
  var producto = {
    titulo: titulo,
    cantidad: cantidad
  };

  console.log(producto);

  // URL para consumir la API
  var url = 'https://krost16.pythonanywhere.com/carrito/'; // URL del endpoint

  // Verificar si el carrito existe en el localStorage
  if (localStorage.getItem('carrito')) {
    var carrito = JSON.parse(localStorage.getItem('carrito'));

    var encontrado = false;

    // Iterar el carrito
    for (var i = 0; i < carrito.length; i++) {
      var objeto = carrito[i];

      // Comparar el producto que el usuario intenta agregar con los productos existentes en el local storage
      if (objeto.titulo === producto.titulo) {

        // El producto ya existe en el local storage y tiene un ID que se obtuvo al ingresarlo por primera vez a la DB
        // le agrego la propiedad id al producto
        producto.id = objeto.id;

        console.log(producto.id);

        // Enviar el producto al backend con el ID
        fetch(url + producto.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(producto)
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data); // Mostrar la respuesta del servidor

            // Recuperar lo que retorna el backend
            var productoResponse = data.producto;
            console.log(productoResponse);

            // Actualizar la cantidad en el objeto carrito después de la respuesta del backend
            carrito[i].cantidad = parseInt(productoResponse.cantidad);

            // Actualizar el local storage con el carrito modificado
            localStorage.setItem('carrito', JSON.stringify(carrito));

            window.location.reload()
          })
          .catch(function (error) {
            console.log(error); // Mostrar el error en caso de haberlo
          });

        // Producto encontrado
        encontrado = true;

        // Romper el bucle for
        break;
      }
    }

    // El carrito existe, pero el producto no se encontró en el carrito, agregarlo al carrito y a la DB
    // Si encontrado es false
    if (!encontrado) {

      // Enviar el producto que se intenta agregar al backend
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data); // Mostrar la respuesta del servidor

          var productoResponse = data.producto;
          console.log(productoResponse);

          // Agregar el productoResponse al carrito
          carrito.push(productoResponse);

          // Actualizar el local storage con el carrito modificado
          localStorage.setItem('carrito', JSON.stringify(carrito));

          window.location.reload()
        })
        .catch(function (error) {
          console.log(error); // Mostrar el error en caso de haberlo
        });
    }

  } else {
    // El 'carrito' no existe en el local storage, agregar el producto a la BD y al local storage

    // Enviar el producto a la BD
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data); // Mostrar la respuesta del servidor

        var productoResponse = data.producto;
        console.log(productoResponse);

        // Guardar el carrito en el local storage
        localStorage.setItem('carrito', JSON.stringify([productoResponse]));

        window.location.reload()
      })
      .catch(function (error) {
        console.log(error); // Mostrar el error en caso de haberlo
      });
  }
}




function mostrarCarrito() {
  // solo va a mostrar los datos si el carrito aun existe en el local storage. Se elimina al pedir presupuesto
  if (localStorage.getItem('carrito')) {
    var carrito = JSON.parse(localStorage.getItem('carrito'));

    // Crear una variable para acumular el contenido HTML
    let html = '';

    // Iterar el carrito
    for (var i = 0; i < carrito.length; i++) {
      var objeto = carrito[i];

      // Agregar el contenido de cada objeto al HTML acumulado
      html += `
        <tr>
          <td>${objeto.id}</td>
          <td>${objeto.titulo}</td>
          <td>${objeto.cantidad}</td>
          <td><button class="btnDelete" onclick="eliminarProduct(this)"><i>❌</i></button></td>
        </tr>
      `;
    }

    // Establecer el contenido completo en el elemento "tbody"
    document.getElementById('tbody').innerHTML = html;
  }
}





async function eliminarProduct(btn) {

  let fila = btn.parentNode.parentNode;

  // accedo al elemento que contiene e titulo del producto
  let segundoTd = fila.childNodes[3];

  let textoSegundoTd = segundoTd.textContent;
  console.log(textoSegundoTd)

  var carrito = JSON.parse(localStorage.getItem('carrito'));


  for (var i = 0; i < carrito.length; i++) {
    var objeto = carrito[i];

    // Comparar el producto que el usuario intenta eliminar con los productos existentes en el local storage
    if (objeto.titulo === textoSegundoTd) {
      carrito.splice(i, 1); // Eliminar el elemento del carrito utilizando splice
      localStorage.setItem('carrito', JSON.stringify(carrito));
      break; // Salir del bucle después de eliminar el elemento
    }

  }


  let id = fila.firstElementChild.textContent;
  console.log(id);

  let url = 'https://krost16.pythonanywhere.com/carrito/';

  console.log(url + id);

  if (confirm("Se eliminara el contacto de la agenda con el id " + id + ". ¿Deseas continuar?")) {
      const response = await fetch(url + id, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(response => {
          console.log('Exito:', response);
          location.reload();
      })
      .catch(error => console.error('Error:', error));
      alert('Borrado con exito');
  } else {
      alert('Cancelado');
  }

}