document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('userForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Personaliza la dirección de correo electrónico en el atributo action del formulario
    // email encriptado
    const actionUrl = 'https://formsubmit.co/353e60ac6721fb40a1f21688c2050697';

    // Realiza alguna acción con los datos del formulario, como enviar una solicitud AJAX

    // Ejemplo de solicitud AJAX con fetch
    // Envio formulario con datos del user
    fetch(actionUrl, {
      method: 'POST',
      body: new FormData(form)
    })
      .then(function(response) {
        if (response.ok) {
          console.log('El formulario se envió correctamente');
          // Realiza alguna acción adicional después de enviar el formulario

          // Por ejemplo, puedes redirigir al usuario a otra página
          window.location.href = 'http://localhost:5500/Proyecto-Codo-a-Codo/html/index.html';
        } else {
          console.error('Error al enviar el formulario');
          // Realiza alguna acción adicional en caso de error
        }
      })
      .catch(function(error) {
        console.error('Error en la solicitud:', error);
        // Realiza alguna acción adicional en caso de error
      });
  });
});