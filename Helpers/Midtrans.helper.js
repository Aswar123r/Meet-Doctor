const midtransClient = require('midtrans-client')

let Snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : process.env.SERVER_KEY,
        clientKey : process.env.API_MIDTRANS_TRANSACTION_URL
    })

module.exports = Snap


