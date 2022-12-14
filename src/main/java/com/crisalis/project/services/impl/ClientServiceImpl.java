package com.crisalis.project.services.impl;

import com.crisalis.project.mappers.ClientMapper;
import com.crisalis.project.models.Company;
import com.crisalis.project.models.Person;
import com.crisalis.project.models.dto.request.client.ClientRequest;
import com.crisalis.project.models.dto.response.client.ClientResponse;
import com.crisalis.project.repositories.CompanyRepository;
import com.crisalis.project.repositories.PersonRepository;
import com.crisalis.project.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientMapper clientMapper;

    @Autowired
    private CompanyRepository companyRepo;

    @Autowired
    private PersonRepository personRepo;

    public ClientResponse createClient(ClientRequest clientRequest){
        if(clientRequest.getClientType().equalsIgnoreCase("company")){
            Company company = clientMapper.clientRequestToCompany(clientRequest);
            Company companySaved = companyRepo.save(company);
            return clientMapper.companyEntityToResponse(companySaved);
        }else if(clientRequest.getClientType().equalsIgnoreCase("person")) {
            Person person = personRepo.save(clientMapper.clientRequestToPerson(clientRequest));
            return clientMapper.personEntityToResponse(person);
        }

        return null;
    }

    public List<ClientResponse> getAllByType(String type){
        if(type.equalsIgnoreCase("empresas")){
            return companyRepo.findAll().stream().map(clientMapper::companyEntityToResponse).collect(Collectors.toList());
        }else if (type.equalsIgnoreCase("personas")){
            return personRepo.findAll().stream().map(clientMapper::personEntityToResponse).collect(Collectors.toList());
        }else{
            return null;
        }
    }

    public List<ClientResponse> getAll(){

        List<ClientResponse> companies = companyRepo.findAll().stream().map(clientMapper::companyEntityToResponse).collect(Collectors.toList());

        List<ClientResponse> people = personRepo.findAll().stream().map(clientMapper::personEntityToResponse).collect(Collectors.toList());

        return new ArrayList<>(){{
            addAll(companies);
            addAll(people);
        }};
    }
}
