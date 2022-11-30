from django.db import models
from django.contrib.auth.models import AbstractUser
from account.manager import MyUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver

class MyUser(AbstractUser):
    username = None
    email = models.EmailField(verbose_name='Email Address', unique=True)
    first_name = models.CharField(max_length=225, null=True, blank=True)
    last_name = models.CharField(max_length=225, null=True, blank=True)
    
    tc = models.BooleanField()

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['tc']

    def __str__(self):
        return self.email

class UserChannel(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    username = models.CharField(max_length=10, unique=True)
    user_image = models.ImageField(upload_to='userimage', null=True, blank=True)
    user_banner = models.ImageField(upload_to='userbanner', null=True, blank=True)
    subscribers = models.ManyToManyField(MyUser, blank=True, related_name='subs')
    bio = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.email

@receiver(post_save, sender=MyUser)
def create_profile(sender, instance, created, **kwargs):
    if created:
        UserChannel.objects.create(user=instance)


