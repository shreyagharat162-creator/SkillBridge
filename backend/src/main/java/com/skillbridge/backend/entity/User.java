package com.skillbridge.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String phoneNumber;

    private String skillsToTeach;

    private String skillsToLearn;

    // Default constructor
    public User() {
    }

    // Parameterized constructor
    public User(String fullName, String email, String password,
                String phoneNumber, String skillsToTeach,
                String skillsToLearn) {

        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.skillsToTeach = skillsToTeach;
        this.skillsToLearn = skillsToLearn;
    }

    // Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for fullName
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter and Setter for phoneNumber
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    // Getter and Setter for skillsToTeach
    public String getSkillsToTeach() {
        return skillsToTeach;
    }

    public void setSkillsToTeach(String skillsToTeach) {
        this.skillsToTeach = skillsToTeach;
    }

    // Getter and Setter for skillsToLearn
    public String getSkillsToLearn() {
        return skillsToLearn;
    }

    public void setSkillsToLearn(String skillsToLearn) {
        this.skillsToLearn = skillsToLearn;
    }
}