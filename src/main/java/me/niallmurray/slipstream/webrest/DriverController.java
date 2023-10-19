package me.niallmurray.slipstream.webrest;

import me.niallmurray.slipstream.domain.Driver;
import me.niallmurray.slipstream.domain.Team;
import me.niallmurray.slipstream.service.DriverService;
import me.niallmurray.slipstream.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/driver")
public class DriverController {
  @Autowired
  DriverService driverService;
  @Autowired
  TeamService teamService;

  @GetMapping("/{driverId}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Driver> getDriverData(@PathVariable Long driverId) {
    Driver driver = driverService.findById(driverId);
//    System.out.println("driver entity: " + ResponseEntity.ok(driverOpt.orElse(null)));
    return ResponseEntity.ok(driver);
  }

  @GetMapping("/allDrivers")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<Driver>> getAllDrivers() {
    List<Driver> allDrivers = driverService.sortDriversStanding();
//    System.out.println("getAllDrivers: " + allDrivers);
    return ResponseEntity.ok(allDrivers);
  }

  @GetMapping("/{teamId}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<Driver>> getDriversInTeam(@PathVariable Long teamId) {
    Team team = teamService.findById(teamId);
    List<Driver> driversInTeam = new ArrayList<>(2);
    Long driverId1 = team.getDrivers().get(0).getDriverId();
    Long driverId2 = team.getDrivers().get(1).getDriverId();
    Driver driver1 = driverService.findById(driverId1);
    Driver driver2 = driverService.findById(driverId2);
    driversInTeam.add(driver1);
    driversInTeam.add(driver2);
//    System.out.println("driver entity: " + ResponseEntity.ok(driverOpt.orElse(null)));
    return ResponseEntity.ok(driversInTeam);
  }


}
