export function contactUsHtml(name , message , email) {
  return `
        <!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Nuevo mensaje de contacto</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5faff;
        margin: 0;
        padding: 0;
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
        background-color: #0288d1; /* celeste fuerte */
        color: white;
        padding: 20px;
        text-align: center;
      }
      .body {
        padding: 30px 20px;
        background-color: #ffffff;
      }
      .footer {
        background-color: #ffe0b2; /* naranja claro */
        text-align: center;
        padding: 15px;
        font-size: 14px;
        color: #555;
      }
      .label {
        font-weight: bold;
        color: #ff6f00; /* naranja */
      }
      .content {
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Nuevo mensaje de contacto</h1>
      </div>
      <div class="body">
        <div class="content">
          <p class="label">Nombre completo:</p>
          <p>${name}</p>
        </div>

        <div class="content">
          <p class="label">Mensaje:</p>
          <p>${message}</p>
        </div>

        <div class="content">
          <p class="label">Correo de contacto:</p>
          <p>${email}</p>
        </div>
      </div>
      <div class="footer">
        Este mensaje fue enviado desde el formulario de contacto.
      </div>
    </div>
  </body>
</html>

    `;
}

export default contactUsHtml