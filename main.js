console.log("Melissa Greene is Running!");
$("document").ready(function(){
    

  var accessTokenInput, prevValue, value, failCount;
    failCount = 0;
    accessTokenInput = 'f80986b59b974a2e84bae8cdf67d0497'; //API Key
window.init(accessTokenInput);
  setInterval(function(){
    value =  "" + $(".strangermsg")[$(".strangermsg").length-1].lastChild.innerHTML;
      if(value != undefined && value != prevValue){
          failCount = 0;
                  console.log("User: "+value);
                 prevValue = value;
            sendText(value)
              .then(function(response) {
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
                setResponseOnNode("Something goes wrong");
              });
    }else{
        failCount = failCount + 1;
    }
    if(failCount >= 10){
        failCount = 0;
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
  }
    
function saveChat(){
    
}

});
