from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    priority = [
        (1,'High Priority'),
        (2,'Moderate Priority'),
        (3, 'Low Priority')
    ]
    status = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed')
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    priority = models.IntegerField(choices=priority)
    status = models.CharField(max_length=50, choices=status)
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name="tasks")

    def __str__(self):
        return self.title