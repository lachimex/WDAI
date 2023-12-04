package com.example.demo.controller;

import com.example.demo.dao.Person;
import com.example.demo.repository.PersonsRepository;
import com.example.demo.service.PersonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Hello {

    private final PersonServiceImpl personService;

    @Autowired
    public Hello(PersonServiceImpl personService) {
        this.personService = personService;
    }

    @GetMapping("/hello")
    public String getString(@RequestParam(defaultValue = "imie", value = "zmienna") String name) {
        return "Cześć " + name;
    }

    @GetMapping("/person")
    public ResponseEntity<String> getPersons() {
        String out = "";

        for (Person person : personService.getPersons()) {
            out += (person.toString() + "\n");
        }

        return ResponseEntity.ok(out);
    }

    @GetMapping("/person/{id}")
    public ResponseEntity<String> getPerson(@PathVariable int id) {
        Person person = personService.getPerson(id);

        if (person != null) {
            return ResponseEntity.ok(person.toString());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Person not found");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Person person) {
        personService.create(person);

        return ResponseEntity.status(HttpStatus.CREATED).body("Person created");}
}
