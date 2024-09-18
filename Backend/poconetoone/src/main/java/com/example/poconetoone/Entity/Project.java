package com.example.poconetoone.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "project_name")
    private String name;

    @Column(name = "project_lead")
    private String lead;

    @Column(name = "tech_stack")
    private String techStack;

    @Column(name = "project_status")
    private String projectStatus;

    @Column(name = "project_startdate")
    private LocalDate startdate;

    @Column(name = "project_deadline")
    private LocalDate deadline;

    @Column(name = "total_people_allocated")
    private int totalPeopleAllocated;

    @Column(name = "actual_allocation_sow")
    private int actualAllocationSOW;

    @Enumerated(EnumType.STRING)
    @Column(name = "adr_item_documentation")
    private StatusEnum adrItemDocumentation;

    @Enumerated(EnumType.STRING)
    @Column(name = "c4_documentation")
    private StatusEnum c4Documentation;

    @Enumerated(EnumType.STRING)
    @Column(name = "architecture_handover")
    private StatusEnum architectureHandover;

    @Enumerated(EnumType.STRING)
    @Column(name = "decoders_repository")
    private StatusEnum decodersRepository;

    @Enumerated(EnumType.STRING)
    @Column(name = "process_adoption_latest_version")
    private StatusEnum processAdoptionLatestVersion;

    @Enumerated(EnumType.STRING)
    @Column(name = "project_kickoff")
    private StatusEnum projectKickoff;

    @Enumerated(EnumType.STRING)
    @Column(name = "project_shared_document_repository")
    private StatusEnum projectSharedDocumentRepository;

    @Enumerated(EnumType.STRING)
    @Column(name = "sales_handover")
    private StatusEnum salesHandover;

    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Status status;


}