console.log('validaciones del front registro')
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".registro");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombreInput = document.querySelector("input[name='name']");
        const emailInput = form.querySelector("input[name='email']");
        const addressInput = document.querySelector("input[name='address']");
        const contraseniaInput = document.querySelector("input[name='contrasenia']");
        const confirmContraseniaInput = document.querySelector("input[name='confirm-contrasenia']");
        //let datosMalError = document.querySelector('#datosMalError');
        let errorNombre = document.querySelector('#errorNombre');
        let errorEmail = document.querySelector('#errorEmail');
        let errorDireccion = document.querySelector('#errorDireccion');
        let errorContrasenia = document.querySelector('#errorContrasenia');
        let errorConfirmContrasenia = document.querySelector('#errorConfirmContrasenia');
        
        let errores = [];

        if (nombreInput.value.length < 4) {
            errores.push('error nombre');
            errorNombre.innerText = "O nome deve ter pelo menos 4 caracteres.";
            nombreInput.classList.add('is-invalid');
            nombreInput.classList.remove('is-valid');
                        
        } else {
            nombreInput.classList.remove('is-invalid');
            nombreInput.classList.add('is-valid');
            errorNombre.innerHTML = '';
        }

        // Validación de la dirección
        if (addressInput.value.trim() === "") {
            errores.push('error direccion');
            errorDireccion.innerText = "Por favor, complete este campo.";
            addressInput.classList.add('is-invalid');
            addressInput.classList.remove('is-valid');
        } else {
            addressInput.classList.remove('is-invalid');
            addressInput.classList.add('is-valid');
            errorDireccion.innerHTML = '';
        }

        // Validación de la contraseña
        function esValidPassword(contrasenia) {
            // Verificar que la contraseña tenga al menos 8 caracteres,
            // una mayúscula, una minúscula y un símbolo
            const tieneUpperCase = /[A-Z]/.test(contrasenia);
            const tieneLowerCase = /[a-z]/.test(contrasenia);
            const tieneSymbol = /[\W_]/.test(contrasenia);
            let esValida = false;
            if (tieneUpperCase && tieneLowerCase && tieneSymbol && contrasenia.length >= 8) {
                esValida = true;
            }
            return esValida;
        }

        const contraseniaValida = esValidPassword(contraseniaInput.value);

        if (!contraseniaValida) {
            errores.push("error contrasenia");
            errorContrasenia.innerText = "As senhas devem ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um símbolo.";
            contraseniaInput.classList.add('is-invalid');
            contraseniaInput.classList.remove('is-valid');
        } else {
            errorContrasenia.innerText = "";
            contraseniaInput.classList.remove('is-invalid');
            contraseniaInput.classList.add('is-valid');
        }

        // Confirmación de la contraseña
        if (contraseniaInput.value !== confirmContraseniaInput.value) {
            errores.push("error confirmacion contrasenia");
            errorConfirmContrasenia.innerText = "As senhas não coincidem.";
            confirmContraseniaInput.classList.add('is-invalid');
            confirmContraseniaInput.classList.remove('is-valid');
        } else {
            errorConfirmContrasenia.innerText = "";
            confirmContraseniaInput.classList.remove('is-invalid');
            confirmContraseniaInput.classList.add('is-valid');
        }

        // Validación del email
        function esValidoEmail(email) {
            const arroba = email.indexOf('@');
            const punto = email.lastIndexOf('.');
            const esValido = arroba !== -1 && punto > arroba;
            return esValido;
        }

        if (emailInput.value.trim() === "") {
            errores.push("error email vacio");
            errorEmail.innerText = "Por favor, complete este campo.";
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
        } else {
            if (!esValidoEmail(emailInput.value)) {
                errores.push("error email invalido");
                errorEmail.innerText = "Email inválido.";
                emailInput.classList.add('is-invalid');
                emailInput.classList.remove('is-valid');
            } else {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
                errorEmail.innerText = "";

                const getUserListFromApi = async () => {
                    try {
                    const response = await fetch('/api/user');
                    const users = await response.json();
                    console.log(users)
                return users;
                    } catch (error) {
                    console.error('Error al obtener el listado de usuarios:', error);
                    throw error; 
                    }
                };

                const validateEmailExists = async (email) => {
                    try {
                    const userListFromApi = await getUserListFromApi();
                    const emailExists = userListFromApi.data.data.some(user => user.email.toLowerCase() == email.toLowerCase())
                    console.log(emailExists)
                    
                    return emailExists;
                    } catch (error) {
                    console.error('Error al validar el correo electrónico:', error);
                    return false; 
                    }
                };
                const email = emailInput.value;
                const emailExists = await validateEmailExists(email);
                if (emailExists) {
                    errorEmail.innerText = "Este email ya está registrado.";
                    errores.push("error email ya registrado");
                } else {
                    errorEmail.innerText = "";
                    
                }
    
            }
        }

        // Mostrar errores generales
        /*if (errores.length > 0) {
            errores.innerHTML = '';
            errores.forEach(error => {
                errores.innerHTML += `<p class="errorDatos">${error}</p>`;
            });
        } else {
            errores.innerHTML = '';*/
        console.log(errores)
        if (errores.length == 0){
            errores.innerHTML = '';

            Swal.fire({
                title: 'Bem vindo',
                text: 'Usuario registrado!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                form.submit();
            });
        }
    });
});


