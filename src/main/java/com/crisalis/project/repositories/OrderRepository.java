package com.crisalis.project.repositories;

import com.crisalis.project.models.AppOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<AppOrder, Integer> {

}
