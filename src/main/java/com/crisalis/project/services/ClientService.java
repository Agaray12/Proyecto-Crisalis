package com.crisalis.project.services;

import com.crisalis.project.models.Company;
import com.crisalis.project.models.Person;
import com.crisalis.project.models.dto.request.client.ClientRequest;
import com.crisalis.project.models.dto.response.client.ClientResponse;

import java.util.List;
import java.util.Optional;

public interface ClientService {

    public ClientResponse createClient(ClientRequest clientRequest);

    public Optional<Person> findPersonById(Integer id);

    public Optional<Company> findCompanyById(Integer id);

    public ClientResponse findById(Integer id);

    public List<ClientResponse> getAllByType(String type);

    public List<ClientResponse> getAll();
}
