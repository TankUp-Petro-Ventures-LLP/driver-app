export const MessageConfig = {
    startDelivery : {
        heading : 'Start Delivery',
        message : 'Delivery Suru karne Par apki location save ho jayegi',
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

    meterReadingConfirmation : function(previous, current){
        return {
            // heading : 'Save Dispensing',
            message : `Pakka yhi hai kyuki purani ${previous} ltr thi aur tumne abhi itni ${current} ,shi se check krlo?`,
            button: {
                accept: "Sahi hai",
                decline: "Check Karo"
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
        },

    completeFilling : {
            // heading : 'Start Delivery',
            message : 'Are You Sure?',
            button: {
                accept: "Yes",
                decline: "No"
              }
        }, 
    completeOrder : {
        // heading : 'Start Delivery',
        message : 'Are You Sure you want to complete order?',
        button: {
            accept: "Yes",
            decline: "No"
          }
    }, 
    sendHardZero : {
        // heading : 'Start Delivery',
        message : 'Kya sahi m gaadi zero hui hai?',
        button: {
            accept: "Haan",
            decline: "Nahi"
          }
    }, 

    slipConfirmation: {
        message : 'Kya apne Parchi Nikali hai?',
        button: {
            accept: "Haan",
            decline: "Nahi"
          }
    }
}