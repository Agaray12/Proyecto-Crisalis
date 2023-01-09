package com.crisalis.project.repositories;

import com.crisalis.project.models.AppService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<AppService, Integer> {

}
