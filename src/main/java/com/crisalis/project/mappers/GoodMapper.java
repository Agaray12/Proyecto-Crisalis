package com.crisalis.project.mappers;

import com.crisalis.project.models.Product;
import com.crisalis.project.models.AppService;
import com.crisalis.project.models.dto.request.good.GoodRequest;
import com.crisalis.project.models.dto.response.good.GoodResponse;
import org.springframework.stereotype.Component;

@Component
public class GoodMapper {

    public AppService goodRequestToService(GoodRequest goodRequest){
         AppService service = new AppService();
         service.setName(goodRequest.getName());
         service.setDescription(goodRequest.getDescription());
         service.setPrice(goodRequest.getPrice());
         service.setIsSpecial(goodRequest.getIsSpecial());
        return service;
    }

    public Product goodRequestToProduct(GoodRequest goodRequest){
        Product product = new Product();
        product.setName(goodRequest.getName());
        product.setDescription(goodRequest.getDescription());
        product.setPrice(goodRequest.getPrice());
        product.setHasWarranty(goodRequest.getHasWarranty());
        product.setWarrantyYears(goodRequest.getWarrantyYears());
        return product;
    }

    public GoodResponse productEntityToResponse(Product product) {
        GoodResponse response = new GoodResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setGoodType("Product");
        response.setHasWarranty(product.getHasWarranty());
        response.setWarrantyYears(product.getWarrantyYears());
        return response;
    }

    public GoodResponse serviceEntityToResponse(AppService service) {
        GoodResponse response = new GoodResponse();
        response.setId(service.getId());
        response.setName(service.getName());
        response.setDescription(service.getDescription());
        response.setPrice(service.getPrice());
        response.setGoodType("Service");
        response.setIsSpecial(service.getIsSpecial());
        return response;
    }

    public AppService goodResponseToServiceEntity(GoodResponse goodResponse) {
        AppService service = new AppService();
        service.setId(goodResponse.getId());
        service.setName(goodResponse.getName());
        service.setDescription(goodResponse.getDescription());
        service.setPrice(goodResponse.getPrice());
        service.setIsSpecial(goodResponse.getIsSpecial());
        return service;
    }

    public Product goodResponseToProductEntity(GoodResponse goodResponse) {
        Product product = new Product();
        product.setName(goodResponse.getName());
        product.setDescription(goodResponse.getDescription());
        product.setPrice(goodResponse.getPrice());
        product.setHasWarranty(goodResponse.getHasWarranty());
        product.setWarrantyYears(goodResponse.getWarrantyYears());
        return product;
    }
}
