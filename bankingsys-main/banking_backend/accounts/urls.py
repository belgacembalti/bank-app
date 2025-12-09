from django.urls import path
from .views import RegisterView, LoginView, LogoutView, VirtualCardView

urlpatterns = [
    path('signup/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('virtual-cards/', VirtualCardView.as_view()),
]
