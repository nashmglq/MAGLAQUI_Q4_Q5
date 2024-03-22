from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Product
from base.serializer import ProductSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postProduct(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)  
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.user == product.user:
        product.delete()
        print("YES!")
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        print("YOU CANT!")
        return Response(status=status.HTTP_403_FORBIDDEN)
 
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


    if request.user != product.user:
        return Response({"error": "You are not allowed to edit this product."},
                        status=status.HTTP_403_FORBIDDEN)

    serializer = ProductSerializer(product, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save(user=request.user) 
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)