package com.example.poconetoone.Service;

import com.example.poconetoone.Entity.Project;
import com.example.poconetoone.Entity.Status;
import com.example.poconetoone.exception.BusinessException;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;

public interface ProjectService {
    Project saveProject(Project project)throws BusinessException;
    List<Project> fetchAllProjects()throws BusinessException;
    String getCurrentStatusOfProject(Long projectId)throws BusinessException;
    void saveStatus(Long projectId, Status status)throws BusinessException;
    Project findById(Long id)throws BusinessException;
    Project updateProject(Long id, Project updatedProject)throws BusinessException;
    void deleteProject(Long id)throws BusinessException;
    Status updateStatus(Long projectId, Status updatedStatus)throws BusinessException;
    Status getStatusByProjectId(Long projectId)throws BusinessException;
    List<String> getStatusHistoryByMonth(Long projectId, int month, int year)throws BusinessException;
    List<Map<String, Object>> getStatusHistoryByYear(Long projectId, int year)throws BusinessException;
    List<Map<String, Object>> getWeeklyStatusByMonth(Long id, int month, int year)throws BusinessException;
    List<Map<String, Object>> getWeeklyDefectsByProjectAndMonth(Long id, int month, int year)throws BusinessException;
}
