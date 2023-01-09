package com.crisalis.project.mappers;

import com.crisalis.project.models.Company;
import com.crisalis.project.models.Person;
import com.crisalis.project.models.dto.request.client.ClientRequest;
import com.crisalis.project.models.dto.response.client.ClientResponse;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {

    public Company clientRequestToCompany(ClientRequest clientRequest) {
        Company company = new Company();
        company.setHasActiveService(clientRequest.getHasActiveService());
        company.setCompanyName(clientRequest.getCompanyName());
        company.setCuit(clientRequest.getCuit());
        company.setStartOfActivities(clientRequest.getStartOfActivities());
        return company;
    }

    public ClientResponse companyEntityToResponse(Company company) {
        ClientResponse response = new ClientResponse();
        response.setId(company.getId());
        response.setHasActiveService(company.getHasActiveService());
        response.setCompanyName(company.getCompanyName());
        response.setCuit(company.getCuit());
        response.setStartOfActivities(company.getStartOfActivities());
        return response;
    }

    public Person clientRequestToPerson(ClientRequest clientRequest) {
        Person person = new Person();
        person.setHasActiveService(clientRequest.getHasActiveService());
        person.setDni(clientRequest.getDni());
        person.setFirstName(clientRequest.getFirstName());
        person.setLastName(clientRequest.getLastName());
        return person;
    }

    public ClientResponse personEntityToResponse(Person person) {
        ClientResponse response = new ClientResponse();
        response.setId(person.getId());
        response.setHasActiveService(person.getHasActiveService());
        response.setDni(person.getDni());
        response.setFirstName(person.getFirstName());
        response.setLastName(person.getLastName());
        return response;
    }
}
