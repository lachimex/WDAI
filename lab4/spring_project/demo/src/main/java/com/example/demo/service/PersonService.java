package com.example.demo.service;

import com.example.demo.dao.Person;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PersonService {
    public List<Person> getPersons();
    public Person getPerson(String surname);
    public Person create(Person person);
    public Person getPerson(int id);
}
