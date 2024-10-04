from django.contrib import admin
from django.utils.timezone import localtime
from .models import FamilyTestResult

@admin.register(FamilyTestResult)
class FamilyTestResultAdmin(admin.ModelAdmin):
    list_display = ('id', 'virus_pattern', 'patient_sample', 'result', 'formatted_created_at')
    search_fields = ('virus_pattern', 'patient_sample', 'result')

    def formatted_created_at(self, obj):
        # Convert to local time and format
        return localtime(obj.created_at).strftime('%Y-%m-%d')

    formatted_created_at.short_description = 'Created At'
