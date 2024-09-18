package com.example.poconetoone.Repository;

import com.example.poconetoone.Entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface StatusRepository extends JpaRepository<Status, Long> {
    @Query(value = "SELECT MONTH(sa.last_modified_date) AS month, sa.current_status " +
            "FROM status_aud sa INNER JOIN ( " +
            "SELECT MAX(last_modified_date) AS last_modified_date " +
            "FROM status_aud " +
            "WHERE id = :projectId AND YEAR(last_modified_date) = :year " +
            "GROUP BY MONTH(last_modified_date) " +
            ") sub ON sa.last_modified_date = sub.last_modified_date", nativeQuery = true)
    List<Object[]> findStatusesAndMonthsByProjectIdAndYear(
            @Param("projectId") Long projectId,
            @Param("year") int year);
    @Query(value = "SELECT current_status FROM status_aud WHERE id = :projectId AND last_modified_date BETWEEN :startOfMonth AND :endOfMonth", nativeQuery = true)
    List<String> findStatusesByProjectIdAndMonthAndYear(
            @Param("projectId") Long projectId,
            @Param("startOfMonth") LocalDateTime startOfMonth,
            @Param("endOfMonth") LocalDateTime endOfMonth);
    @Query(value = "SELECT WEEK(s.last_modified_date, 1) AS weekNumber, s.current_status AS currentStatus " +
            "FROM status_aud s " +
            "WHERE s.id = ?1 " +
            "AND MONTH(s.last_modified_date) = ?2 " +
            "AND YEAR(s.last_modified_date) = ?3 " +
            "AND s.last_modified_date = (" +
            "  SELECT MAX(sub_s.last_modified_date) " +
            "  FROM status_aud sub_s " +
            "  WHERE sub_s.id = s.id " +
            "  AND WEEK(sub_s.last_modified_date, 1) = WEEK(s.last_modified_date, 1) " +
            "  AND MONTH(sub_s.last_modified_date) = ?2 " +  // Change ?4 to ?2
            "  AND YEAR(sub_s.last_modified_date) = ?3" +    // Change ?5 to ?3
            ") " +
            "GROUP BY WEEK(s.last_modified_date, 1), s.current_status " +
            "ORDER BY weekNumber",
            nativeQuery = true)
    List<Object[]> findWeeklyStatusByProjectAndMonth(@Param("projectId") Long id,
                                                     @Param("month") int month,
                                                     @Param("year") int year);
    @Query(value = "SELECT WEEK(s.last_modified_date, 1) AS weekNumber, s.number_of_defects AS numberOfDefects " +
            "FROM status_aud s " +
            "WHERE s.id = ?1 " +
            "AND MONTH(s.last_modified_date) = ?2 " +
            "AND YEAR(s.last_modified_date) = ?3 " +
            "AND s.last_modified_date = (" +
            "  SELECT MAX(sub_s.last_modified_date) " +
            "  FROM status_aud sub_s " +
            "  WHERE sub_s.id = s.id " +
            "  AND WEEK(sub_s.last_modified_date, 1) = WEEK(s.last_modified_date, 1) " +
            "  AND MONTH(sub_s.last_modified_date) = ?2 " +
            "  AND YEAR(sub_s.last_modified_date) = ?3" +
            ") " +
            "GROUP BY WEEK(s.last_modified_date, 1), s.number_of_defects " +
            "ORDER BY weekNumber",
            nativeQuery = true)
    List<Object[]> findWeeklyDefectsByProjectAndMonth(@Param("projectId") Long id,
                                                      @Param("month") int month,
                                                      @Param("year") int year);
}