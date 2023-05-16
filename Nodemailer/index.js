//Importaciones
const express = require('express')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

//Llamar config de dotenv
dotenv.config()

//Traemos el puerto de .env
const PORT = process.env.PORT;

//Configuramos nuestro servidor
const server = express()

//Configuramos el ROUTER de express para Nodemailer
const router = express.Router()

router.get('/sendNewMail', (req, res, next) => {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    // El objeto de transporte responsable de establecer y configurar con el servidor. 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    })

    //Configurar opciones
    const mailOptions = {
        from: email,
        to: 'jonathanrodvazquez@gmail.com',
        subject: 'Confirmación',
        text: 'Todo esta okay! 👌'
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if (error){
            return next(error)
        } else {
            return res.status(200).json('Email sent: ' + info.response);
        }
    })
})

server.use('/', router)    


//Escuchar al servidor
server.listen(PORT, () => {
    console.log(`Server running in http://localhost${PORT} 😎`)
})

