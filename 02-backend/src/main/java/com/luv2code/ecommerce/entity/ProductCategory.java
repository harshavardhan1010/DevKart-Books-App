package com.luv2code.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

//@Data --we are not using this annotation to generate getters and setter because it also generates to string for this class for all arguments and it may lead to StackOverFlowError why because here we are using @OneToMany annotation to refer products which use category_name(column name in db) as foreign key,so we are referring them using @OneToMany for a set of products,so it will refer a Product and in product class we are referring this as @ManyToOne  So while generating tostring products in this class will refer product and product refers this so it becomes like a cyclic relation i.e we are not using go through some youtube videos if you are haven't understand this comment
@Getter
@Setter
@Entity
@Table(name = "product_category")
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "category_name")
    private String categoryName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;
}
