import formatDateAndHour from "../functions/formatDateAndHour"
import locationNames from "../names/locationNames";

export function rentalClientConfirmationEmailhtml(name, surname, carName, phoneNumber ,startDateAndHour, endDateAndHour, pickupPlace , returnPlace, daysBooked, totalCost) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirmación de Reserva</title>
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
        }
        .footer {
        text-align: center;
        margin-top: 30px;
        font-size: 0.9em;
        color: #777;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="header">
        <h1>¡Reserva Confirmada!</h1>
        </div>

        <div class="section">
        <h2>Gracias por elegirnos, ${name}</h2>
        <p>Hemos recibido tu reserva de vehículo con éxito. A continuación, te compartimos los detalles:</p>
        </div>

        <div class="section">
        <table class="info-table">
            <tr>
            <td>Vehículo:</td>
            <td>${carName}</td>
            </tr>
            <tr>
            <td>Nombre:</td>
            <td>${name} ${surname}</td>
            </tr>
            <tr>
            <td>Teléfono:</td>
            <td>${phoneNumber}</td>
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
        <p>Florida Aventura Rent A Car</p>
        <p>¡Te esperamos para que vivas la mejor experiencia sobre ruedas!</p>
        </div>
    </div>
    </body>
    </html>
`;
}

export default rentalClientConfirmationEmailhtml;
