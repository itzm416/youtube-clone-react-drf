from rest_framework.response import Response
from rest_framework import status

# for class base view
from rest_framework.views import APIView
from youtubeapp.serializers import VideoSerializer, ChannelSerializer
from youtubeapp.models import Video
from account.models import UserChannel

# fetch all videos without authentication
class VideoView(APIView):
    def get(self, request, slugname=None, format=None):

        # it is the request pass in the url as http://127.0.0.1:8000/product?category=mobile
        search_video = self.request.query_params.get('searchvideo')
        
        if slugname is not None:
            queryset = Video.objects.get(slug=slugname)
            serializer = VideoSerializer(queryset)
        elif search_video is not None:
            queryset = Video.objects.filter(title=search_video)
            serializer = VideoSerializer(queryset, many=True)
        else:
            queryset = Video.objects.all()
            serializer = VideoSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# fetch user channel without authentication
class ChannelView(APIView):
    def get(self, request, username=None, format=None):
        queryset1 = UserChannel.objects.get(username=username)
        queryset2 = Video.objects.filter(creator=queryset1)
        
        serializer1 = ChannelSerializer(queryset1)
        serializer2 = VideoSerializer(queryset2, many=True)
        
        res = {'user':serializer1.data, 'videos':serializer2.data}
        return Response(res, status=status.HTTP_200_OK)

class CountView(APIView):
    def get(self, request, slug_name=None, format=None):
        queryset = Video.objects.get(slug=slug_name)
        queryset.views += 1
        queryset.save()
        res = {'msg':'view'}
        return Response(res, status=status.HTTP_200_OK)

# class UploadVideoView(APIView):
#     renderer_classes = [UserRenderer]
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]
#     def patch(self, request, format=None):
#         user = MyUser.objects.get(pk=request.user.id)
#         serializer = VideoSerializer(user, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         res = {'msg':'User update success'}
#         return Response(res, status=status.HTTP_200_OK)


