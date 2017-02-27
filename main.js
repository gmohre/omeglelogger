$("document").ready(function(){

  var chatLog = [];  

  var accessTokenInput, prevValue, value, failCount;
    failCount = 0;
    accessTokenInput = 'f80986b59b974a2e84bae8cdf67d0497'; //API Key
window.init(accessTokenInput);
  setInterval(function(){
    value =  "" + $(".strangermsg")[$(".strangermsg").length-1].lastChild.innerHTML;
      
      /*Check if response is not empty and not the same as the previous*/
      if(value != undefined && value != prevValue){
          //Reset Fail Count
          failCount = 0;
          console.log("User: "+value);
          prevValue = value;
          //Push response to the log
          pushResponse(value, "User");
          //Send response to AI.API
          sendText(value).then(function(response) {
            var result;
            try {
                result = response.result.fulfillment.speech
            } catch(error) {
                result = "";
            }
            //setResponseJSON(response);
            setResponseOnNode(result);
            })
            .catch(function(err) {
            //setResponseJSON(err);
            setResponseOnNode("?");
            });
    }else{
        failCount = failCount + 1;
    }
      
    if(failCount >= 10){
        //Reset the fail count
        failCount = 0;
        endChat("NoResponse");
        console.warn("Disconnecting!");
        $('.disconnectbtn').click();
        setTimeout(function(){
            $('.disconnectbtn').click();
        }, 500);
    }
  }, 4000);


  function setResponseOnNode(response) {
      console.info("Bot: "+response);
    $('.chatmsg').val(response);
    $('.sendbtn').click();
    pushResponse(response, "Bot");
  }
    
function endChat(reasonForEnd){
     
}
    
function pushResponse(textReponse, authorIs){
   chatLog.push(authorIs+": "+textReponse);
}

});
