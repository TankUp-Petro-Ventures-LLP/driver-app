export const MessageConfig = {
    startDelivery : {
        heading : 'डिलीवरी शुरू करें?',
        message : 'डिलीवरी शुरू करने पर आपकी लोकेशन सेव हो जाएगी',
        button: {
            accept: "शुरू करें",
            decline: "नहीं"
          }
    }, 


    saveDispensing : function(qty, tank_number){
        return {
            heading : 'Save Dispensing',
            message : `क्या ${qty} लीटर ${tank_number} में भरा गया है?`,
            button: {
                accept: "हाँ",
                decline: "नहीं"
              }
        }
    } ,

    meterReadingConfirmation : function(previous, current){
        return {
            // heading : 'Save Dispensing',
            message : `पक्का यही है, क्युकी पुराना ${previous} km कम था और तुमने अभी भी ${current} km डाला है,सही से चेक करलो?`,
            button: {
                accept: "सही है",
                decline: "फिर से जांचें"
              }
        }
    } ,


    askPaymentModal : {
            heading : 'पेमेंट मिला?',
            message : `क्या आपको कस्टमर से पेमेंट मिली`,
            button: {
                accept: "हाँ",
                decline: "नहीं"
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
        message : 'क्या सही म गाडी जीरो हुई है?',
        button: {
            accept: "हाँ",
            decline: "नहीं"
          }
    }, 
}