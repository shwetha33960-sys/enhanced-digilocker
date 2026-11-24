from django.db import models
from django.contrib.auth.models import User


class Document(models.Model):
    KIND_CHOICES = [("issued", "Issued"), ("uploaded", "Uploaded")]
    CATEGORY_CHOICES = [
        ("Identity", "Identity"), ("Education", "Education"),
        ("Transport", "Transport"), ("Finance", "Finance"),
        ("Health", "Health"), ("Certificates", "Certificates"),
    ]
    STATUS_CHOICES = [("Active", "Active"), ("Flagged", "Flagged")]

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="documents")
    kind = models.CharField(max_length=10, choices=KIND_CHOICES)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200, blank=True)
    number = models.CharField(max_length=100, blank=True)
    file = models.FileField(upload_to="documents/", blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Active")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Notification(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    text = models.CharField(max_length=300)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:50]


class Share(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="shares")
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name="shares")
    token = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    revoked = models.BooleanField(default=False)

    def __str__(self):
        return f"Share of {self.document.title}"

class Profile(models.Model):
    STATUS_CHOICES = [("Active", "Active"), ("Suspended", "Suspended")]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Active")
    email_notifications = models.BooleanField(default=True)
    activity_alerts = models.BooleanField(default=True)
    language = models.CharField(max_length=20, default="English")

    def __str__(self):
        return f"Profile of {self.user.username}"

    
class ActivityLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="activity")
    action = models.CharField(max_length=100)
    detail = models.CharField(max_length=300, blank=True)
    log_type = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} - {self.action}"