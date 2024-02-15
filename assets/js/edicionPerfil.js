console.log('Validaciones front edicion de perfil');
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".edicion-form");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = document.querySelector("input[name='email']");
        const contraseniaInput = document.querySelector("input[name='contrasenia']");
        let errorEmail = document.querySelector('#errorEmail');
        let errorContrasenia = document.querySelector('#errorContrasenia');
        let errores = [];

        // Validación email
        function esValidoEmail(email) {
            const arroba = email.indexOf('@');
            const punto = email.lastIndexOf('.');
            const esValido = arroba !== -1 && punto > arroba;
            return esValido;
        }

        if (!esValidoEmail(emailInput.value)) {
            errores.push("email inválido");
            errorEmail.innerText = "Email inválido";
        } 

        // Validación contraseña
        function esValidPassword(contrasenia) {
            // Verificar que la contraseña tenga al menos 8 caracteres,
            // una mayúscula, una minúscula y un símbolo
            const tieneUpperCase = /[A-Z]/.test(contrasenia);
            const tieneLowerCase = /[a-z]/.test(contrasenia);
            const tieneSymbol = /[\W_]/.test(contrasenia);
            return tieneUpperCase && tieneLowerCase && tieneSymbol && contrasenia.length >= 8;
        }

        const contraseniaValida = esValidPassword(contraseniaInput.value);

        if (!contraseniaValida) {
            errores.push("error contrasenia");
            errorContrasenia.innerText = "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um símbolo.";
        } else {
            errorContrasenia.innerText = "";
        }

        // Mostrar errores generales
        if (errores.length === 0) {
            errores.innerText = '';
           
            Swal.fire({
                title: 'Sucesso',
                text: 'Seu perfil foi editado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                
                form.submit();  
            });
        }
    });
});