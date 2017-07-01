from django.http import HttpResponse
from channels.handler import AsgiHandler

def ws_connect(message):
    message.reply_channel.send({"accept": True})
    print ('ws_connected')


def ws_disconnect(message):
    print ('ws_disconnected')

def http_consumer(message):
    response = HttpResponse("Hello World!")
    for chunk in AsgiHandler.encode_response(response):
        message.reply_channel.send(chunk)
