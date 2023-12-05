const multer = require('multer');
const path = require('path');
const crypto = require ('crypto');

console.log("Entró a multerMiddleware");

function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0,length);
}


const multerDiskStorage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../assets/images'));
    },

    filename: function (req, file, cb) {

        const uniqueName = generateRandomString(8) + Date.now() + path.extname(file.originalname); 
        let imageName = uniqueName;
        cb(null, imageName);
    },
})

// AHORA VAMOS A HACER LAS VALIDACIONES
// O SEA QUE EL ARCHIVO SEA DEL TIPO IMAGEN 
// Y EL TAMAÑO MENOR QUE 3MB



const fileFilter = (req, file , cb) => {
    

    console.log("Entró a multerMiddleware");

    if (file.mimetype.includes('image')) {
//    if (file.mimetype.includes('image') && file.fileSize < (1024 * 1024 * 3)) {

        console.log('Archivo correcto');
        cb (null , true)
    } else {
        console.log('Archivo incorrecto');
        req.fileError = true
        cb (null , false)
    }
}

//const limits = {fileSize: (1024 * 1024 * 3) }


// DE ACA PASAMOS AL MIDDLEWARE DE VALIDACIONES

//const fileUpload = multer ({storage:multerDiskStorage , fileFilter : fileFilter , limits : limits});
const fileUpload = multer ({storage:multerDiskStorage , fileFilter : fileFilter});

module.exports = fileUpload;