package com.pcp.services;

import com.pcp.dto.ReportDto;
import com.pcp.dto.ReportRequest;
import java.util.List;

public interface ReportService {

    ReportDto create(ReportRequest req);

    List<ReportDto> getByPlant(Long plantId);

    void delete(Long id);

    void sendMail(Long plantId, String email);
}
