package com.crisalis.project.repositories;

import com.crisalis.project.models.Tax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaxRepository extends JpaRepository<Tax, Integer> {

    public Optional<Tax> findByName(String name);
}
