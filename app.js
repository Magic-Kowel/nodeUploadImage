const express =  require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');

const app = express();
app.use(cors());
const PORT = 3000;
//crear imagenes mas pequenas
const helperImg = (filePath, filename, size = 300) =>{
    return sharp(filePath)
    .resize(size)
    .toFile(`./optimize/${filename}`)
}

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`)
    }
})
const upload = multer({storage})
app.post('/upload',upload.single('file'),(req,res) =>{
    console.log(req.file);
    //lepasamos los parametros
    helperImg(req.file.path, `resize-${req.file.filename}`,100);
    res.send({ data:"Imagen cargada"})
});
app.use(express.static('./uploads'));
app.get('/:img', function(req, res){
    res.sendFile( `uploads/${img}` );
}); 
app.listen(PORT, () => {
    console.log('Listo por el puerto', PORT);
})
