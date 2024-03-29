package com.crisalis.project.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String status;
    private Boolean hasDiscount;
    private String clientType;

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "company_id")
    @Nullable
    private Company company;

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "person_id")
    private Person person;

    @CreationTimestamp
    @Column(nullable = false,
            updatable = false)
    private Timestamp createdAt;

    @OneToMany(fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    @Nullable
    private List<OrderDetail> orderDetails;

    private Double totalPrice = (double) 0;
    private Double totalPriceAfterTaxes = (double) 0;
    private Double finalPrice = (double) 0;
}
