const errorsMessages = {
    es: {
        CAR_NOT_AVAILABLE: 'El vehículo no esta disponible en la fecha y hora indicada.',
        UNEXPECTED_ERROR: 'Error inesperado',
        VALIDATION_ERROR: 'Error de validación en alguno de los campos'
    },
    en: {
        CAR_NOT_AVAILABLE: 'The car is not available at the specified date and time.',
        UNEXPECTED_ERROR: 'Unexpected error',
        VALIDATION_ERROR: 'Validation error in one or more fields'
    }
}

export function getErrorMessage(code, language) {
    return errorsMessages[language][code] || errorsMessages[language].UNEXPECTED_ERROR || 'Error inesperado';
}
