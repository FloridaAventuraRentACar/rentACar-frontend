export function formatDate(dateString) {
  const [year, month, day] = dateString.split("-")
  const date = new Date(year, month - 1, day)

  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}