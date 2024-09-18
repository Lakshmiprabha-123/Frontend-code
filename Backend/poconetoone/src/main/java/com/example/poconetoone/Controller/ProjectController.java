package com.example.poconetoone.Controller;

import com.example.poconetoone.Entity.Project;
import com.example.poconetoone.Entity.Status;
import com.example.poconetoone.Service.ProjectService;
import com.example.poconetoone.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

//    @PostMapping("/projects")
//    public ResponseEntity<Project> saveProject(@RequestBody Project project) {
//        Project savedProject = projectService.saveProject(project);
//        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
//    }
@PostMapping("/projects")
public ResponseEntity<Project> saveProject(@RequestBody Project project) throws BusinessException{
    Project savedProject = projectService.saveProject(project);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
}
    @PostMapping("/projects/{id}/status")
    public ResponseEntity<Status> saveStatus(@PathVariable Long id, @RequestBody Status status) throws BusinessException {
        projectService.saveStatus(id, status);
        return new ResponseEntity<>(status, HttpStatus.CREATED);
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() throws BusinessException{
        List<Project> projects = projectService.fetchAllProjects();
        return ResponseEntity.ok(projects);
    }
    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) throws BusinessException{
        Project project = projectService.findById(id);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/projects/{id}/status")
    public ResponseEntity<Status> getStatus(@PathVariable Long id) throws BusinessException{
        Status status = projectService.getStatusByProjectId(id);
        return ResponseEntity.ok(status);
}
    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id,@RequestBody Project project)throws BusinessException{
        Project existingProject = projectService.findById(id);
        if (existingProject == null) {
            return ResponseEntity.notFound().build();
        }
        project.setId(id);
        Project project1=projectService.updateProject(id,project);
        return ResponseEntity.ok(project1);
    }

    @PutMapping("/projects/{id}/status")
    public ResponseEntity<Status> updateStatus(@PathVariable Long id, @RequestBody Status updatedStatus)throws BusinessException {
        Status status = projectService.updateStatus(id, updatedStatus);
        return ResponseEntity.ok(status);
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteProject(@PathVariable Long id)throws BusinessException{
        projectService.deleteProject(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/projects/{id}/status-alone")
    public ResponseEntity<Map<String, String>> getCurrentStatus(@PathVariable Long id) throws BusinessException{
        Map<String, String> response = new HashMap<>();
        // Assume you fetch the status string from your service layer
        String status = projectService.getCurrentStatusOfProject(id);
        response.put("status", status);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/projects/{id}/status-history")
    public ResponseEntity<List<String>> getStatusHistory(@PathVariable Long id,
                                                         @RequestParam("month") int month,
                                                         @RequestParam("year") int year) throws BusinessException{
        List<String> statusHistory = projectService.getStatusHistoryByMonth(id,month, year) ;

        return ResponseEntity.ok(statusHistory);
    }

    @GetMapping("/projects/{id}/status-history-by-year")
    public ResponseEntity<List<Map<String, Object>>> getStatusHistoryByYear(
            @PathVariable Long id,
            @RequestParam("year") int year)throws BusinessException {

        List<Map<String, Object>> statusHistory = projectService.getStatusHistoryByYear(id, year);
        return ResponseEntity.ok(statusHistory);
    }

    @GetMapping("/projects/{id}/weekly-status-by-month")
    public ResponseEntity<List<Map<String, Object>>> getWeeklyStatusByMonth(
            @PathVariable Long id,
            @RequestParam int month,
            @RequestParam int year) throws BusinessException{

        // Call the service method to get formatted status history
        List<Map<String, Object>> response = projectService.getWeeklyStatusByMonth(id, month, year);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/projects/{id}/weekly-defects-by-month")
    public ResponseEntity<List<Map<String, Object>>> getWeeklyDefectsByMonth(
            @PathVariable Long id,
            @RequestParam int month,
            @RequestParam int year) throws BusinessException{

        List<Map<String, Object>> response = projectService.getWeeklyDefectsByProjectAndMonth(id, month, year);

        return ResponseEntity.ok(response);
    }


}
