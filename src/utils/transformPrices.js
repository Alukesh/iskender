
export const transformPrice = (price) => {
    return Math.round(Number(price).toPrecision(4) / 100)
}