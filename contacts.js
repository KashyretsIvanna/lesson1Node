const uuidv1 = require('uuid').v1
const fs = require('fs')
const path=require("path")
const contactsPath = path.resolve("db/contacts.json")


function listContacts() {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
  })
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }

    let parsed = JSON.parse(data)
    let el = parsed.filter((el) => el.id == contactId)[0]
    console.log(el)
  })
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }

    fs.writeFile(
      contactsPath,
      JSON.stringify([...JSON.parse(data).filter((el) => el.id != contactId)]),
      (err) => {
        if (err) {
          console.log(err)
        }
      },
    )
  })
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf8', async (err, data) => {
    if (err) {
      console.log(err)
    }

    let content = { id: uuidv1(), name: name, email: email, phone: phone }
    fs.writeFile(
      contactsPath,
      JSON.stringify([...JSON.parse(data), content]),
      (err) => {
        if (err) {
          console.log(err)
        }
      },
    )
  })
}


module.exports = {
  addContact: addContact,
  removeContact: removeContact,
  getContactById: getContactById,
  listContacts: listContacts,
}
