from django.db import models
from account.models import UserChannel
from django.utils.text import slugify

class Video(models.Model):
    creator = models.ForeignKey(UserChannel,on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=200, blank=True)
    video_thumbnail = models.ImageField(upload_to='videothumbnail', null=True, blank=True)
    video_file = models.FileField(upload_to='videofile', null=True, blank=True)
    desc = models.TextField(null=True, blank=True)
    likes = models.ManyToManyField(UserChannel, blank=True, related_name='like')
    dislikes = models.ManyToManyField(UserChannel, blank=True, related_name='dislike')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    views = models.IntegerField(default=0)
    

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Video, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
  