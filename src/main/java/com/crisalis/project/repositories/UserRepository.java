package com.crisalis.project.repositories;

import com.crisalis.project.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<AppUser, UUID> {

    public AppUser findByUsername(String username);

    public AppUser existsByUsername(String username);
}
