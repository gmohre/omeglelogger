from flask import Flask
import os
import jinja2
from flask import jsonify
from flask import render_template

import json
AI_API_TOKEN = 'f80986b59b974a2e84bae8cdf67d0497'

app = Flask(__name__)
FILE_TEMPLATE = '%(id)s_%(topic)s'

def render(tpl_path, context):
    path, filename = os.path.split(tpl_path)
    return jinja2.Environment(
        loader=jinja2.FileSystemLoader(path or './')
    ).get_template(filename).render(context)

@app.route("/")
def home():
    return render_template('chatToCanvas.html')

#@app_route("get_from_omegle")
#def get_from_omegle():


@app.route("/get_conversation/<topic>/<id>")
def getConversation(topic, id):
    filename = FILE_TEMPLATE % dict(id=id, topic=topic)
    with open(filename) as data_file:
        data = json.loads(data_file.read())
    return jsonify(data)



@app.route("/render_conversation/<topic>/<id>")
def renderConversation(topic, id):
    text = "heybigyoubigguy"
    numLines = str.count(text, "\n") + 1
    conversation = {'timestamp':1,'numLines':numLines, 'text':text, 'topic':"coffee", 'id':1}
    filename = FILE_TEMPLATE % conversation
    jsonData = jsonify(conversation)
    with open(filename, 'w') as outfile:
            json.dump(conversation, outfile)
    return "Rendered %s to disk at %s" %(conversation['text'], filename)


if __name__ == "__main__":
    app.run()
