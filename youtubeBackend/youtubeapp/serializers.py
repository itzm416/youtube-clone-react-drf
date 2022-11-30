from rest_framework import serializers
from youtubeapp.models import Video
from account.models import UserChannel, MyUser
from account.serializers import UserProfileSerializer

class ChannelSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    subscribers = UserProfileSerializer(many=True)
    class Meta:
        model = UserChannel
        fields = '__all__'
 
class VideoSerializer(serializers.ModelSerializer):
    creator = ChannelSerializer()
    likes = ChannelSerializer(many=True)
    dislikes = ChannelSerializer(many=True)
    class Meta:
        model = Video
        fields = '__all__'

