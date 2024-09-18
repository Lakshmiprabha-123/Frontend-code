package com.example.poconetoone.Service;


import com.example.poconetoone.Entity.Project;
import com.example.poconetoone.Entity.Status;
import com.example.poconetoone.Entity.StatusEnum;
import com.example.poconetoone.Repository.ProjectRepository;
import com.example.poconetoone.Repository.StatusRepository;
import com.example.poconetoone.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private StatusRepository statusRepository;


    @Override
    public Project saveProject(Project project) {
        if (project.getStatus() != null) {
            Status status = project.getStatus();
            status.setProject(project);
            calculateCurrentStatus(status);
        }
        return projectRepository.save(project);
    }

    @Override
    public void saveStatus(Long projectId, Status status) throws BusinessException{
        Project project = findById(projectId);

        status.setProject(project);
        calculateCurrentStatus(status);
        project.setStatus(status);
        projectRepository.save(project);
    }

    @Override
    public List<Project> fetchAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project updateProject(Long id, Project updatedProject) throws BusinessException {
        Project existingProject = findById(id);

        existingProject.setName(updatedProject.getName());
        existingProject.setLead(updatedProject.getLead());
        existingProject.setTechStack(updatedProject.getTechStack());
        existingProject.setProjectStatus(updatedProject.getProjectStatus());
        existingProject.setStartdate(updatedProject.getStartdate());
        existingProject.setDeadline(updatedProject.getDeadline());
        existingProject.setTotalPeopleAllocated(updatedProject.getTotalPeopleAllocated());
        existingProject.setActualAllocationSOW(updatedProject.getActualAllocationSOW());
        existingProject.setAdrItemDocumentation(updatedProject.getAdrItemDocumentation());
        existingProject.setC4Documentation(updatedProject.getC4Documentation());
        existingProject.setArchitectureHandover(updatedProject.getArchitectureHandover());
        existingProject.setDecodersRepository(updatedProject.getDecodersRepository());
        existingProject.setProcessAdoptionLatestVersion(updatedProject.getProcessAdoptionLatestVersion());
        existingProject.setProjectKickoff(updatedProject.getProjectKickoff());
        existingProject.setProjectSharedDocumentRepository(updatedProject.getProjectSharedDocumentRepository());
        existingProject.setSalesHandover(updatedProject.getSalesHandover());

        // Update status if present in the updated project
        if (updatedProject.getStatus() != null) {
            Status updatedStatus = updatedProject.getStatus();
            updatedStatus.setProject(existingProject);
            calculateCurrentStatus(updatedStatus);
            existingProject.setStatus(updatedStatus);
        }

        return projectRepository.save(existingProject);
    }

    @Override
    public Status updateStatus(Long projectId, Status updatedStatus)throws BusinessException {
        Project project = findById(projectId);
        Status existingStatus = project.getStatus();
        if (existingStatus != null) {
            updatedStatus.setId(existingStatus.getId());
        }
        updatedStatus.setProject(project);
        calculateCurrentStatus(updatedStatus);
        project.setStatus(updatedStatus);
        projectRepository.save(project);
        return updatedStatus;
    }

    @Override
    public Project findById(Long id) throws BusinessException{
        return projectRepository.findById(id).orElseThrow(() -> new BusinessException("Project not found with id " + id));
    }


    @Override
    public String getCurrentStatusOfProject(Long projectId) throws BusinessException{
        Project project = findById(projectId);

        Status status = project.getStatus();

        if (status == null) {
            return "Not Yet Started";
        } else {
            return status.getCurrentStatus();
        }
    }

    @Override
    public void deleteProject(Long id)throws BusinessException{
        Project project = findById(id);
        projectRepository.delete(project);

    }

    @Override
    public Status getStatusByProjectId(Long projectId)throws BusinessException {

        return statusRepository.findById(projectId).orElseThrow(() -> new BusinessException("Status not found with id " + projectId));
    }

    @Override
    public List<String> getStatusHistoryByMonth(Long projectId, int month, int year)throws BusinessException{
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);
        Status existingStatus = getStatusByProjectId(projectId);
        LocalDateTime createdDate = existingStatus.getCreatedDate();
        if(!createdDate.isAfter(startOfMonth)) {
            throw new BusinessException("Invalid Start date for the given project id : " + projectId);
        }
        return statusRepository.findStatusesByProjectIdAndMonthAndYear(projectId, startOfMonth, endOfMonth);
    }

    @Override
    public List<Map<String, Object>> getStatusHistoryByYear(Long projectId, int year) throws BusinessException{

        Status existingStatus = getStatusByProjectId(projectId);
        LocalDateTime createdDate = existingStatus.getCreatedDate();
        LocalDateTime startOfYear = LocalDateTime.of(year, 1, 1, 0, 0, 0);
        LocalDateTime endOfYear = LocalDateTime.of(year, 12, 31, 23, 59, 59);

        if (createdDate.isBefore(startOfYear) || createdDate.isAfter(endOfYear)) {
            throw new  BusinessException("Invalid creation date for the given project ID: " + projectId);
        }

        List<Object[]> results = statusRepository.findStatusesAndMonthsByProjectIdAndYear(projectId, year);
        List<Map<String, Object>> statusHistory = new ArrayList<>();

        for (Object[] result : results) {
            Map<String, Object> statusData = new HashMap<>();
            statusData.put("month", result[0]);  // Fetch the month number
            statusData.put("currentStatus", result[1]);  // Fetch the current status
            statusHistory.add(statusData);
        }

        return statusHistory;
    }

    @Override
    public List<Map<String, Object>> getWeeklyStatusByMonth(Long id, int month, int year) {
        List<Object[]> results = statusRepository.findWeeklyStatusByProjectAndMonth(id, month, year);
        // Convert the Object[] results to a List of Maps
        return results.stream().map(result -> {
            Map<String, Object> map = new HashMap<>();
            map.put("weekNumber", result[0]);
            map.put("currentStatus", result[1]);
            return map;
        }).collect(Collectors.toList());
    }
    @Override
    public  List<Map<String, Object>> getWeeklyDefectsByProjectAndMonth(Long id, int month, int year){
        List<Object[]> results = statusRepository.findWeeklyDefectsByProjectAndMonth(id, month, year);
        // Convert the Object[] results to a List of Maps
        return results.stream().map(result -> {
            Map<String, Object> map = new HashMap<>();
            map.put("weekNumber", result[0]);
            map.put("numberOfDefects", result[1]);
            return map;
        }).collect(Collectors.toList());
    }



    private void calculateCurrentStatus(Status status) {
        double totalTasks = 0.0;

        double completedTasks = 0.0;

        Project project = status.getProject();


        // Array of project-level attributes
        StatusEnum[] projectAttributes = {
                project.getAdrItemDocumentation(),
                project.getC4Documentation(),
                project.getArchitectureHandover(),
                project.getDecodersRepository(),
                project.getProcessAdoptionLatestVersion(),
                project.getProjectKickoff(),
                project.getSalesHandover(),
                project.getProjectSharedDocumentRepository()
        };

        // Check the project-level attributes
        for (StatusEnum attribute : projectAttributes) {
            if (attribute != StatusEnum.NOT_NECESSARY) {
                totalTasks++;
                completedTasks += attribute.getValue();
            }
        }

        // Array of status-level attributes
        StatusEnum[] statusAttributes = {
                status.getDailyUpdates(),
                status.getProcessFlows(),
                status.getQaUpdates(),
                status.getSonarqube(),
                status.getWeeklyReports(),
                status.getCloseClientCommunication(),
                status.getGitReport(),
                status.getEscalation(),
                status.getBoardUpdates()
        };

        // Check the status-level attributes
        for (StatusEnum attribute : statusAttributes) {
            if (attribute != StatusEnum.NOT_NECESSARY) {
                totalTasks++;
                completedTasks += attribute.getValue();

            }
        }


        if (status.isDefectsReport()){
            totalTasks++;
            completedTasks++;
        }

        if (status.isRisksInDelivery()) {
            completedTasks--;
        }


        double completionPercentage = (completedTasks / totalTasks)*100;

        String currentStatus;
        if (completionPercentage >= 90) {
            currentStatus = "On Track";
        } else if (completionPercentage >= 60 && completionPercentage <= 89) {
            currentStatus = "Slow";
        } else if (completionPercentage >= 30 && completionPercentage <= 59) {
            currentStatus = "Risk";
        } else {
            currentStatus = "Deep Risk";
        }
        status.setCurrentStatus(currentStatus);
        System.out.println("Percentage:"+completionPercentage);
        System.out.println("Current Status of the project:"+currentStatus);
    }
}