from django.urls import path
from youtubeapp.views import VideoView, ChannelView, CountView

urlpatterns = [
    path('videos/', VideoView.as_view(), name=''),
    path('videos/<str:slugname>/', VideoView.as_view(), name=''),
    
    path('channel/<str:username>/', ChannelView.as_view(), name=''),
    path('countview/<str:slug_name>/', CountView.as_view(), name=''),
]

