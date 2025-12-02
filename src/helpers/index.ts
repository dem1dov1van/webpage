export const priceFormatter = (value: number | string) => {
  let number = value
  if (Number.isInteger(number)) {
    return number.toLocaleString("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 })
  } else {
    return Number(number).toLocaleString("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 0 })
  }
}