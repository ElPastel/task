import { encoded, translations } from "./data.js"

console.log("Let's rock")
console.log(encoded, translations)

function decodeByIds(encoded, translations) {
  const decoded = []
  const uniqueIds = new Set()
  const ignoredKeys = ["groupId", "service", "formatSize", "ca"]

  encoded.forEach((obj) => {
    const objItem = {}

    for (let key in obj) {
      if (!ignoredKeys.includes(key)) {
        objItem[key] = translations[obj[key]] ?? obj[key]
        Object.keys(translations).includes(obj[key]) && uniqueIds.add(obj[key])
      } else {
        objItem[key] = obj[key]
      }
    }

    decoded.push(objItem)
  })

  return { decoded, uniqueIds: Array.from(uniqueIds).sort((a, b) => a - b) }
}

const { decoded, uniqueIds } = decodeByIds(encoded, translations)
console.log(decoded)
console.log(uniqueIds)
