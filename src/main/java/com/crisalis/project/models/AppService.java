package com.crisalis.project.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@DiscriminatorValue("Service")
@Data
public class AppService extends Good{

    private Boolean isSpecial;
    private Double specialExtraPercentage;
}
