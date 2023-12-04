package com.example.demo.service;

import com.example.demo.dao.Person;
import com.example.demo.repository.PersonsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class PersonServiceImpl implements PersonService{

    private final PersonsRepository personRepository;

    @Autowired
    public PersonServiceImpl(PersonsRepository personRepository) {
        this.personRepository = personRepository;
    }
    @Override
    public List<Person> getPersons() {
        List<Person> personList = new ArrayList<>();
        for (Object person : personRepository.findAll()){
            personList.add((Person) person);
        }
        return personList;
    }

    @Override
    public Person getPerson(String surname) {
        List<Person> personList = getPersons();
        for (Person person : personList){
            if (person.surname.equals(surname)){
                return person;
            }
        }
        return null;
    }

    @Override
    public Person create(Person person) {
        personRepository.save(person);
        return person;
    }

    @Override
    public Person getPerson(int id) {
        Optional<Person> optional = personRepository.findById(id);
        return optional.orElse(null);
    }

}
