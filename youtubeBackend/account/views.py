from account.renderers import UserRenderer
from rest_framework.response import Response
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, force_bytes
from account.utils import Util
from rest_framework import status
import uuid

from youtubeapp.models import Video

# for class base view
from rest_framework.views import APIView

# simple jwt auth
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate

from account.serializers import UserRegistrationSerializer, UserProfileSerializer, UserLoginSerializer, User_Change_Password_Serializer, User_Send_Email_Password_Serializer, User_Password_Reset_Serializer, UserChannelSerializer, UserVideoSerializer
from account.models import MyUser, UserChannel


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# ----------------user signup--------------------

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save(is_active=False)
        email = data.email

        token = uuid.uuid4()
        user = MyUser.objects.get(email=email)
        uid = urlsafe_base64_encode(force_bytes(user.id))

        link = f'http://localhost:3000/verify-user-email/{uid}/{token}/'
        print('Verify your email', link)
        body = 'Click on the Following link ' + link
        data = {
                'subject':'Verify your email',
                'body':body,
                'to_email':data.email
                }
        Util.send_email(data)
        res = {'msg':'User signup success'}
        return Response(res, status=status.HTTP_200_OK)

class User_Email_Verify_View(APIView):
    renderer_classes = [UserRenderer]
    def get(self, request, uid, token, format=None):
        id = smart_str(urlsafe_base64_decode(uid))
        user = MyUser.objects.get(id=id)
        if user.is_active == False:
            user.is_active = True
            user.save()
            res = {'msg':'email verified successfully'}
            return Response(res, status=status.HTTP_201_CREATED)
        else:
            res = {'msg':'email already verified'}
            return Response(res, status=status.HTTP_201_CREATED)

# ----------------user login--------------------

class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        if MyUser.objects.filter(email=email).exists():
            check_user = MyUser.objects.get(email=email)
            if check_user.is_active == False:
                res = {
                        'errors':{
                            'non_field_errors':['Email is not verified']
                            }
                        }
                return Response(res, status=status.HTTP_400_BAD_REQUEST)
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                res = {
                        'token':token,
                        'msg':'login success',
                        'idd':user.id
                        }
                return Response(res, status=status.HTTP_201_CREATED) 
            else:
                res = {
                        'errors':{
                            'non_field_errors':['Email or Password is not Valid']
                            }
                        }
                return Response(res, status=status.HTTP_400_BAD_REQUEST)
        else:
            res = {
                    'errors':{
                            'non_field_errors':['Email or Password is not Valid']
                            }
                        }
            return Response(res, status=status.HTTP_400_BAD_REQUEST)

# ------------------------------------------------------

class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = MyUser.objects.get(pk=request.user.id)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateProfileView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, format=None):
        user = MyUser.objects.get(pk=request.user.id)
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        res = {'msg':'User update success'}
        return Response(res, status=status.HTTP_200_OK)

# -------------------------------------------------------------------------

class UserChannelView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = UserChannel.objects.get(user=request.user)
        serializer = UserChannelSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateChannelView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, format=None):
        user = UserChannel.objects.get(user=request.user.id)
        serializer = UserChannelSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        res = {'msg':'User update success'}
        return Response(res, status=status.HTTP_200_OK)

class SubscribeUnSubscribeChannelView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, userchannel=None, format=None):
        user = UserChannel.objects.get(username=userchannel)
        
        if user.subscribers.filter(id=request.user.id).exists():
            user.subscribers.remove(request.user)
            res = {'msg':'Subscribe'}
            return Response(res, status=status.HTTP_200_OK)
        else:
            res = {'msg':'Subscribed'}
            user.subscribers.add(request.user)
            return Response(res, status=status.HTTP_200_OK)
              

class LikeDislikeView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, like_name=None, slug_name=None, format=None):
        video = Video.objects.get(slug=slug_name)
        user = UserChannel.objects.get(id=request.user.id)

        if like_name == 'like':
            if video.likes.filter(id=user.id).exists():
                video.likes.remove(user)
                res = {'msg':'likeremoved'}
                return Response(res, status=status.HTTP_200_OK)
            else:
                if video.dislikes.filter(id=user.id).exists():
                    video.dislikes.remove(user)
                res = {'msg':'liked'}
                video.likes.add(user)
                return Response(res, status=status.HTTP_200_OK)

        elif like_name == 'dislike':
            if video.dislikes.filter(id=user.id).exists():
                video.dislikes.remove(user)
                res = {'msg':'dislikeremoved'}
                return Response(res, status=status.HTTP_200_OK)
            else:
                if video.likes.filter(id=user.id).exists():
                    video.likes.remove(user)
                res = {'msg':'disliked'}
                video.dislikes.add(user)
                return Response(res, status=status.HTTP_200_OK)


       


# ---------------------------------------------------------


class UserVideoslView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        video = Video.objects.filter(creator=request.user.id)
        serializer = UserVideoSerializer(video, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateUserVideoslView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, slug_name, format=None):
        video = Video.objects.get(slug=slug_name)
        serializer = UserVideoSerializer(video, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        res = {'msg':'Video Updated Successfully'}
        return Response(res, status=status.HTTP_200_OK)

class UploadUserVideoslView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, format=None):
        serializer = UserVideoSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = UserChannel.objects.get(user=request.user.id)
        serializer.save(creator=user)
        res = {'msg':'Video Uploaded Successfully'}
        return Response(res, status=status.HTTP_200_OK)

class UserVideodeletelView(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, slug_name, format=None):
        video = Video.objects.get(slug=slug_name)
        video.delete()
        res = {'msg':'Video Deleted Successfully'}
        return Response(res, status=status.HTTP_200_OK)


# ----------------user password change--------------------

class User_Change_Password_View(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = User_Change_Password_Serializer(data=request.data, context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            res = {'msg':'password change success'}
            return Response(res, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ----------------user password reset--------------------

class User_Send_Email_Password_View(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = User_Send_Email_Password_Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        res = {'msg':'email send success'}
        return Response(res, status=status.HTTP_201_CREATED)

class User_Password_Reset_View(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, uid, token, format=None):
        serializer = User_Password_Reset_Serializer(data=request.data, context={'uid':uid,'token':token})
        if serializer.is_valid(raise_exception=True):
            res = {'msg':'password reset success'}
            return Response(res, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




        