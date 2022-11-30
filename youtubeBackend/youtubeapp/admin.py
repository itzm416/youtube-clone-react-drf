from django.contrib import admin
from youtubeapp.models import Video



class VideoAdmin(admin.ModelAdmin):
    list_display = ('creator','title')

admin.site.register(Video, VideoAdmin)

