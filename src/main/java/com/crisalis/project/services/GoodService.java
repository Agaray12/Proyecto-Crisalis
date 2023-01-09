package com.crisalis.project.services;


import com.crisalis.project.models.dto.request.good.GoodRequest;
import com.crisalis.project.models.dto.response.good.GoodResponse;

public interface GoodService {

    public GoodResponse createGood(GoodRequest goodRequest);

}
