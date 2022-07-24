
const { google } = require('googleapis');
const sheets = google.sheets('v4');

const spreadsheetId = "1uG4QJTaiZny5FlOLQXIsx8UnrQQk-VyU1dkHHQo0NHg"

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "authorize_key.json",
    scopes: SCOPES
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function getSpreadSheet({spreadsheetId, auth}) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
}

async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName
  });
  return res;
}


module.exports = {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues
}



const authentication = async() => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "authorize_key.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const client = await auth.getClient()
    const sheet = google.sheets({
        version: 'v4',
        auth: client
    })
}

const getSheet = async() => {
    try{
        const { sheets } = await authentication();

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: id,
            range: 'sheet1'
        })
        return response.data
    } catch(e){
        console.log(e)
    }
}

const putSheet = async() => {
    try{

        const {id} = "userInput"
        const { sheets } = await authentication();
        const writeReq = await sheets.spreadsheets.values.append({
            spreadsheetId: id,
            range: 'sheet1',
            resources: {
                value: [
                    [id]
                ]
            }
        })
        if(writeReq.status == 200){
            return "written"
        }
    }catch(e) {

    }
}

export default putSheet