from rest_framework import serializers
from account.models import MyUser
from django.contrib.auth.password_validation import validate_password

# ------------------------------user account---------------------------------------

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        model = MyUser
        fields = ['email','password','password2','is_active']
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        
        if password != password2:
            raise serializers.ValidationError('Password does not match')
            
        validate_password(password)
        return attrs

    def create(self, validate_data):
        return MyUser.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=225)
    class Meta:
        model = MyUser
        fields = ['email','password']
