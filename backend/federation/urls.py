from django.urls import path
from . import views

urlpatterns = [
    path('semantic-query', views.semantic_query, name='federation-semantic-query'),
]
