package com.crisalis.project.config.security.services;

import com.crisalis.project.enums.Role;
import com.crisalis.project.models.AppUser;
import com.crisalis.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepo.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Invalid credentials");
        }
        return new User(user.getUsername(), user.getPassword(), mapRoles(user.getRole()));
    }

    private Collection<? extends GrantedAuthority> mapRoles(Role role){
        List<GrantedAuthority> authorities = new ArrayList<>();
        GrantedAuthority a1 = new SimpleGrantedAuthority("ROLE_" + role);
        authorities.add(a1);
        return authorities;
    }
}
