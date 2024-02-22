console.log("Entraste a validar ADICIONAR COLEÇÃO y adicionar decuentos");
/*
window.addEventListener("load", () => {
    const form = document.querySelector(".tables");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const collectionName = document.querySelector('input[name="collectionName"]');
        const detail = document.querySelector('textarea[name="detail"]');
        const errorNombre = document.getElementById("errorNombre");
        const errorDescripcion = document.getElementById("errorDescr");

        let errores = [];

        if (collectionName.value.trim() === "") {
            errores.push("O nome da coleção é obrigatório");
            errorNombre.innerText = "Para adicionar uma coleção, você deve preencher este campo";
        } else if (collectionName.value.length < 5) {
            errores.push("O nome da coleção deve ter pelo menos 4 caracteres");
            errorNombre.innerText = "O nome da coleção deve ter pelo menos 4 caracteres";
        } else {
            errorNombre.innerText = "";
        }

        if (detail.value.length < 5) {
            errores.push("O detalhe da coleção deve ter pelo menos 5 caracteres");
            errorDescripcion.innerText = "Campo obrigatório, mínimo de 5 caracteres";
        } else {
            errorDescripcion.innerText = "";
        }

        if (errores.length == 0) {
            Swal.fire(
                'Parabéns',
                'Coleção adicionada!',
                'success'
            ).then(() => {
                form.submit();
            });
        } else {
            console.log(errores);
        }
    });
});
*/

console.log("Entraste a validar");

window.addEventListener("load", () => {
    const formCollections = document.querySelector(".form-collections");
    const formDiscounts = document.querySelector(".form-discounts");

    if (formCollections) {
        formCollections.addEventListener("submit", function (e) {
            e.preventDefault();

            const collectionName = document.querySelector('input[name="collectionName"]');
            const detail = document.querySelector('textarea[name="detail"]');
            const errorNombre = document.getElementById("errorNombre");
            const errorDetail = document.getElementById("errorDescr");

            let errores = [];

            if (collectionName.value.trim() === "") {
                errores.push("O nome da coleção é obrigatório");
                errorNombre.innerText = "Para adicionar uma coleção, você deve preencher este campo";
            } else {
                errorNombre.innerText = "";
            }

            if (detail.value.trim() === "") {
                errores.push("O detalhe da coleção é obrigatório");
                errorDetail.innerText = "Para adicionar uma coleção, você deve preencher este campo";
            } else if (detail.value.length < 5) {
                errores.push("O detalhe da coleção deve ter pelo menos 5 caracteres");
                errorDetail.innerText = "O detalhe da coleção deve ter pelo menos 5 caracteres";
            } else {
                errorDetail.innerText = "";
            }

            if (errores.length == 0) {
                Swal.fire(
                    'Parabéns',
                    'Coleção adicionada!',
                    'success'
                ).then(() => {
                    formCollections.submit();
                });
            } else {
                console.log(errores);
            }
        });
    }

    if (formDiscounts) {
        formDiscounts.addEventListener("submit", function (e) {
            e.preventDefault();

            const discountName = document.querySelector('input[name="discountName"]');
            const discountPercentage = document.querySelector('input[name="discountPercentage"]');
            const errorNombre = document.getElementById("errorNombre");
            const errorPorcentaje = document.getElementById("errorPorcentaje");

            let errores = [];

            if (discountName.value.trim() === "") {
                errores.push("O nome do desconto é obrigatório");
                errorNombre.innerText = "Para adicionar um desconto, você deve preencher este campo";
            } else {
                errorNombre.innerText = "";
            }

            if (discountPercentage.value.trim() === "") {
                errores.push("A percentagem do desconto é obrigatória");
                errorPorcentaje.innerText = "Para adicionar um desconto, você deve preencher este campo";
            } else if (isNaN(discountPercentage.value) || parseInt(discountPercentage.value) <= 0 || parseInt(discountPercentage.value) > 100) {
                errores.push("A percentagem do desconto deve ser um número entre 1 e 100");
                errorPorcentaje.innerText = "A percentagem do desconto deve ser um número entre 1 e 100";
            } else {
                errorPorcentaje.innerText = "";
            }

            if (errores.length == 0) {
                Swal.fire(
                    'Parabéns',
                    'Desconto adicionado!',
                    'success'
                ).then(() => {
                    formDiscounts.submit();
                });
            } else {
                console.log(errores);
            }
        });
    }
});
