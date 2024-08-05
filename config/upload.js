import multer from 'multer';
import path from 'path';

// Configura el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardan los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo con timestamp
    }
});

// Crea una instancia de multer
const upload = multer({ storage });

export default upload;
