from flask import Flask
import os
import jinja2
from flask import jsonify
import json

app = Flask(__name__)
FILE_TEMPLATE = '%(id)s_%(topic)s'
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

@app.route("/get_conversation")
def getConversation(id=1, topic="coffee"):
	filename = FILE_TEMPLATE % dict(id=id, topic=topic)
	with open(filename) as data_file:
	    data = json.loads(data_file.read())
	return jsonify(data)



@app.route("/render_conversation")
def renderConversation():
	conversation = {'timestamp':1,'numResponses':1, 'text':"hey\nyou\nguy", 'topic':"coffee", 'id':1}
	filename = FILE_TEMPLATE % conversation
	jsonData = jsonify(conversation)
	with open(filename, 'w') as outfile:
		json.dump(conversation, outfile)
	return jsonData


if __name__ == "__main__":
    app.run