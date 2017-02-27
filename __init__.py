from flask import Flask
import os
import jinja2

app = Flask(__name__)

def render(tpl_path, context):
    path, filename = os.path.split(tpl_path)
    return jinja2.Environment(
        loader=jinja2.FileSystemLoader(path or './')
    ).get_template(filename).render(context)

@app.route("/")
def hello():
    return "Hello World!"

#@app.route("/store_conversation")
#def storeConversation(conversation):
#	pass
	#Write conversation to disk, throw exception on fail

#@app.route("/get_conversation")
#def getConversation(conversation):
#	pass
	#get by iD whatever?

@app.route("/render_conversation")
def renderConversation():
	conversation = {'timestamp':1,'numResponses':1, 'text':"hey\nyou\nguy", 'topic':"coffee", 'id':1}
	result = render('chat.html', conversation)
	return result

if __name__ == "__main__":
    app.run