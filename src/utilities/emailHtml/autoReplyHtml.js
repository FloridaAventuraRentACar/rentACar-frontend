export function autoReplyHtml(name) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8" />
        <title>Gracias por contactarnos</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5faff;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #ff6f00; /* naranja */
            color: white;
            padding: 20px;
            text-align: center;
        }
        .body {
            padding: 30px 20px;
            background-color: #ffffff;
        }
        .footer {
            background-color: #e0f7fa; /* celeste claro */
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #555;
        }
        .logo {
            max-width: 100px;
            margin-bottom: 10px;
        }
        </style>
    </head>
    <body>
        <div class="container">
        <div class="header">
            <h1>Gracias por contactarnos</h1>
        </div>
        <div class="body">
            <p>Hola <strong>${name}</strong>,</p>

            <p>¡Gracias por comunicarte con nosotros!</p>

            <p>
            Hemos recibido tu solicitud de contacto y nos pondremos en contacto contigo lo antes posible para brindarte una respuesta.
            </p>

            <p>
            Si tienes información adicional que quieras compartir, no dudes en responder a este correo.
            </p>

            <p>Saludos cordiales,<br /><strong>El equipo de Florida Aventura</strong></p>
        </div>
        <div class="footer">
            © 2025 Florida Aventura. Todos los derechos reservados.
        </div>
        </div>
    </body>
    </html>

    `;
}

export default autoReplyHtml