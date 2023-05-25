var contenido = document.querySelector('#contenido');

    function traer_usuario() {
        fetch('https://randomuser.me/api/?results=3')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                var resultados = res.results;
                var opiniones = ["Este lugar es genial!!! Tiene un ambiente acogedor y relajado, ideal para pasar tiempo con amigos. El personal es amable y atento y la comida abundante y a buen precio.", "Recomiendo este bar a amigos. Decoración moderna y elegante, ambiente sofisticado. Calidad de los platos excepcional con ingredientes de primera. Música perfecta, nunca demasiado alta. Ideal para citas románticas o noches con amigos. ", "Muy recomendable!! Fui a festejar mi cumpleaños allí y recibí una muy buena atención. El lugar es amplio y la comida rica y abundante, con buena relación calidad-precio. El mozo que nos atendió se lleva un 10!"];
                var i = 0;

                var tabla = document.createElement('table');
                tabla.classList.add('table');

                // Crear encabezado de la tabla
                var encabezado = document.createElement('thead');
                var filaEncabezado = document.createElement('tr');
                filaEncabezado.innerHTML = `
                    <th>Usuario</th>
                    <th>Opinion</th>
                `;
                encabezado.appendChild(filaEncabezado);
                tabla.appendChild(encabezado);

                // Crear filas de datos
                var cuerpoTabla = document.createElement('tbody');
                resultados.forEach(resultado => {
                    var fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td><img src="${resultado.picture.large}" width="100px" class="img-fluid rounded-circle"></td>
                        <td>${opiniones[i]}</td>
                    `;
                    i++;
                    cuerpoTabla.appendChild(fila);
                });

                tabla.appendChild(cuerpoTabla);
                contenido.innerHTML = ''; // Limpiar contenido existente
                contenido.appendChild(tabla);
            })
            .catch(error => console.log("Ocurrió un error", error));
    }

    window.onload = traer_usuario;


document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('userForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    
    //userForm["name del input"] en el form y de casa uno solo obtiene el value
    const nombre = userForm['nombre'].value
    const apellido = userForm['apellido'].value
    const edad = userForm['edad'].value
    const email = userForm['email'].value


    // Validar los datos ingresados por el usuario
    if (nombre === '' || apellido === '' || email === '' || edad === '') {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (isNaN(edad)) {
      alert('La edad debe ser un número.');
      return;
    }
  
    // Personaliza la dirección de correo electrónico en el atributo action del formulario
    // email encriptado
    const actionUrl = 'https://formsubmit.co/353e60ac6721fb40a1f21688c2050697';


    // Envio formulario con datos del user
    fetch(actionUrl, {
      method: 'POST',
      body: new FormData(form)
    })
      .then(function(response) {
        if (response.ok) {

          console.log('El formulario se envió correctamente');

          window.location.href = 'http://127.0.0.1:5500/Proyecto-Codo-a-Codo/index.html';

        } else {

          console.error('Error al enviar el formulario');
    
        }
      })
      .catch(function(error) {

        console.error('Error en la solicitud:', error);
        
      });
  });
});