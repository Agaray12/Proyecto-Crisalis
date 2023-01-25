package com.crisalis.project.services.impl;

import com.crisalis.project.models.Tax;
import com.crisalis.project.models.dto.request.tax.TaxRequest;
import com.crisalis.project.repositories.TaxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TaxServiceImpl {

    @Autowired
    private TaxRepository taxRepo;

    public Tax createTax(TaxRequest request){
        Tax tax = new Tax();
        tax.setName(request.getName());
        tax.setPercentage(request.getPercentage());
        return taxRepo.save(tax);
    }

    public Optional<Tax> findTaxById(Integer id){
        return taxRepo.findById(id);
    }

    public Optional<Tax> findTaxByName(String name){
        return taxRepo.findByName(name);
    }

    public List<Tax> getTaxesById(List<Integer> idList){
        List<Tax> taxes = new ArrayList<>();
        for (Integer id:
             idList) {
            Optional<Tax> taxOpt = findTaxById(id);
            taxOpt.ifPresent(taxes::add);
        }
        return taxes;
    }

    public List<Tax> getTaxesByName(List<String> taxNames){
        List<Tax> taxes = new ArrayList<>();
        for (String name:
             taxNames) {
            Optional<Tax> taxOpt = findTaxByName(name);
            taxOpt.ifPresent(taxes::add);
        }
        return taxes;
    }
}
