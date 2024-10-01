from django.contrib import admin
from .models import FamilyTestResult

@admin.register(FamilyTestResult)
class FamilyTestResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'virus_pattern', 'patient_sample', 'result', 'created_at')
    search_fields = ('virus_pattern', 'patient_sample', 'result')
