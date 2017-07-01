import os
import channels.asgi

#config to make Django use the new Channels request handle
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "roomFinderApi.settings")
channel_layer = channels.asgi.get_channel_layer()
