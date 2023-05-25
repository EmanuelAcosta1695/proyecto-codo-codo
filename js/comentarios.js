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