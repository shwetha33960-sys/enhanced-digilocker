from django.contrib import admin
from .models import Document, Notification, Share, ActivityLog, Profile

admin.site.register(Document)
admin.site.register(Notification)
admin.site.register(Share)
admin.site.register(ActivityLog)
admin.site.register(Profile)