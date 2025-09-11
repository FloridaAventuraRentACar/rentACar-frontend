export function formatPhoneNumber (number) {
  // Eliminar todos los caracteres que no sean dígitos
  const clean = String(number || '').replace(/\D/g, '');

  // Si es formato internacional con código de país +54 y "9" (ej: 5491123456789)
  if (clean.length === 13 && clean.startsWith('549')) {
    return `+54 9 ${clean.slice(3, 5)} ${clean.slice(5, 9)}-${clean.slice(9)}`;
  }

  // Si comienza con 9 y tiene 11 dígitos (ej: 91123456789)
  if (clean.length === 11 && clean.startsWith('9')) {
    return `+54 9 ${clean.slice(1, 3)} ${clean.slice(3, 7)}-${clean.slice(7)}`;
  }

  // Si tiene 10 dígitos sin el 9 (ej: 1123456789)
  if (clean.length === 10) {
    return `+54 ${clean.slice(0, 2)} ${clean.slice(2, 6)}-${clean.slice(6)}`;
  }

  // Si no cumple con ningún formato, devolver el número original
  return number;
}