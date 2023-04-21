import Dexie from "dexie"

// https://qiita.com/yamayamasan/items/a4297e724b86f4a00fd2
const database = new Dexie('app')
database.version(1).stores({ form: '&datetime' })
const form = database.table('form')

export const putForm = async ({ name, email, message }) => {
  const datetime = new Date().toISOString()
  await form.put({datetime, name, email, message})
}

export const deleteForm = async (datetime) => {
  console.log(datetime)
  await form.delete(datetime)
}

export const fetchForm = () => {
  return form.orderBy('datetime').reverse().toArray()
}
