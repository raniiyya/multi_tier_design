package com.example.relationaldataaccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository repository;

    @GetMapping
    public Iterable<Customer> getAllCustomers() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Customer> getCustomer(@PathVariable Long id) {
        return repository.findById(id);
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return repository.save(customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
