var renderChat = function(chatEntry){
    const fontSize = 25;
    const lineHeight = 35;
    const fontColor = "#000000";
    const backgroundColor = "#FFFFFF";
    
    var fontMargin = (lineHeight-fontSize)/2;
    var canvas = document.getElementById("chatRendered");
    var ctx = canvas.getContext("2d");
        
    var chatSplit = chatEntry.text.split("/n");
    
    ctx.canvas.height = lineHeight*chatEntry.numLines;
    ctx.canvas.width = 800;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
    
    ctx.fillStyle = fontColor;
    ctx.font =  fontSize+"px Arial";
    
    var currentPos = fontSize/2 + fontMargin*2;
    for(var i=0; i < chatSplit.length.numLines; i++){
        ctx.fillText(chatSplit[i], fontMargin, (currentPos+fontMargin));
        currentPos = currentPos+lineHeight;
    }
    
}
                    