from django.db import models

class FamilyTestResult(models.Model):
    virus_pattern = models.CharField(max_length=255)
    patient_sample = models.CharField(max_length=255)
    result = models.CharField(max_length=10)  # Positive or Negative
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Test for {self.patient_sample}: {self.result}"
