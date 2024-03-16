
window.onload = function () {
    const form = document.querySelector(".login-form");
    const togglePasswordButton = document.getElementById('togglePassword');


    //..................
    togglePasswordButton.addEventListener('click', function () {
        const contraseniaInput = document.querySelector("input[name='contrasenia']");
        const type = contraseniaInput.getAttribute('type') === 'password' ? 'text' : 'password';
        contraseniaInput.setAttribute('type', type);
        togglePasswordButton.textContent = type === 'password' ? 'Mostrar senha' : 'Ocultar';
    });

    // En caso de que la validación del email y la contraseña del backend sea correcta
    // devuelve en el input con id="validacionOk" el value "validacionOk" entonces
    // en ese caso enviamos al usuario na notificación del Swal
    const validacionOk = document.getElementById('validacionOk');
    if (validacionOk.value == "") {
        console.log(validacionOk.value)
       
    } 
    if (validacionOk.value == "validacionOk") { 
        Swal.fire({
            title: 'Bem vindo ao NANO Handmade',
            text: 'Aproveite nossos produtos',
            icon: 'success'
        }).then(()=> {

            window.location = "/";
        });
    }

    const emailInput = document.querySelector("input[name='email']");
    const errorDatos = document.querySelector(".errorDatos");

    emailInput.addEventListener('change', (e) =>{
        errorDatos.innerText = "";
    } )

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

        const getUserListFromApi = async () => {
                try {
                    console.log("Entró a buscar mail en la API")
                    const response = await fetch('/api/user');
                    console.log("response ************************")
                    console.log(response)
                    const users = await response.json();
                    console.log(users)
                    return users;
                } catch (error) {
                    console.error('Error al obtener el listado de usuarios:', error);
                    throw error; 
                }
        };

        async function validateEmailExists(email) {
            try {
            /*    console.log("Entró a buscar mail en la API")
                const response = await fetch('/api/user');
                console.log("response ************************")
                console.log(response)
                console.log("response.json()")
                console.log(await response.json())
                const usersList = await response.json();
                console.log("users ***************************************")
                console.log(userslist);
            */    
                const userListFromApi = await getUserListFromApi();
                console.log(userListFromApi)
                const emailExists = userListFromApi.data.data.some(user => user.email.toLowerCase() === email.toLowerCase());
                console.log(emailExists);
                return emailExists;
                
            } catch (error) {
                console.error("Error al validar el correo electrónico" , error);
            }      
        }

        if (emailInput.value == "") {
            errores.push("email vacío");
            errorEmail.innerText = "Por favor, preencha o campo";
        } else {
            if (!esValidoEmail(emailInput.value)) {
                errores.push("email inválido");
                errorEmail.innerText = "Email inválido";
            } else {
                // Si es email válido borra los innerText
                errorEmail.innerText = "";

            /*    const email = emailInput.value;
                try {
                    console.log(email , "Busqueda en Base de datos")
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
            */
            }
        }

        // Validación contraseña
        function esValidPassword(contrasenia) {
            const tieneUpperCase = /[A-Z]/.test(contrasenia);
            const tieneLowerCase = /[a-z]/.test(contrasenia);
            const tieneSymbol = /[\W_]/.test(contrasenia);
            return tieneUpperCase && tieneLowerCase && tieneSymbol && contrasenia.length >= 8;
        }
        console.log(contraseniaInput.value , " Vamos a validar")
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
            
           /* Swal.fire({
                title: 'Bem vindo ao NANO Handmade',
                text: 'Aproveite nossos produtos',
                icon: 'success'
            }).then(()=> {
                form.submit();
            });*/

            form.submit();
        }
    });
};



