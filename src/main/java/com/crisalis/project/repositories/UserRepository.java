package com.crisalis.project.repositories;

import com.crisalis.project.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<AppUser, UUID> {

    public AppUser findByUsername(String username);

    public AppUser existsByUsername(String username);
}
