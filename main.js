console.log("Melissa Greene is Running!");
$("document").ready(function(){
    

  var accessTokenInput, prevValue, value, failCount;
    failCount = 0;


    //accessTokenInput = 'fc1eff951a80458aa9abd43446f15b9a'; //Classic
    //accessTokenInput = '98057b00400a40ad94b492e9ca0bf45d'; //Doggo Meme
    accessTokenInput = '140ce55f98b14aaabc3b24ff3d0cad41'; //Experimental
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
    
function saveChat

});
