from django.urls import path
from account.views import UserRegistrationView, UserProfileView, UserLoginView, User_Email_Verify_View, User_Change_Password_View, User_Send_Email_Password_View, User_Password_Reset_View, UpdateChannelView, UpdateProfileView, UserChannelView, SubscribeUnSubscribeChannelView, LikeDislikeView, UserVideoslView, UpdateUserVideoslView, UserVideodeletelView, UploadUserVideoslView

urlpatterns = [
    path('userprofileinfo/', UserProfileView.as_view(), name=''),
    path('userprofileupdate/', UpdateProfileView.as_view(), name=''),
    
    path('userchannelinfo/', UserChannelView.as_view(), name=''),
    path('userchannelupdate/', UpdateChannelView.as_view(), name=''),
    path('subscribe-unsubscribe/<str:userchannel>/', SubscribeUnSubscribeChannelView.as_view(), name=''),
    path('like-dislike/<str:slug_name>/<str:like_name>/', LikeDislikeView.as_view(), name=''),

    path('uservideos/', UserVideoslView.as_view(), name=''),
    path('updateuservideo/<str:slug_name>/', UpdateUserVideoslView.as_view(), name=''),
    path('uploaduservideo/', UploadUserVideoslView.as_view(), name=''),
    path('uservideodelete/<str:slug_name>/', UserVideodeletelView.as_view(), name=''),
    
    path('register/', UserRegistrationView.as_view(), name=''),
    path('login/', UserLoginView.as_view(), name=''),
    path('verify-email/<uid>/<token>/', User_Email_Verify_View.as_view(), name=''),
    path('change-password/', User_Change_Password_View.as_view(), name=''),
    path('send-reset-password-email/', User_Send_Email_Password_View.as_view(), name=''),
    path('passwordreset/<uid>/<token>/', User_Password_Reset_View.as_view(), name=''),
]

