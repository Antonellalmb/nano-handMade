
/*
window.onload = function () {
    const form = document.querySelector(".login-form");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = document.querySelector("input[name='email']");
        const contraseniaInput = document.querySelector("input[name='contrasenia']");
        let pError = document.querySelector('#errores');
        let errorEmail = document.querySelector('#errorEmail');
        let errores = [];

        // Validación email
        function esValidoEmail(email) {
            const arroba = email.indexOf('@');
            const punto = email.lastIndexOf('.');
            const esValido = arroba !== -1 && punto > arroba;
            return esValido;
        }

        if (emailInput.value == "") {
            errores.push("email vacío");
            errorEmail.innerText = "Por favor, preencha o campo";
        } else {
            if (!esValidoEmail(emailInput.value)) {
                errores.push("email inválido");
                errorEmail.innerText = "Email inválido";
            } else {
                const email = emailInput.value;
                const emailExists = await validateEmailExists(email);

                if (!emailExists) {
                    console.log('no encuentra email')
                    errorEmail.innerText = "e-mail não registrado";
                    errores.push("error email no registrado");
                } else {
                    errorEmail.innerText = "";
                }
            }
        }

        
    async function validateEmailExists(email) {
        try {
            const response = await fetch('/api/user');
            const users = await response.json();
            const emailExists = users.data.data.some(user => user.email.toLowerCase() === email.toLowerCase());
            console.log(emailExists);
            return emailExists;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

        // Validación contraseña
        function esValidPassword(contrasenia) {
            const tieneUpperCase = /[A-Z]/.test(contrasenia);
            const tieneLowerCase = /[a-z]/.test(contrasenia);
            const tieneSymbol = /[\W_]/.test(contrasenia);
            return tieneUpperCase && tieneLowerCase && tieneSymbol && contrasenia.length >= 8;
        }

        const ContraseniaValid = esValidPassword(contraseniaInput.value);

        if (!ContraseniaValid) {
            console.log('contraseña inválida')
            errores.push("error contraseña");
            pError.innerText = "A senha deve ter no mínimo 8 caracteres, sendo uma letra maiúscula, uma letra minúscula e um símbolo";
        } else {
            pError.innerText = ''
        }

        if (errores.length === 0) {
            errores.innerText = '';

            Swal.fire({
                title: 'Bem vindo ao NANO Handmade',
                text: 'Aproveite nossos produtos',
                icon: 'success'
            }).then(()=> {
                form.submit();
            });
        }
    });

    
};*/


window.onload = function () {
    const form = document.querySelector(".login-form");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = document.querySelector("input[name='email']");
        const contraseniaInput = document.querySelector("input[name='contrasenia']");
        let pError = document.querySelector('#errores');
        let errorEmail = document.querySelector('#errorEmail');
        let errores = [];

        // Validación email
        function esValidoEmail(email) {
            const arroba = email.indexOf('@');
            const punto = email.lastIndexOf('.');
            const esValido = arroba !== -1 && punto > arroba;
            return esValido;
        }

        if (emailInput.value == "") {
            errores.push("email vacío");
            errorEmail.innerText = "Por favor, preencha o campo";
        } else {
            if (!esValidoEmail(emailInput.value)) {
                errores.push("email inválido");
                errorEmail.innerText = "Email inválido";
            } else {
                const email = emailInput.value;
                try {
                    const emailExists = await validateEmailExists(email);

                    if (!emailExists) {
                        console.log('no encuentra email')
                        errorEmail.innerText = "e-mail não registrado";
                        errores.push("error email no registrado");
                    } else {
                        errorEmail.innerText = "";
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        // Validación contraseña
        function esValidPassword(contrasenia) {
            const tieneUpperCase = /[A-Z]/.test(contrasenia);
            const tieneLowerCase = /[a-z]/.test(contrasenia);
            const tieneSymbol = /[\W_]/.test(contrasenia);
            return tieneUpperCase && tieneLowerCase && tieneSymbol && contrasenia.length >= 8;
        }

        const ContraseniaValid = esValidPassword(contraseniaInput.value);

        if (!ContraseniaValid) {
            console.log('contraseña inválida')
            errores.push("error contraseña");
            pError.innerText = "A senha deve ter no mínimo 8 caracteres, sendo uma letra maiúscula, uma letra minúscula e um símbolo";
        } else {
            pError.innerText = ''
        }

        if (errores.length === 0) {
            errores.innerText = '';
            
            Swal.fire({
                title: 'Bem vindo ao NANO Handmade',
                text: 'Aproveite nossos produtos',
                icon: 'success'
            }).then(()=> {
                form.submit();
            });
        }
    });

    async function validateEmailExists(email) {
        const response = await fetch('/api/user');
        const users = await response.json();

        if (response.ok) {
            const emailExists = users.data.data.some(user => user.email.toLowerCase() === email.toLowerCase());
            console.log(emailExists);
            return emailExists;
        } else {
            console.log(error)
        }
    }
};




