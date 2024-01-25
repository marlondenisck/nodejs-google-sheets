require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { JWT } = require('google-auth-library')

const serviceAccountAuth = new JWT({
  email: process.env.client_email,
  key: process.env.private_key,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
})

const doc = new GoogleSpreadsheet(process.env.idsheet, serviceAccountAuth)

const run = async () => {
 try {
  await doc.loadInfo()
  // console.log(doc.title)
  const sheet1 = doc.sheetsByIndex[0]
  console.log(sheet1.title)
  await sheet1.loadCells('A2:B2'); 
  const cellA2 = sheet1.getCell(1,0)
  console.log(cellA2.value)

  if(cellA2.value === 'Verdadeiro') {
    const sheet = doc.sheetsByIndex[1]
    const date = new Date()
  
    await sheet.addRow({
      Data: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`, 
      Nota: '9', 
      Mensagem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl sed ultricies ultrices, nunc nunc ultricies.'})
  
  }
 

 } catch (error) {
  
 }
  

  
}

run()