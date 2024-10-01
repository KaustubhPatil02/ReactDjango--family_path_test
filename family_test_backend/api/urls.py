from django.urls import path
from .views import FamilyTestView

urlpatterns = [
    path('family-test/', FamilyTestView.as_view(), name='family-test'),
]
