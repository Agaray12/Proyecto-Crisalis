package com.crisalis.project.services;


import com.crisalis.project.models.AppService;
import com.crisalis.project.models.Product;
import com.crisalis.project.models.dto.request.good.GoodRequest;
import com.crisalis.project.models.dto.response.good.GoodResponse;

import java.util.List;
import java.util.Optional;

public interface GoodService {

    public GoodResponse createGood(GoodRequest goodRequest);

    public List<GoodResponse> getAll();

    public Optional<AppService> findServiceById(Integer id);

    public Optional<Product> findProductById(Integer id);

    public GoodResponse updateGood(Integer id, GoodRequest goodRequest);

}
