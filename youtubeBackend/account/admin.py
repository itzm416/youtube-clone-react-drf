from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from account.models import MyUser, UserChannel

class UserAdmin(BaseUserAdmin):

    list_display = ('id','email', 'tc', 'is_active', 'is_staff', 'is_superuser')

    list_filter = ('email',)

    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name','last_name','tc')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'tc')}
        ),
    )

    search_fields = ('email',)
    ordering = ('email',)


class UserChannelAdmin(admin.ModelAdmin):
    list_display = ('user','bio')

admin.site.register(MyUser, UserAdmin)
admin.site.register(UserChannel, UserChannelAdmin)
