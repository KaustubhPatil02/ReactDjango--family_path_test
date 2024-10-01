from rest_framework.views import APIView
from rest_framework.response import Response
from .models import FamilyTestResult  # Import your model

class FamilyTestView(APIView):
    def post(self, request):
        # Get the virus pattern and patient samples from the request data
        virus_pattern = request.data.get('virusPattern', '')
        patients = request.data.get('patients', [])
        results = []

        for patient_sample in patients:
            # Check if the patient sample is a substring of the virus pattern
            result = 'Positive' if patient_sample in virus_pattern else 'Negative'
            results.append(result)
            
            # Save the result in the database
            FamilyTestResult.objects.create(
                virus_pattern=virus_pattern,
                patient_sample=patient_sample,
                result=result
            )

        return Response({'results': results})
