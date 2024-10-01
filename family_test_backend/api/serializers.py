# from rest_framework import serializers

# class FamilyTestSerializer(serializers.Serializer):
#     virusPattern = serializers.CharField()
#     patients = serializers.ListField(
#         child=serializers.CharField()
#     )


from rest_framework import serializers
from .models import FamilyTestResult

class FamilyTestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyTestResult
        fields = '__all__'  # You can list fields explicitly if needed
