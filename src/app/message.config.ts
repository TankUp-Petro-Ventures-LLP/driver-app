export const MessageConfig = {
    startDelivery : {
        heading : 'Start Delivery',
        message : 'Delivery Suru karne Par Time start ho jayega',
        button: {
            accept: "Suru Kardo",
            decline: "Nahi"
          }
    }, 


    saveDispensing : function(qty, tank_number){
        return {
            heading : 'Save Dispensing',
            message : `Kya ${qty} ltr ${tank_number} me bhara gya hai?`,
            button: {
                accept: "Haan",
                decline: "Nahi"
              }
        }
    } ,

    askPaymentModal : {
            heading : 'Payment Mila',
            message : `Kya apko customer se payment mili`,
            button: {
                accept: "Haan",
                decline: "Nahi"
              }
        }
}