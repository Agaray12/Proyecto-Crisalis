package com.crisalis.project.services.impl;

import com.crisalis.project.mappers.GoodMapper;
import com.crisalis.project.models.AppService;
import com.crisalis.project.models.Product;
import com.crisalis.project.models.dto.request.good.GoodRequest;
import com.crisalis.project.models.dto.response.good.GoodResponse;
import com.crisalis.project.repositories.ProductRepository;
import com.crisalis.project.repositories.ServiceRepository;
import com.crisalis.project.services.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GoodServiceImpl implements GoodService {

    @Autowired
    private ServiceRepository serviceRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private GoodMapper goodMapper;

    @Autowired
    private TaxServiceImpl taxService;

    @Override
    public GoodResponse createGood(GoodRequest goodRequest){
        if(goodRequest.getGoodType().equalsIgnoreCase("service")){
            AppService service = goodMapper.goodRequestToService(goodRequest);
            AppService serviceSaved = serviceRepo.save(service);
            return goodMapper.serviceEntityToResponse(serviceSaved);
        }else if(goodRequest.getGoodType().equalsIgnoreCase("product")) {
            Product product = productRepo.save(goodMapper.goodRequestToProduct(goodRequest));
            return goodMapper.productEntityToResponse(product);
        }

        return null;
    }

    @Override
    public List<GoodResponse> getAll(){
        List<GoodResponse> services = serviceRepo.findAll().stream().map(goodMapper::serviceEntityToResponse).collect(Collectors.toList());
        List<GoodResponse> products = productRepo.findAll().stream().map(goodMapper::productEntityToResponse).collect(Collectors.toList());

        return new ArrayList<>() {{
            addAll(services);
            addAll(products);
        }};
    }

    @Override
    public Optional<AppService> findServiceById(Integer id){
        return serviceRepo.findById(id);
    }

    @Override
    public Optional<Product> findProductById(Integer id){
       return productRepo.findById(id);
    }

    @Override
    public GoodResponse updateGood(Integer id, GoodRequest goodRequest) {
        Optional<AppService> serviceOpt = findServiceById(id);
        if(serviceOpt.isPresent()){
            AppService service = serviceOpt.get();
            service.setName(goodRequest.getName());
            service.setDescription(goodRequest.getDescription());
            service.setIsSpecial(goodRequest.getIsSpecial());
            service.setPrice(goodRequest.getPrice());
            service.setTaxes(taxService.getTaxesByName(goodRequest.getTaxNames()));
            return goodMapper.serviceEntityToResponse(serviceRepo.save(service));
        }

        Optional<Product> productOpt = findProductById(id);
        if(productOpt.isPresent()){
            Product product = productOpt.get();
            product.setName(goodRequest.getName());
            product.setDescription(goodRequest.getDescription());
            product.setPrice(goodRequest.getPrice());
            product.setTaxes(taxService.getTaxesByName(goodRequest.getTaxNames()));
            product.setHasWarranty(goodRequest.getHasWarranty());
            product.setWarrantyYears(goodRequest.getWarrantyYears());
            return goodMapper.productEntityToResponse(productRepo.save(product));
        }

        return null;
    }
}
