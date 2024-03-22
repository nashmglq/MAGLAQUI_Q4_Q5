from django.urls import path
from base.views.product_views import *

urlpatterns = [
    path('', getProducts, name='products'),
    path('<str:pk>/', getProduct, name='product'),
    path('/post/', postProduct, name='post_product'),  
    path('/delete/<str:pk>/', deleteProduct, name='delete-product'),
    path('/update/<str:pk>/', updateProduct, name='edit-product'),



]