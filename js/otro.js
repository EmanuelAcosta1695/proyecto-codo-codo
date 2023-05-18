// npm install nodemailer
const nodemailer = require('nodemailer');

const userForm = document.querySelector("#userForm")

userForm.addEventListener('submit', async event => {
    event.preventDefault();

    //   const nombre = document.querySelector('#nombre').value;

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

  //alert("todo bien");

  sendEmail(nombre, apellido, edad, email);

    // // Crear el objeto con los datos del usuario
	// const usuario = {
	// 	nombre,
	// 	apellido,
	// 	edad,
	// 	telefono,
	// 	email
    // }

});


async function sendEmail(nombre, apellido, edad, email) {
    // Crea un objeto de transporte de correo electrónico
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña',
      },
    });
  
    // Crea un mensaje de correo electrónico
    let message = {
      from: 'tu_correo@gmail.com',
      to: email,
      subject: 'Mensaje de la página de bienvenida',
      html: `<p>Nombre: ${nombre}</p><p>Apellido: ${apellido}</p><p>Edad: ${edad}</p><p>Email: ${email}</p><p>Mensaje de la página de bienvenida: Hola, ¡bienvenido a nuestra página!</p>`,
    };
  
    // Envía el mensaje de correo electrónico
    let info = await transporter.sendMail(message);
  
    console.log('Mensaje enviado: %s', info.messageId);

    // Después de enviar el correo electrónico con éxito
    toastr.success("El correo electrónico se ha enviado con éxito.");

    // alert('¡El correo electrónico se ha enviado exitosamente!');
  }
