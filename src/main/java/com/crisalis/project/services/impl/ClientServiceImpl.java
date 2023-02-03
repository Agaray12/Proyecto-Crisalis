package com.crisalis.project.services.impl;

import com.crisalis.project.mappers.ClientMapper;
import com.crisalis.project.models.*;
import com.crisalis.project.models.dto.request.client.ClientRequest;
import com.crisalis.project.models.dto.response.client.ClientResponse;
import com.crisalis.project.repositories.CompanyRepository;
import com.crisalis.project.repositories.PersonRepository;
import com.crisalis.project.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
        if(clientRequest.getClientType().equalsIgnoreCase("empresa")){
            Company company = clientMapper.clientRequestToCompany(clientRequest);
            Company companySaved = companyRepo.save(company);
            return clientMapper.companyEntityToResponse(companySaved);
        }else if(clientRequest.getClientType().equalsIgnoreCase("persona")) {
            Person person = personRepo.save(clientMapper.clientRequestToPerson(clientRequest));
            return clientMapper.personEntityToResponse(person);
        }

        return null;
    }

    public Optional<Person> findPersonById(Integer id){
        return personRepo.findById(id);
    }

    public Optional<Company> findCompanyById(Integer id){
        return companyRepo.findById(id);
    }

    public ClientResponse findById(Integer id){
        Optional<Company> companyOpt = companyRepo.findById(id);
        if (companyOpt.isPresent()){
            return clientMapper.companyEntityToResponse(companyOpt.get());
        }
        Optional<Person> personOpt = personRepo.findById(id);
        if (personOpt.isPresent()){
            return clientMapper.personEntityToResponse(personOpt.get());
        }
        return null;
    }

    public List<ClientResponse> getAllByType(String type){
        if(type.equalsIgnoreCase("empresa")){
            return companyRepo.findAll().stream().map(clientMapper::companyEntityToResponse).collect(Collectors.toList());
        }else if (type.equalsIgnoreCase("persona")){
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

    public void updatePerson(Person person) {
        personRepo.save(person);
    }

    public void updateCompany(Company company) {
        companyRepo.save(company);
    }
}
