const cdn = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`
const images = {
  coffee: ['photo-1495474472287-4d71bcdd2085','photo-1445116572660-236099ec97a0','photo-1509042239860-f550ce710b93','photo-1514432324607-a09d9b4aefdd'],
  pastries: ['photo-1555507036-ab1f4038808a','photo-1509440159596-0249088772ff','photo-1509365465985-25d11c17e1f6','photo-1486427944299-d1955d23e34d'],
  breakfast: ['photo-1533089860892-a7c6f0a88666','photo-1525351484163-7529414344d8','photo-1528712306091-ed0763094c98'],
  burger: ['photo-1568901346375-23c9450c58cd','photo-1550547660-d9450f859349','photo-1571091718767-18b5b1457add'],
  pizza: ['photo-1513104890138-7c749659a591','photo-1574071318508-1cdbab80d002','photo-1579751626657-72bc17010498'],
  meal: ['photo-1546069901-ba9599a7e63c','photo-1547592180-85f173990554','photo-1515003197210-e0cd71810b5f','photo-1473093295043-cdd812d0e601'],
  dessert: ['photo-1578985545062-69928b1d9587','photo-1551024506-0bccd828d307','photo-1565958011703-44f9829ba187'],
  drinks: ['photo-1544145945-f90425340c7e','photo-1497534446932-c925b458314e','photo-1551024709-8f23befc6f87','photo-1553530666-ba11a7da3888'],
}

const pick = (group, key) => {
  const value = [...key].reduce((total, character) => total + character.charCodeAt(0), 0)
  return cdn(images[group][value % images[group].length])
}

const getKey = value => {
  if (!value) return ''
  if (typeof value === 'object') {
    const name = value.name || ''
    const tags = Array.isArray(value.tags) ? value.tags.join(' ') : ''
    return `${name} ${tags}`.toLowerCase().trim()
  }
  return String(value).toLowerCase().trim()
}

const getGroup = key => {
  if (/(coffee|latte|espresso|cappuccino|americano|mocha|macchiato|french press|café)/.test(key)) return 'coffee'
  if (/(cake|dessert|donut|muffin|custard|toast|chocolate|sweet|pastry)/.test(key)) return 'dessert'
  if (/(pastr|bread|croissant|sambusa|kebab|sandwich|wrap|baguette)/.test(key)) return 'pastries'
  if (/pizza/.test(key)) return 'pizza'
  if (/burger/.test(key)) return 'burger'
  if (/(juice|drink|smoothie|milkshake|tea|mojito|water|soda)/.test(key)) return 'drinks'
  if (/(breakfast|omelette|egg|toast|cereal)/.test(key)) return 'breakfast'
  if (/(salad|soup|healthy|rice|fish|beef|chicken|pasta|meal|stew|curry)/.test(key)) return 'meal'
  return 'meal'
}

export const menuImageFor = (value = '') => {
  const key = getKey(value)
  const group = getGroup(key)
  return pick(group, key)
}

export const defaultMenuImage = cdn(images.pastries[0])
