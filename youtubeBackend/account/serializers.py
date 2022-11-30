from rest_framework import serializers
from account.models import MyUser, UserChannel

from youtubeapp.models import Video

from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from account.utils import Util

# ------------------------------user account---------------------------------------

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        model = MyUser
        fields = ['email','first_name','last_name','password','password2','tc','is_active']
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        
        if password != password2:
            raise serializers.ValidationError('Password does not match')
        return attrs

    def create(self, validate_data):
        return MyUser.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=225)
    class Meta:
        model = MyUser 
        fields = ['email','password']
   
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id','email','first_name','last_name']

class UserChannelSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    subscribers = UserProfileSerializer(many=True)
    class Meta:
        model = UserChannel
        fields = '__all__'
        
class UserVideoSerializer(serializers.ModelSerializer):
    creator = UserChannelSerializer()
    class Meta:
        model = Video
        fields = '__all__'

class User_Change_Password_Serializer(serializers.Serializer):
    password = serializers.CharField(style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        fields = ['password','password2']

    def validate(self, attrs):
        user = self.context.get('user')
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError('Password does not match')
        user.set_password(password)
        user.save()
        return attrs

class User_Send_Email_Password_Serializer(serializers.Serializer):
    email = serializers.EmailField(max_length=225)
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if MyUser.objects.filter(email=email).exists():
            user = MyUser.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = 'http://localhost:3000/reset/'+uid+'/'+token
            print('Password Reset Link', link)
            body = 'Click on the Following link ' + link
            data = {
                'subject':'Reset Your Password',
                'body':body,
                'to_email':user.email
            }
            Util.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError('email does not match')

class User_Password_Reset_Serializer(serializers.Serializer):
    password = serializers.CharField(style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        fields = ['password','password2']

    def validate(self, attrs):
        try:
            # user = self.context.get('user')
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')

            if password != password2:
                raise serializers.ValidationError('Password does not match')

            id = smart_str(urlsafe_base64_decode(uid))
            user = MyUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user,token):
                raise serializers.ValidationError('Token is not valid')
                
            user.set_password(password)
            user.save()
            return attrs

        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user,token)
            raise serializers.ValidationError('Token is not valid')




