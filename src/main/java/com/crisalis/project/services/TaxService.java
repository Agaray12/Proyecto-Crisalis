package com.crisalis.project.services;

import com.crisalis.project.models.Tax;
import com.crisalis.project.models.dto.request.tax.TaxRequest;

import java.util.List;
import java.util.Optional;

public interface TaxService {

    public Tax createTax(TaxRequest request);

    public Optional<Tax> findTaxById(Integer id);

    public Optional<Tax> findTaxByName(String name);

    public List<Tax> getTaxesById(List<Integer> idList);

    public List<Tax> getTaxesByName(List<String> taxNames);
}
