document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('userForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();


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