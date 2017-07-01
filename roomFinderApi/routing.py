from channels.routing import route
from roomFinderApi.consumers import ws_connect, ws_disconnect, http_consumer

# channel_routing is like urlpatterns whereas route is url()
channel_routing = [
    route('websocket.connect', ws_connect),
    route('websocket.disconnect', ws_disconnect),
    route('http.request', http_consumer)
]
