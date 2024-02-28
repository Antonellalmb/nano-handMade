const db = require('../database/models');
const { check } = require('express-validator');
const { validationResult } = require("express-validator");



module.exports = [
    check('productName').notEmpty().withMessage('O nome do produto é obrigatório').isLength({ min: 5 }).withMessage('O nome do produto deve ter pelo menos 5 caracteres'),

    check('detail').notEmpty().withMessage('A descrição do produto é obrigatória').isLength({ min: 10 }).withMessage('A descrição do produto deve ter pelo menos 10 caracteres'),

    check('collectionSelected').notEmpty().withMessage('Selecione uma coleção válida'),

    check('discountSelectedItem').notEmpty().withMessage('Selecione um desconto válido'),

    check('colorSelected').notEmpty().withMessage('Selecione uma cor válida'),

    check('sizeSelected').notEmpty().withMessage('Selecione um tamanho válido'),

    check('productPrice')
        .notEmpty().withMessage('O preço do produto é obrigatório')
        .isFloat({ min: 0.01, max: 999999.99 }).withMessage('Digite um valor maior que zero e menor que 99999999.99.'),

    check('productStock').notEmpty().withMessage('Digite a quantidade de produtos em estoque'),

    check('productDetail').notEmpty().withMessage('Digite os detalhes do produto'),

    check('image').custom((value, { req }) => {
        if (!req.files || req.files.length === 0) {
            throw new Error('Selecione pelo menos uma imagem');
        }
        return true;
    })
];
