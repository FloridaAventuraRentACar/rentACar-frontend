import formatDateAndHour from "../functions/formatDateAndHour";
import locationNames from "../names/locationNames";

export function rentalConfirmationEmailHtml(
  name,
  surname,
  carName,
  phoneNumber,
  startDateAndHour,
  endDateAndHour,
  pickupPlace,
  returnPlace,
  daysBooked,
  totalCost
) {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nueva Reserva Confirmada</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #fff8e1;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 2px solid #ff9800;
        border-radius: 10px;
        padding: 20px;
      }
      .header {
        background-color: #ffa726;
        padding: 20px;
        text-align: center;
        border-radius: 10px 10px 0 0;
      }
      .header h1 {
        margin: 0;
        color: #ffffff;
        font-size: 24px;
      }
      .section {
        margin: 20px 0;
      }
      .section h2 {
        color: #ff9800;
        margin-bottom: 10px;
      }
      .info-table {
        width: 100%;
        border-collapse: collapse;
      }
      .info-table td {
        padding: 8px;
        border-bottom: 1px solid #f0f0f0;
      }
      .info-table td:first-child {
        font-weight: bold;
        color: #f57c00;
        width: 40%;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: 0.9em;
        color: #777;
      }
      .highlight {
        background-color: #fff3e0;
        padding: 10px;
        border-left: 4px solid #ffa726;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🚗 Nueva Reserva Confirmada</h1>
      </div>

      <div class="section">
        <h2>Hola Patricia,</h2>
        <p class="highlight">Se ha confirmado una nueva reserva en <strong>Florida Aventura Rent A Car</strong>. A continuación, encontrarás los detalles del cliente y del alquiler.</p>
      </div>

      <div class="section">
        <table class="info-table">
          <tr>
            <td>Cliente:</td>
            <td>${name} ${surname}</td>
          </tr>
          <tr>
            <td>Teléfono:</td>
            <td>${phoneNumber}</td>
          </tr>
          <tr>
            <td>Vehículo reservado:</td>
            <td>${carName}</td>
          </tr>
          <tr>
            <td>Fecha y hora de entrega:</td>
            <td>${formatDateAndHour(startDateAndHour)}</td>
          </tr>
          <tr>
            <td>Fecha y hora de devolución:</td>
            <td>${formatDateAndHour(endDateAndHour)}</td>
          </tr>
          <tr>
            <td>Lugar de entrega:</td>
            <td>${locationNames[pickupPlace]}</td>
          </tr>
          <tr>
            <td>Lugar de devolución:</td>
            <td>${locationNames[returnPlace]}</td>
          </tr>
          <tr>
            <td>Días de alquiler:</td>
            <td>${daysBooked}</td>
          </tr>
          <tr>
            <td>Precio total:</td>
            <td><strong>$${totalCost}</strong></td>
          </tr>
        </table>
      </div>

      <div class="footer">
        <p>📅 Por favor, ponte en contacto con el cliente y prepara el vehículo para la entrega.</p>
        <p><strong>Florida Aventura Rent A Car</strong></p>
      </div>
    </div>
  </body>
  </html>
  `;
}

export default rentalConfirmationEmailHtml;
