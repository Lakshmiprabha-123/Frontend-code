package com.example.poconetoone.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;
import java.util.Map;

import static org.hibernate.envers.RelationTargetAuditMode.NOT_AUDITED;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Audited
@EntityListeners(AuditingEntityListener.class)
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "current_status")
    private String currentStatus;

    @Column(name = "risks_in_delivery")
    private boolean risksInDelivery;

    @Convert(converter = TeamCompositionConverter.class)
    @Column(name = "team_composition")
    private Map<String, Integer> teamComposition;

    @Column(name = "defects_report")
    private boolean defectsReport;

    @Column(name = "number_of_defects")
    private int numberOfDefects;

    @Enumerated(EnumType.STRING)
    @Column(name = "process_flows")
    private StatusEnum processFlows;

    @Enumerated(EnumType.STRING)
    @Column(name = "daily_updates")
    private StatusEnum dailyUpdates;

    @Enumerated(EnumType.STRING)
    @Column(name = "qa_updates")
    private StatusEnum qaUpdates;

    @Enumerated(EnumType.STRING)
    @Column(name = "sonarqube")
    private StatusEnum sonarqube;

    @Enumerated(EnumType.STRING)
    @Column(name = "weekly_reports")
    private StatusEnum weeklyReports;

    @Enumerated(EnumType.STRING)
    @Column(name = "close_client_communication")
    private StatusEnum closeClientCommunication;

    @Enumerated(EnumType.STRING)
    @Column(name = "git_report")
    private StatusEnum gitReport;

    @Enumerated(EnumType.STRING)
    @Column(name = "escalation")
    private StatusEnum escalation;

    @Enumerated(EnumType.STRING)
    @Column(name = "board_updates")
    private StatusEnum boardUpdates;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    @Audited(targetAuditMode = NOT_AUDITED)
    @JsonBackReference
    private Project project;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCurrentStatus() {
        return currentStatus;
    }

    public void setCurrentStatus(String currentStatus) {
        this.currentStatus = currentStatus;
    }

    public boolean isRisksInDelivery() {
        return risksInDelivery;
    }

    public void setRisksInDelivery(boolean risksInDelivery) {
        this.risksInDelivery = risksInDelivery;
    }

    public Map<String, Integer> getTeamComposition() {
        return teamComposition;
    }

    public void setTeamComposition(Map<String, Integer> teamComposition) {
        this.teamComposition = teamComposition;
    }

    public boolean isDefectsReport() {
        return defectsReport;
    }

    public void setDefectsReport(boolean defectsReport) {
        this.defectsReport = defectsReport;
    }

    public int getNumberOfDefects() {
        return numberOfDefects;
    }

    public void setNumberOfDefects(int numberOfDefects) {
        this.numberOfDefects = numberOfDefects;
    }

    public StatusEnum getProcessFlows() {
        return processFlows;
    }

    public void setProcessFlows(StatusEnum processFlows) {
        this.processFlows = processFlows;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public StatusEnum getDailyUpdates() {
        return dailyUpdates;
    }

    public void setDailyUpdates(StatusEnum dailyUpdates) {
        this.dailyUpdates = dailyUpdates;
    }

    public StatusEnum getQaUpdates() {
        return qaUpdates;
    }

    public void setQaUpdates(StatusEnum qaUpdates) {
        this.qaUpdates = qaUpdates;
    }

    public StatusEnum getSonarqube() {
        return sonarqube;
    }

    public void setSonarqube(StatusEnum sonarqube) {
        this.sonarqube = sonarqube;
    }

    public StatusEnum getWeeklyReports() {
        return weeklyReports;
    }

    public void setWeeklyReports(StatusEnum weeklyReports) {
        this.weeklyReports = weeklyReports;
    }

    public StatusEnum getCloseClientCommunication() {
        return closeClientCommunication;
    }

    public void setCloseClientCommunication(StatusEnum closeClientCommunication) {
        this.closeClientCommunication = closeClientCommunication;
    }

    public StatusEnum getGitReport() {
        return gitReport;
    }

    public void setGitReport(StatusEnum gitReport) {
        this.gitReport = gitReport;
    }

    public StatusEnum getEscalation() {
        return escalation;
    }

    public void setEscalation(StatusEnum escalation) {
        this.escalation = escalation;
    }

    public StatusEnum getBoardUpdates() {
        return boardUpdates;
    }

    public void setBoardUpdates(StatusEnum boardUpdates) {
        this.boardUpdates = boardUpdates;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
}

